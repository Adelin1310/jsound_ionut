import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineShopping,
} from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { Cart } from "./";
import { logoutUser } from "../lib/api";

const Navbar = () => {
  let router = useRouter();
  const {
    setCurrentUser,
    currentUser,
    showCart,
    setShowCart,
    totalQuantities,
  } = useStateContext();

  const handleLog = async () => {
    if (currentUser) {
      const response = await logoutUser();
      if (response.success) setCurrentUser(null);
    } else {
      router.replace("/auth/Login");
    }
  };
  const handleClick = () => {
    currentUser !== null ? setShowCart(true) : router.push("/auth/Login");
  };
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSound</Link>
      </p>
      <div>
        <button type="button" className="cart-icon" onClick={() => handleLog()}>
          {currentUser ? <AiOutlineLogout /> : <AiOutlineLogin />}
        </button>
        <button
          type="button"
          className="cart-icon"
          onClick={() => handleClick()}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
