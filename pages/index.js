import axios from "axios";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Featured from "../components/featured";
import ProductList from "../components/productList";

export default function Home({productList}) {
  return (
    <div className= {styles.container}>
      
      <Head>
        <title>Delight</title>
        <meta name="description" content="Best cake shop in town" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      <ProductList productList={productList}/>
      </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productList: res.data,
    },
  };
};
