
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


  const handleEditItem = (values: Produto, actions: any) => {
    if (
      values.nome !== produto?.nome ||
      values.preco !== produto?.preco ||
      values.categoria !== produto?.categoria ||
      values.quantidade !== produto?.quantidade
    ) {
      const formData = new FormData();
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

        });
      actions.setSubmitting(false);
    }
  };

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }


  if (!produto) {
    return <p>Produto não encontrado ou carregando... <Link to="/dashBoard"> voltar para a página principal</Link></p>;
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
              nome: produto.nome || '',
              preco: produto.preco || 0,
              image:"",
              categoria: produto.categoria || '',
              quantidade: produto.quantidade || 0,
              dataFabricacao: produto.dataFabricacao || '',
            }}
            onSubmit={handleEditItem}
          >
            {({ dirty, isSubmitting }) => (
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
                <button type="submit" disabled={isSubmitting || !dirty}>
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div >
    </div>
  );
};


export default Estoque;