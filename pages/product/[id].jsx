import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/cartSlice";

const Product = ({product}) => {
  const basePrice = product.prices[0]; // Price for 500g
  const [price, setPrice] = useState(basePrice);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  // Handle price change when changing size
  const handleSize = (sizeIndex) => {
    let newPrice;
    if (sizeIndex === 0) {
      newPrice = basePrice; // 500g
    } else if (sizeIndex === 1) {
      newPrice = basePrice * 2; // 1kg is 2 times the 500g price
    } else if (sizeIndex === 2) {
      newPrice = basePrice * 4; // 2kg is 4 times the 500g price
    }
    setSize(sizeIndex);
    setPrice(newPrice + extras.length * 500); // Update with extras price
  };

  // Handle adding/removing extra ingredients
  const handleChange = (e, option) => {
    const checked = e.target.checked;
    const extraPrice = 500; // Rs.500 for each extra
  
    if (checked) {
      setExtras((prev) => [...prev, option]);
      setPrice((prevPrice) => prevPrice + extraPrice); // Update price based on the previous state
    } else {
      setExtras((prev) => prev.filter((extra) => extra._id !== option._id));
      setPrice((prevPrice) => prevPrice - extraPrice); // Update price based on the previous state
    }
  };

  // Update quantity based on user input
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value)); // Ensure it's a number
  };

  // Handle adding the product to the cart
  const handleClick= () => {
    dispatch(addProduct({ ...product, extras, price, quantity: Number(quantity)  }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={product.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h2 className={styles.title}>{product.title}</h2>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{product.desc}</p>
        
        <h4 className={styles.choose}>Choose the size</h4>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>500g</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>1kg</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>2kg</span>
          </div>
        </div>

        <h4 className={styles.choose}>Choose additional ingredients</h4>
        <div className={styles.ingredients}>
          {product.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>

        <div className={styles.add}>
        <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({params}) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      product: res.data,
    },
  };
};

export default Product;
