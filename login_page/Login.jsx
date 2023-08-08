import styles from "./Login.module.css";
import App from './App';
import NewAccount from './NewAccount';

const Login = () => {

  return (
    <div >
      <div className={styles.left} />
      <div className={styles.right} />
      <div className={styles.logIn}>{`Log In `}</div>
      <div className={styles.youremail}>{'Your email'}</div>
      <App/>
      <NewAccount/>
      <div className={styles.welcome}>Welcome!</div>
    </div>
  );
};

export default Login;