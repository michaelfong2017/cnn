import React from "react";
import ReactDOM from "react-dom";
import App from "App";
ReactDOM.render(<App />, document.getElementById("app"));
if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept()
    }
}
else {
    console.log = function() {}
}