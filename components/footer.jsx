import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.itemImage}>
        <Image src="/img/cake13.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
          OH YES, WE DID. THE DELIGHT CAKE, <br/> A WELL-BAKED SLICE OF CAKE.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            16, Don Road
            <br /> Galle
            <br /> 091-2222333
          </p>
          <p className={styles.text}>
          28/B, Beach Road
            <br /> Wellawatta
            <br /> 011-2222333
          </p>
          <p className={styles.text}>
          4, Main Road
            <br /> Panadura
            <br /> 038-2222333
          </p>
          <p className={styles.text}>
          20/A, Rodrigo Road
            <br /> Kandy
            <br /> 081-2222333
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            Monday to Friday
            <br /> 9:00 – 19:00
          </p>
          <p className={styles.text}>
            Saturday & Sunday
            <br /> 12:00 – 20:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;