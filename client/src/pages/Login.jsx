import { Link } from "react-router-dom";
import Container from "../UI/container/Container";
import styles from "./Login.module.css";
import Loginbuttons from "../UI/Loginbuttons/Loginbuttons";
// import Loginbuttons from "./components/Loginbuttons";
const Login = () => {
  return (
    <Container>
      <h2>Log in</h2>
      <hr />
      <div className={styles.main}>
        <form>
          <label>Email Address</label>
          <input placeholder="Please Enter Your Email" />
          <label>Password</label>
          <input placeholder="Please Enter Your Password" />
        </form>
        <div>
          <Loginbuttons />
        </div>
      </div>
      <hr />

      <div className={styles.signlink}>
        <div className={styles.logbuttons}>
          <button>Log in </button>
          <Link to="/register" className={styles.createAcc}>
            Create An Account
          </Link>
        </div>
        <button className={styles.forgot}>
          <Link to="/forgot-pass">Forgot passward?</Link>
        </button>
      </div>
    </Container>
  );
};

export default Login;
