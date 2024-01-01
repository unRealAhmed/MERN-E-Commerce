import { LiaShoppingBagSolid } from "react-icons/lia";
import { RxCaretDown } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import Container from "../container/Container";
import styles from "./BottomHeader.module.css";
import { useEffect, useState } from "react";

const BottomHeader = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = function () {
    setSidebar(!sidebar);
  };
  useEffect(() => {
    let handler = () => {
      setSidebar(false);
    };
    document.querySelector(".main").addEventListener("mousedown", handler);
  });
  return (
    <Container>
      <div className={styles.BottomHeader}>
        <div className={styles.menu}>
          <button className={styles.iconBtn} onClick={showSidebar}>
            <FaBars className={styles.menuIcon} />
          </button>
          <div
            className={
              sidebar ? `${styles.sidebar}` : `${styles.sidebarActive}`
            }
          >
            <div className={styles.sidebarHeader}>
              <button className={styles.closeBtn} onClick={showSidebar}>
                <IoIosClose className={styles.closeIcon} />
              </button>
            </div>
            <div className={styles.sidebarBody}>
              <h3 className={styles.sidebarTitle}>Shop By Category</h3>
              <ul className={styles.sidebarItems}>
                <li className={styles.sidebarItem} onClick={showSidebar}>
                  <Link to="#">Bags</Link>
                </li>
                <li className={styles.sidebarItem} onClick={showSidebar}>
                  <Link to="#">Mens</Link>
                </li>
                <li className={styles.sidebarItem} onClick={showSidebar}>
                  <Link to="#">Shoes</Link>
                </li>
                <li className={styles.sidebarItem} onClick={showSidebar}>
                  <Link to="#">Perfumes</Link>
                </li>
              </ul>
            </div>
            <div
              className={sidebar ? `${styles.darkBlur}` : ``}
              onClick={showSidebar}
            ></div>
          </div>
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
              <div className={styles.dropdown}>
                <button>
                  <span>Brand</span>
                  <RxCaretDown />
                </button>
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <h4>SHOP BY BRAND</h4>
                    <Link to="/brands" style={{ color: "blue" }}>
                      See All
                    </Link>
                  </div>
                  <div className={styles.dropdownContent}>
                    <div>
                      <ul>
                        <li>Convers</li>
                        <li>Nike</li>
                        <li>Gucci</li>
                        <li>Ralph Louren</li>
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li>Calvin Celen</li>
                        <li>Apple</li>
                        <li>Polo</li>
                        <li>Tommy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link to="shop">
                <span>Shop</span>
              </Link>
            </li>
            <li>
              <div className={styles.dropdown}>
                <button>
                  <span>Welcome</span>
                  <RxCaretDown />
                </button>
                <div className={styles.dropdownMenutwo}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <span className={styles.dropspan}>Login</span>
                    <span className={styles.dropspan}>Sign Up</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default BottomHeader;
