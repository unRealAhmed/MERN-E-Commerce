import { FaTruck, FaRegCreditCard, FaPhoneAlt } from "react-icons/fa";

import Container from "../container/Container";
import styles from "./TopHeader.module.css";

const TopHeader = () => {
  return (
    <div className={styles.topHeader}>
      <Container>
        <div className={styles.headerRow}>
          <p className={styles.headerCol}>
            <FaTruck />
            <span>Free Shipping</span>
          </p>
          <p className={styles.headerCol}>
            <FaRegCreditCard />
            <span>Payment Methods</span>
          </p>
          <p className={styles.headerCol}>
            <FaPhoneAlt />
            <span>Call us 951-999-9999</span>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default TopHeader;
