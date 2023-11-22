import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DarkMode from "./components/DarkMode/DarkMode";
import largeImage from "./components/images/CoverImage2.jpg";
import ShowProduct from "./components/ShowProduct/ShowProduct";
import FormProduct from "./components/FormProduct/FormProduct";
import Request from "./components/Request/Request";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";

function App() {
  const MySwal = withReactContent(Swal);
  const [product1, setData1] = useState([]);
  const [product2, setData2] = useState([]);
  const [product3, setData3] = useState([]);
  const [preorder, setPreorder] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((response) => response.json())
      .then((result) => setData1(result))
      .catch((error) => console.error("Error fetching data:", error));

    fetch("https://fakestoreapi.com/products/category/men's%20clothing")
      .then((response) => response.json())
      .then((result) => setData2(result))
      .catch((error) => console.error("Error fetching data:", error));

    fetch("https://fakestoreapi.com/products/category/women's%20clothing")
      .then((response) => response.json())
      .then((result) => setData3(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleRequestSubmit = (requestData) => {
    setPreorder(requestData);
  };

  const handleRequestSubmitEdit = (updatedData) => {
    setPreorder((prevPreorder) => {
      const index = prevPreorder.findIndex(
        (item) => item.name === updatedData.name
      );

      if (index !== -1) {
        const newPreorder = [...prevPreorder];
        newPreorder[index] = updatedData;
        return newPreorder;
      } else {
        return [...prevPreorder, updatedData];
      }
    });

    MySwal.fire({
      icon: "success",
      title: "Edit Success!",
      text: "Your request has been edited successfully.",
    });
  };

  const handleDeleteRequest = (itemName) => {
    setPreorder((prevPreorder) =>
      prevPreorder.filter((item) => item.name !== itemName)
    );

    MySwal.fire({
      icon: "success",
      title: "Delete Success!",
      text: "Your request has been deleted successfully.",
    });
  };

  return (
    <>
      <nav className="navbar sticky-top">
        <div className="container">
          <a className="navbar-brand text-white" href="/">
            AKPStore
          </a>
          <DarkMode />
        </div>
      </nav>

      <motion.div
        className="page-hero-wrapper mb-3"
        animate={{ y: 0 }}
        initial={{ y: -500 }}
        transition={{ duration: 1 }}
      >
        <img src={largeImage} alt="CoverImage" className="page-hero-image" />
        <div className="page-hero-header-text">
          <span className="header-text-1">Welcome to</span>
          <span className="header-text-2">AKP Store</span>
        </div>
      </motion.div>

      <div className="bank_space"></div>

      <motion.h1
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        Jewelery
      </motion.h1>

      <ShowProduct product={product1} />

      <motion.h1
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        Men's clothing
      </motion.h1>

      <ShowProduct product={product2} />

      <motion.h1
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        Women's clothing
      </motion.h1>

      <ShowProduct product={product3} />

      <div className="bank_space"></div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FormProduct
          onRequestSubmit={handleRequestSubmit}
          preorder={preorder}
        />
      </motion.div>

      <div className="bank_space"></div>

      <Request
        preorder={preorder}
        onRequestSubmitEdit={handleRequestSubmitEdit}
        onDeleteRequest={handleDeleteRequest}
      />

      <motion.div
        className="footer magicpattern2 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>Copyright © 2023 Kidsanan Pradootong</p>
      </motion.div>
    </>
  );
}

export default App;
