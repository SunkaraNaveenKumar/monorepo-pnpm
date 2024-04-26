// import { useClient } from 'next/client';
// import React,{ useEffect } from "react";
export default function Home() {
// useClient()
// useEffect(()=>{

// },[])
  return (
    <div>
      <p>Mono repo in next js </p>
      <my-component
        useauth={JSON.stringify({ name: "naveen" })}
        first="Stencil"
        last="'Don't call me a framework' JS"
        ></my-component>
        <p>awdqwfqwfwqfwqqwqf</p>
    </div>
  );
}
