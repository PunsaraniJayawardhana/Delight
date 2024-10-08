import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("seller"); // Default to seller
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        email,
        password,
        userType, // Pass the user type (seller/buyer)
      });
      if (userType === 'seller') {
        router.push("/seller-dashboard");
      } else {
        router.push("/buyer-dashboard");
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Sign In</p>
        <input
          placeholder="Email"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select onChange={(e) => setUserType(e.target.value)} className={styles.input}>
          <option value="seller">Seller</option>
          <option value="buyer">Admin</option>
        </select>
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
