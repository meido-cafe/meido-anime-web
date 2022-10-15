import React from "react";
import Router from "./router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const path = window.location.pathname;
  console.log(11111111111111);
  return (
    <div className="App">
      <BrowserRouter>
        {path === "/Login" ? (
          <Routes>
            <Route key="/Login" path={"/Login"} element={<Login />} />
          </Routes>
        ) : (
          <Router></Router>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
