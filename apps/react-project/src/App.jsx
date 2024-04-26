import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p>Mono repo using pnpm</p>
        <my-component
          useauth={JSON.stringify({ name: "naveen" })}
          first="Stencil"
          last="'Don't call me a framework' JS"
        ></my-component>
      </div>
    </>
  );
}

export default App;
