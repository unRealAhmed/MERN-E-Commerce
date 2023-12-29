import BottomHeader from "../BottomHeader/BottomHeader";
import TopHeader from "../TopHeader/TopHeader";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <TopHeader />
      <BottomHeader />
    </header>
  );
};

export default Header;
