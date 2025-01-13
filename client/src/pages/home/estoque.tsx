
import "./style.css"
import productImage from "../../assets/productImage.png";
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios'
import { Formik, Form, Field } from "formik";


const Estoque = () => {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);

  // Verificar se o produto foi carregado
  useEffect(() => {
    Axios.get(`http://localhost:3001/produto/${id}`)
      .then((response) => {
        console.log("Resposta do backend:", response.data); // Verifique o conteúdo aqui
        setProduto(response.data);
      })
      .catch((error) => {
        console.log("Erro ao recuperar item", error);
      });
  }, [id]);

  const token = localStorage.getItem("token");

  // Verificação de token
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Caso o produto não tenha sido carregado ainda
  if (!produto) {
    return <p>Produto não encontrado ou carregando...</p>;
  }

  interface Produto {
    id: number;
    nome: string;
    image: string;
    preço: number;
    categoria: string;
    quantidade: number;
    dataFabricacao: string;
  }

  console.log("Imagem do produto:", produto.image);
  console.log("Preço do produto:", produto.preço); // Aqui deve exibir o preço do produto corretamente agora.

  return (
    <div className="estoque-container">
      <div className="estoque">
        <div className="estoque-topo">
          <img src={produto.image} alt="Imagem do produto" />
          <h2>{produto.nome}</h2>
        </div>
        <div className="estoque-descricao">
          <button>+</button>
          <h2>Em estoque: {produto.quantidade}</h2>
          <button>-</button>
        </div>
        <div className="estoque-descricao">
          <label>Categoria</label>
          <select value={produto.categoria}>
            <option value="roupa">Roupa</option>
            <option value="eletronico">Eletrônico</option>
            <option value="moveis">Móveis</option>
          </select>
        </div>
        <div className="estoque-descricao">
          <label>Preço (R$)</label>
          {/* Definindo o placeholder somente após o produto ser carregado */}
          <input type="number" placeholder={produto.preço ? produto.preço.toString() : ""} />
        </div>
        <div className="estoque-descricao">
          <label>Alterar Nome</label>
          <input type="text" placeholder={produto.nome} />
        </div>
      </div>
    </div>
  );
};


export default Estoque;