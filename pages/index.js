import axios from "axios";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Featured from "../components/featured";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import ProductList from "../components/productList";

export default function Home({productList, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div className= {styles.container}>
      
      <Head>
        <title>Delight</title>
        <meta name="description" content="Best cake shop in town" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      {<AddButton setClose={setClose} />}
      <ProductList productList={productList}/>
      {!close && <Add setClose={setClose} />}
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
      productList: res.data,
      admin,
    },
  };
};
