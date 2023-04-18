import React, { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import Layout from "./Layout";
import { validateToken } from "../lib/api";

const Wrapper = ({ children }) => {
  const { currentUser, setCurrentUser } = useStateContext();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await validateToken();

        if (!response.success) {
          setCurrentUser(null)
        }
        else{
          setCurrentUser(response.user)
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    };

    checkTokenValidity();
    
  },[]);

  return (
    <Layout>
      <Toaster />
      {children}
    </Layout>
  );
};

export default Wrapper;
