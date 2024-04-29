"use client";
import React, { useEffect } from "react";
import "stencil-header-main";
const ReactComp = () => {
  //   useEffect(() => {
  //     hydrateDocument()
  //   }, []);
  return (
    <div>
      <p>ReactComp</p>
      <my-component
        first="Stencil"
        last="'Don't call me a framework' JS"
      ></my-component>
      <p>awdqwfqwfwqfwqqwqf</p>
    </div>
  );
};

export default ReactComp;
