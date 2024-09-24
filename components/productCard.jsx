import Image from "next/image";
import styles from "../styles/ProductCard.module.css";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <Link href={`/product/${product._id}`} passHref>
        <Image
          src={product.img}
          alt={product.title}
          width={100}
          height={100}
          className={styles.image}
        />
      </Link>
      <div className={styles.details}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>${product.prices[0]}</p>
        <p className={styles.description}>{product.desc}</p>
      </div>
    </div>
  );
};

export default ProductCard;
