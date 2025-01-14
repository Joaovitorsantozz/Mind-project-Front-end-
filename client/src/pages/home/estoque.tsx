
import "./style.css"

import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios'
import { Formik, Form, Field } from "formik";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
const Estoque = () => {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:3001/produto/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

      .then((response) => {
        console.log("Resposta do backend:", response.data);
        setProduto(response.data);
      })
      .catch((error) => {
        console.log("Erro ao recuperar item", error);
      });
  }, [id]);


  const handleEditItem = (values: Produto) => {
    const formData = new FormData();

    // Preenchendo os dados no FormData
    formData.append("nome", values.nome);
    formData.append("preco", String(values.preco));
    formData.append("categoria", values.categoria);
    formData.append("quantidade", String(values.quantidade))

    formData.append("id", String(values.id));

    Axios.post("http://localhost:3001/editar", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        alert(response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        alert("Erro ao modificar o item: " + error);
        if (error.response) {
          console.error("Status do erro:", error.response.status);
          console.error("Dados do erro:", error.response.data);
          alert(`Erro: ${error.response.data}`);
        } else if (error.request) {
          console.error("Nenhuma resposta recebida:", error.request);
          alert("Erro: Nenhuma resposta recebida do servidor");
        } else {
          console.error("Erro ao configurar o pedido:", error.message);
          alert(`Erro ao configurar a requisição: ${error.message}`);
        }
      });
  };

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }


  if (!produto) {
    return <p>Produto não encontrado ou carregando...</p>;
  }

  interface Produto {
    id: number;
    nome: string;
    image: string;
    preco: number;
    categoria: string;
    quantidade: number;
    dataFabricacao: string;
  }



  return (
    <div className="estoque-box">
      <h2><Link to="/dashboard">Voltar ao dashboard</Link></h2>
      <div className="estoque-container">
        <div className="estoque">
          <div className="estoque-topo">
            <img src={produto.image} alt="Imagem do produto" />
            <h2>{produto.nome}</h2>
          </div>
          <Formik
            initialValues={{
              id: produto.id,
              nome: "",
              image: "",
              preco: produto.preco,
              categoria: produto.categoria,
              quantidade: produto.quantidade,
              dataFabricacao: "",

            }}
            onSubmit={handleEditItem}
          >

            <Form>
              <div className="estoque-descricao">
                <label>Quantidade em Estoque</label>
                <Field name="quantidade" type="number" placeholder={produto.quantidade ? produto.quantidade : ""} />
              </div>
              <div className="estoque-descricao">
                <label>Categoria</label>
                <Field as="select" name="categoria" placeholder={produto.categoria}>
                  <option value="">
                    Selecione uma categoria
                  </option>
                  <option value="bermuda">Bermuda</option>
                  <option value="agasalho">Agasalho</option>
                  <option value="camiseta">Camiseta</option>

                </Field>
              </div>
              <div className="estoque-descricao">
                <label>Preço (R$)</label>
                <Field name="preco" type="number" placeholder={produto.preco ? produto.preco : ""} />
              </div>
              <div className="estoque-descricao">
                <label>Alterar Nome</label>
                <Field name="nome" placeholder={produto.nome ? produto.nome : ""} />
              </div>
              <div className="estoque-descricao">
                <label>ID</label>
                <Field name="id" placeholder={produto.id ? produto.id : ""} disabled />
              </div>
              <button type="submit">Salvar</button>
            </Form>
          </Formik>
        </div>
      </div >
    </div>
  );
};


export default Estoque;