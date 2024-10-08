import ProductCard from "../components/ProductCard";
import styles from "../styles/ProductList.module.css";

const ProductList = ({productList}) => {

  console.log(productList);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>THE BEST CAKE IN TOWN</h1>
      <p className={styles.desc}> Delicious cakes made with love, 
      bringing joy to every bite.
      Our unique blend of flavors creates a perfect harmony in every slice. 
      Whether it's for a special occasion or just a sweet treat, 
      our cakes are crafted to perfection. 
      Enjoy the finest ingredients and delightful designs that will make your celebrations unforgettable.</p>
      <div className={styles.grid}>
        { productList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductList;