class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = JSON.parse(JSON.stringify(queryString));
    this.excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
  }

  filter() {
    const filters = { ...this.queryString };

    Object.keys(filters).forEach((key) => {
      if (this.excludedFields.includes(key)) {
        delete filters[key];
      }
    });

    Object.entries(filters).forEach(([key, value]) => {
      filters[key] = value.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    });

    this.query = this.query.find(filters);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  paginate() {
    let { page, limit } = this.queryString;

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  search() {
    if (this.queryString.search) {
      const searchFields = ['name', 'category', 'brand'];
      const searchQuery = this.queryString.search;

      const searchFilter = {
        $or: searchFields.map((field) => ({
          [field]: { $regex: new RegExp(searchQuery, 'i') },
        })),
      };

      this.query = this.query.find(searchFilter);
    }

    return this;
  }

  selectFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }

    return this;
  }
}

module.exports = APIFeatures;
