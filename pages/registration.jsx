import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // For buyer
  const [address, setAddress] = useState("");   // For buyer
  const [phone, setPhone] = useState("");       // For buyer
  const [username, setUsername] = useState(""); // For admin
  const [userType, setUserType] = useState("buyer"); // Default to buyer
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    let requestData = {};

    if (userType === 'buyer') {
      // Matching keys with the BuyerSchema
      requestData = {
        name: fullName, // Mongoose expects 'name'
        email,
        password,
        address,
        phone,
        userType,
      };
    } else if (userType === 'admin') {
      // Sending only username and password for admin
      requestData = {
        username, // Assumes you have a username field for admins
        password,
        userType,
      };
    }

    try {
      await axios.post("http://localhost:3000/api/register", requestData);
      if (userType === 'buyer') {
        router.push("/buyer-dashboard");
      } else {
        router.push("/admin-dashboard");
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Sign Up</p>
        
        {/* User type selection */}
        <select onChange={(e) => setUserType(e.target.value)} className={styles.input}>
          <option value="buyer">Buyer</option>
          <option value="admin">Admin</option>
        </select>
        
        {/* Conditionally render input fields based on userType */}
        {userType === 'buyer' && (
          <>
            <input
              placeholder="Full Name"
              className={styles.input}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              placeholder="Address"
              className={styles.input}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              placeholder="Phone Number"
              className={styles.input}
              onChange={(e) => setPhone(e.target.value)}
            />
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
          </>
        )}
        
        {userType === 'admin' && (
          <>
            <input
              placeholder="Username"
              className={styles.input}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        <button onClick={handleClick} className={styles.button}>
          Sign Up
        </button>

        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Register;
