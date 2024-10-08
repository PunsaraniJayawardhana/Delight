import ProductCard from "./ProductCard";
import styles from "../styles/ProductList.module.css";

const ProductList2 = ({productList2}) => {

  console.log(productList2);

  return (
    <div className={styles.container}>
      
      <div className={styles.grid}>
        { productList2.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductList2;