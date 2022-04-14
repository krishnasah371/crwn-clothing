import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";

// Styles and components
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component";
import Header from "./components/header/header.component";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  // ComponentDidMount()
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      // ComponentWillUnmount();
      return () => {
        unsubscribeFromAuth();
      };
    }, []);
  });

  return (
    <div>
      <Header currentUser={currentUser} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signin" element={<SignInAndSignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
