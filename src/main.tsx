import ReactDOM from "react-dom/client";
import { useState } from "react";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/icons/css/all.min.css";
import "./styles/global.scss";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as HTMLElement);

function Parent() {
    const [data, setData] = useState("");

    function call() {
        console.log("Value = " + data);
    }
    return (
        <>
            <h1>Default data value = {data}</h1>
            <Child n={setData} callMe={call()} />
        </>
    )
}

function Child({ n, callMe } : any) {
    function go() {
        n("Changed2");
        callMe;
    }
    return (
        <>
            <button onClick={() => go()}>CLICK Me</button>
        </>
    );
}


//root.render(<Parent />);
root.render(<App />);