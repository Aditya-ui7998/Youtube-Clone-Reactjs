import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";

const Home = ({ sidebar }) => {
const[category,setcategory] = useState(0);

  return (
    <div>
      <Sidebar sidebar={sidebar} category ={category} setcategory={setcategory} />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed  category={category}/>
      </div>
    </div>
  );
};

export default Home;
