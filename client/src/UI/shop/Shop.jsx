import PriceStarFilter from "../PriceStarFilter/PriceStarFilter";
import Container from "../container/Container";
import ItemCard from "../itemCard/ItemCard";

import styles from "./Shop.module.css";

const Shop = () => {
  return (
    <Container>
      <div className={styles.priceContainer}>
        <PriceStarFilter />

        <div>
          <div className={styles.bar}>
            <p>Showing: 1-10 products of 12 products</p>
            <div>
              <span style={{ marginRight: "0.5rem" }}>Sort By</span>
              <select>
                <option>Newest First</option>
                <option>Price hight to low</option>
                <option>Price low to hight</option>
              </select>
            </div>
          </div>

          <div className={styles.shopcontent}>
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Shop;
