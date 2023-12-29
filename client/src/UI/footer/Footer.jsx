import { Link } from "react-router-dom";
import Container from "../container/Container";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <div>
            <h3>CUSTOMER SERVICE</h3>

            <ul>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">Sell With Us</Link>
              </li>
              <li>
                <Link to="/">Shipping</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerContent}>
            <div>
              <h3>LINKS</h3>

              <ul>
                <li>
                  <Link to="/">Contact Us</Link>
                </li>
                <li>
                  <Link to="/">Sell With Us</Link>
                </li>
                <li>
                  <Link to="/">Shipping</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerContent}>
            <div>
              <h3>NEWSLETTER</h3>

              <p>Sign Up for Our Newsletter</p>
              <form>
                <input type="text" placeholder="Please Enter Your Email" />
                <button>Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.footerCopyright}>
          <p>© 2023 MERN Store</p>
        </div>

        <div className={styles.footerNetwork}>
          <Link to="/">
            <img src="/facebook.svg" alt="facebook image" />
          </Link>
          <Link to="/">
            <img src="/instagram.svg" alt="instagram image" />
          </Link>
          <Link to="/">
            <img src="/pinterest.svg" alt="pinterest image" />
          </Link>
          <Link to="/">
            <img src="/twitter.svg" alt="twitter image" />
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
