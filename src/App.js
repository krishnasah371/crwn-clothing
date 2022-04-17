import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// Styles and components
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import ContactPage from "./pages/contact/contact.component";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component";
import Header from "./components/header/header.component";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // ComponentDidMount()
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const snapShot = await getDoc(userRef);
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data(),
        });
      } else {
        setCurrentUser(userAuth);
      }

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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignInAndSignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
