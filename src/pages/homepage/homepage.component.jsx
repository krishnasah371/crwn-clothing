import React from "react";

import "./homepage.styles.scss";
import Directory from "../../components/directory/directroy.component";

const HomePage = (props) => {
  console.log(props);
  return (
    <div className="homepage">
      <Directory />
    </div>
  );
};

export default HomePage;
