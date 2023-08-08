import { useState } from 'react';
import styles from './App.module.css'
import axios from 'axios';
import MyCalendar from '../match_page/MyCalendar';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLoginClick = async () => {
    try {
      setError('');
      const response = await axios.post('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/auth/login', { email, password }); 
      if (response.status === 200) {
        if (response.data.data.token) {
          localStorage.setItem('login-token', response.data.data.token);
        }
        setLoggedIn(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Account does not exist.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };
  return (
    <div>
        <div className={styles.formBox}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" example123@gmail.com "
            className={styles.infoInput}
          /> </div>
          
          <div className={styles.formBox2}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className={styles.infoInput2}
          /> </div>
          <div className={styles.loginNow}>
            <button onClick={handleLoginClick}>Login now</button>
          </div>

          {loggedIn && <MyCalendar />}
          </div>
  );
};

export default App;