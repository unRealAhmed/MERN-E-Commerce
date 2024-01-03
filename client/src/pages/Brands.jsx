import { Link } from "react-router-dom";
import Container from "../UI/container/Container";
import styles from "./Brands.module.css";
const Brandsdata = [
  {
    name: "Converse",
    description: "Converse brand store",
    path: "/#",
  },
  {
    name: "calvin klein",
    description:
      "Ea ius elitr ridens docendi, est apeirian reprimique neglegentur..",
    path: "/#",
  },
  {
    name: "Nike",
    description: "Nike Brand",
    path: "/#",
  },
  {
    name: "Apple",
    description: "Apple Description",
    path: "/#",
  },
  {
    name: "Gucci",
    description: "Lorem Ipsum has been the industry's standard dummy text",
    path: "/#",
  },
  {
    name: "Polo",
    description:
      "Ea ius elitr ridens docendi, est apeirian reprimique neglegentur et. Virtute lobortis voluptaria ea",
    path: "/#",
  },
  {
    name: "Ralph Lauren",
    description:
      "Ea ius elitr ridens docendi, est apeirian reprimique neglegentur",
    path: "/#",
  },
  {
    name: "Tommy Hilfiger",
    description: "Lorem Ipsum is simply dummy text of the printing and..",
    path: "/#",
  },
];
function Brands() {
  return (
    <Container>
      <div className={styles.main}>
        <h3 className={styles.heading3}>SHOP BY BRAND</h3>
        <hr />
        <ul className={styles.brandsitems}>
          {Brandsdata.map((brand) => {
            return (
              <li key={brand.name} className={styles.branditem}>
                <Link to={brand.path}>
                  <h5 className={styles.nameBrand}>{brand.name}</h5>
                  <p className={styles.descriptionBrand}>{brand.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
}

export default Brands;
