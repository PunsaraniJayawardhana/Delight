import axios from "axios";
import styles from "@/styles/Home.module.css";
import ProductList from "../components/productList2";

export default function Products({productList2, admin}) {

  return (
    <div className= {styles.container}>
      <ProductList productList2={productList2}/>
      </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productList2: res.data,
      admin,
    },
  };
};
