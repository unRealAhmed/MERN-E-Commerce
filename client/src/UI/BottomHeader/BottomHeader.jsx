import { LiaShoppingBagSolid } from "react-icons/lia";
import { RxCaretDown } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import Container from "../container/Container";
import styles from "./BottomHeader.module.css";

const BottomHeader = () => {
  return (
    <Container>
      <div className={styles.BottomHeader}>
        <div className={styles.menu}>
          <button className={styles.iconBtn}>
            <FaBars className={styles.menuIcon} />
          </button>
          <p className={styles.menuTitle}>
            <Link to="/">MERN Store</Link>
          </p>
        </div>

        <div className={styles.search}>
          <input type="text" placeholder="Search Products" />
        </div>

        <nav className={styles.nav}>
          <button className={styles.cartIcon}>
            <LiaShoppingBagSolid />
          </button>
          <ul className={styles.navList}>
            <li>
              <button>
                <span>Brand</span>
                <RxCaretDown />
              </button>
            </li>
            <li>
              <Link to="shop">
                <span>Shop</span>
              </Link>
            </li>
            <li>
              <button>
                <span>Welcome</span>
                <RxCaretDown />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default BottomHeader;
