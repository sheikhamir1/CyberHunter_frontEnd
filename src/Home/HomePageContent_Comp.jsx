import React, { useRef, useEffect } from "react";

// css
import "./Home.css";

function HomePageContent_Comp() {
  return (
    <>
      {/* <h1>this is Home Page</h1> */}
      <div className="setupHome">
        <div className="div1 animate-on-load">
          <h1 style={{ padding: "30px", fontSize: "30px" }}>
            Welcome to Cyber Hunter!
          </h1>
          <h5 className="textInDiv1 ">
            {" "}
            Join us to learn about cyber security and protect yourself from
            cyber threats.
          </h5>
        </div>
        <div className="div2">
          <img
            className="pic1 animate-on-load"
            src="/pic3.png"
            alt="this is pic 3"
          />
        </div>
      </div>
      <div className="setupHome animate-on-scroll">
        <div className="div1 animate-on-load ">
          <h1 style={{ padding: "30px", fontSize: "30px" }}>
            Also write Article And Share Your Experience with Us!
          </h1>
          <h5 className="textInDiv1 ">
            {" "}
            This site isn't just for security enthusiasts; it's also a hub for
            developers.
          </h5>
        </div>
        <div className="div2">
          <img
            className="pic1 animate-on-load"
            src="/pic4.png"
            alt="this is pic 4"
          />
        </div>
      </div>
    </>
  );
}

export default HomePageContent_Comp;
