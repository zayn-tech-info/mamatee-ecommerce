import React from "react";
import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../components/home/Product";

const Home = () => {
  return (
    <>
      <NavBar />
     <Product />
    </>
  );
};

export default Home;
