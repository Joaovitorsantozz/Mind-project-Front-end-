
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
    Axios.get(`http://localhost:3001/produto/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

      .then((response) => {
        console.log("Resposta do backend:", response.data); // Verifique o conteúdo aqui
        setProduto(response.data);
      })
      .catch((error) => {
        console.log("Erro ao recuperar item", error);
      });
  }, [id]);


  const handleEditItem = (values: Produto) => {
    const formData = new FormData();

    formData.append("nome",values.nome);
    formData.append("preço",String(values.preço));
    formData.append("categoria",values.categoria);


    Axios.post("http://localhost:3001/editar",formData,{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response)=>{
        console.log(response.data)
        alert(response.data);
    }).catch((error)=>{
      alert("Erro ao modifcar o item" + error);
    })
  }

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
        <Formik
          initialValues={{
            id:0,
            nome: "",
            image:"",
            preço: produto.preço,
            categoria: "",
            quantidade:0,
            dataFabricacao:"",
        
          }}
          onSubmit={handleEditItem}
        >

          <Form>
            <div className="estoque-descricao">
              <button>+</button>
              <h2>Em estoque: {produto.quantidade}</h2>
              <button>-</button>
            </div>
            <div className="estoque-descricao">
              <label>Categoria</label>
              <Field as="select" name="categoria" value={produto.categoria}>
                <option value="" disabled>
                  Selecione uma categoria
                </option>
                <option value="bermuda">Bermuda</option>
                <option value="agasalho">Agasalho</option>
                <option value="camiseta">Camiseta</option>

              </Field>
            </div>
            <div className="estoque-descricao">
              <label>Preço (R$)</label>
              <Field name="preco" type="number" placeholder="20" />
            </div>
            <div className="estoque-descricao">
              <label>Alterar Nome</label>
              <Field name="nome" placeholder={produto.nome ? produto.nome : ""} />
            </div>
            <button type="submit">Salvar</button>
          </Form>
        </Formik>
      </div>
    </div >
  );
};


export default Estoque;