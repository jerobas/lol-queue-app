import React from "react";
import Header from "../../containers/Header";
import Sidebar from "../../containers/Sidebar";
import "./styles.scss";

const CommonTemplate = ({ children, pagesDict, goToPage }) => {
  return (
    <div>
      <Header />
      <Sidebar pagesDict={pagesDict} goToPage={goToPage} />
      {children}
    </div>
  );
};

export default CommonTemplate;
