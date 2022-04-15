import React from "react";

// Stules and components
import "./signin-and-signup.styles.scss";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const SignInAndSignUpPage = () => {
  return (
    <div className="signin-and-signup-page">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSignUpPage;
