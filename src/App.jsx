import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
 
import Cadastro from "./pages/cadastro";
import TelaPrincipal from "./pages/telaprincipal";
import "./styles.css";  // Verifique se o caminho está correto


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />  {/* A tela de Login na URL /login */}
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/telaprincipal" element={<TelaPrincipal />} /> {/* Nova página */}
      
      </Routes>
    </Router>
  );
}

export default App;
