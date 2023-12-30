import { FaStar } from "react-icons/fa6";
import styles from "./ItemCard.module.css";

const ItemCard = () => {
  return (
    <div className={styles.card}>
      <img src="/shop1.jpeg" alt="" style={{ width: "20rem" }} />
      <div style={{ padding: "1rem" }}>
        <h3>MACbook Laptop</h3>
        <p>By Apple</p>
        <span>macbook pro 10-inch</span>
        <div className={styles.rating}>
          <p>2500$</p>
          <p>
            4.0
            <FaStar style={{ color: "gold" }} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
