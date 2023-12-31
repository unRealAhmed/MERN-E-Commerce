import styles from "./Register.module.css";
import Container from "../UI/container/Container";
import { Link } from "react-router-dom";
import Loginbuttons from "../UI/Loginbuttons/Loginbuttons";

const Register = () => {
  return (
    <Container>
      <h2 className={styles.secondaryHeading}>sign up</h2>
      <hr />
      <div className={styles.main}>
        <form className={styles.form}>
          <label>Email Address</label>
          <input placeholder="Please Enter Your Email" />
          <label>First Name</label>
          <input placeholder="Please Enter Your First Name" />
          <label>Last Name</label>
          <input placeholder="Please Enter Your Last Name" />
          <label>Password</label>
          <input placeholder="Please Enter Your Password" />
        </form>
        <div>
          <Loginbuttons />
        </div>
      </div>
      <hr />
      <div>
        <div className={styles.Subscribe}>
          <input type="checkbox" />
          <span className={styles.sub}>Subscribe to newsletter</span>
        </div>
        <div className={styles.signlink}>
          <button className={styles.btn}>Sign up </button>
          <button className={styles.back}>
            <Link to="/login">Back to login</Link>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Register;
