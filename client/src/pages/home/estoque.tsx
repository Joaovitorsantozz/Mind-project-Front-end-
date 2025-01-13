
import "./style.css"
import productImage from "../../assets/productImage.png";
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios'
const Estoque = () => {
  const id=useParams();
  const quantidade = 0;
  const preço = 32;
  const nome = "Nome Item";
  const categoria = "Camisetas";
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login"></Navigate>
  }
  return (
    <div className="estoque-container">
      <div className="estoque">
        <div className="estoque-topo">
          <img src={productImage}></img>
          <h2>Nome do Item (Id = 40195151-1an)</h2>
        </div>
        <div className="estoque-descriçao">
          <button>+</button>
          <h2>Em estoque {quantidade}</h2>
          <button>-</button>
        </div>
        <div className="estoque-descriçao">
          <label>
            Categoria
          </label>
          <select >
            <option value="roupa">Bermuda</option>
            <option value="eletronico">Camiseta</option>
            <option value="moveis">Agasalho</option>
          </select>
        </div>
        <div className="estoque-descriçao">
          <label>
           Preço R$
          </label>
          <input type="number" placeholder={preço.toString()}></input>
        </div>
        <div className="estoque-descriçao">
          <label>
           Alterar Nome
          </label>
          <input type="text" placeholder={nome}></input>
        </div>
      </div>
    </div>
  );
};

export default Estoque;