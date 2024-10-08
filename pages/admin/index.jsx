import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products }) => {
  const [cakeList, setCakeList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  // Modal states for Delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Modal states for Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    prices: [0],
    img: "",
  });

  // Function to open the delete modal
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  // Function to open the edit modal
  const openEditModal = (product) => {
    setProductToEdit(product);
    setEditedProduct({
      title: product.title,
      prices: product.prices,
      img: product.img,
    });
    setIsEditModalOpen(true);
  };

  // Function to close the delete modal
  const closeModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      const res = await axios.delete(`/api/products/${productToDelete._id}`);
      setCakeList(cakeList.filter((cake) => cake._id !== productToDelete._id));
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle product update
  const handleSaveEdit = async () => {
    if (!productToEdit) return;
    try {
      const res = await axios.put(`/api/products/${productToEdit._id}`, editedProduct);
      setCakeList(
        cakeList.map((cake) =>
          cake._id === productToEdit._id ? { ...cake, ...res.data } : cake
        )
      );
      closeEditModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.find((order) => order._id === id);
    const currentStatus = item.status;
  
    if (currentStatus >= status.length - 1) return; // Prevent updating if already delivered
  
    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
  
      setOrderList(
        orderList.map((order) =>
          order._id === id ? { ...order, status: res.data.status } : order
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <p className={styles.title}>Products</p>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {cakeList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                <button className={styles.button} onClick={() => openEditModal(product)}>Edit</button>
                <button className={styles.button} onClick={() => openDeleteModal(product)}>Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <p className={styles.title}>Orders</p>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                <button
                  className={`${styles.stageButton} ${order.status >= status.length - 1 ? styles.disabledButton : ''}`}
                  onClick={() => handleStatus(order._id)}
                  disabled={order.status >= status.length - 1}
                >
                  Next Stage
                </button>

                </td>

              </tr>
            </tbody>
          ))}
        </table>
        
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Are you sure you want to delete this product?</h3>
            <p>{productToDelete?.title}</p>
            <div className={styles.modalActions}>
              <button onClick={handleDelete} className={styles.confirmButton}>Yes, Delete</button>
              <button onClick={closeModal} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Product */}
      {isEditModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>Edit Product</h3>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={editedProduct.title}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  value={editedProduct.prices[0]}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, prices: [e.target.value] })
                  }
                />
              </div>
              <div className={styles.modalActions}>
                <button onClick={handleSaveEdit} className={styles.confirmButton}>
                  Save Changes
                </button>
                <button onClick={closeEditModal} className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;