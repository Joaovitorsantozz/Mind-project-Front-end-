
import React, { useState, useEffect } from 'react';
import "./style.css"
import assets from "../../assets/assets";
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Axios from "axios";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
const dashBoard = () => {
  const [produtos, setProdutos] = useState<Item[]>([]);
  const username = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get("http://localhost:3001/dashboard",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Adicionando o token aqui
      },
    })
      .then((response) => {
        console.log("Produtos recebidos:", response.data); // Verifique os dados recebidos
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await Axios.delete(`http://localhost:3001/products/${id}`);
      alert("O item foi excluido com sucesso (atualize a página)");
    } catch (error) {
      alert('Erro ao excluir');
    }
  };

  interface Item {
    id: number;
    nome: string;
    imagem: string;
    preco: number;
    categoria: string;
    quantidade: number;
    dataFabricacao: string;
  }

  const validationCadastroItem = yup.object().shape({
    nome: yup.string().required('O nome é obrigatório'),
    preco: yup.number().required('O preço é obrigatório'),
    categoria: yup.string().required('A categoria é obrigatória'),
    quantidade: yup.number().integer('A quantidade deve ser um número inteiro').required('A quantidade é obrigatória'),
    dataFabricacao: yup.string().required('A data de fabricação é obrigatória'),
    imagem: yup
      .mixed().required('A imagem é obrigatória')
      .test('fileSize', 'O tamanho da imagem não pode exceder 2MB', (value) => {
        return value instanceof File && value.size <= 2 * 1024 * 1024;
      })
      .test('fileFormat', 'O formato da imagem deve ser JPG ou PNG', (value) => {
        return value instanceof File && ['image/jpeg', 'image/png'].includes(value.type);
      }),
  });

  const handleCadastroItem = (values: Item) => {
    const formData = new FormData();


    formData.append("nome", values.nome);
    formData.append("preco", String(values.preco));
    formData.append("categoria", values.categoria);
    formData.append("quantidade", String(values.quantidade));
    formData.append("dataFabricacao", values.dataFabricacao);


    if (values.imagem) {
      formData.append("imagem", values.imagem);
    }


    Axios.post("http://localhost:3001/dashboard", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:`Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        alert(response.data);

        

      })
      .catch((error) => {
        alert("Erro ao cadastrar item: " + error);
      });
  };
  if (!token) {
    return <Navigate to="/login"></Navigate>
  }
  return (
    <section className="products">
      <nav>
        <div className="logo">
          <img src={assets.box}></img>
          <h2>Painel Administrativo</h2>
        </div>

        <div className="usuario-logado">


          <p><b>{username}</b></p>
          <img src={assets.user}></img>
        </div>
      </nav>
      <header>
        <div className="header-left">
          Controle Painel
        </div>
        <div className="header-right">
          <img src={assets.door} width={30}></img>
          <h2><a>Fazer Logout</a></h2>
        </div>
      </header>
      <div className="container">
        <div className="barra-lateral">

        </div>
        <div className="products-box">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              console.log("imagem",produto.imagem),
              <div key={produto.id} className='product'>
                <img src={produto.imagem} alt={produto.nome}></img>
                <h2>{produto.nome}</h2>
                <Link to={`/estoque/${produto.id}`}>Ver mais detalhes</Link>
                <button onClick={()=>handleDelete(produto.id)}>Excluir</button>
              </div>
            ))
          ) : (
            <p> Nenhum produto encontrado </p>
          )}
        </div>
      </div>



      <div className="cadastrar-item">
        <Formik
          initialValues={{
            id: 0,
            nome: '',
            preco: 0,
            categoria: '',
            quantidade: 0,
            imagem: '',
            dataFabricacao: '',
          }}
          validationSchema={validationCadastroItem}
          onSubmit={handleCadastroItem}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="form-container">
              <div className="form-row">

                <div className="form-group">
                  <label>
                    Nome
                    <Field name="nome" placeholder="Nome" />
                    {errors.nome && touched.nome && <div>{errors.nome}</div>}
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    Preço
                    <Field name="preco" type="number" placeholder="Insira o preço" />
                    {errors.preco && touched.preco && <div>{errors.preco}</div>}
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    Categoria
                    <Field as="select" name="categoria">
                      <option value="" disabled>
                        Selecione uma categoria
                      </option>
                      <option value="bermuda">Bermuda</option>
                      <option value="agasalho">Agasalho</option>
                      <option value="camiseta">Camiseta</option>

                    </Field>
                  </label>
                  {errors.categoria && touched.categoria && <div>{errors.categoria}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Quantidade em Estoque
                    <Field name="quantidade" type="number" placeholder="Quantidade" />
                    {errors.quantidade && touched.quantidade && <div>{errors.quantidade}</div>}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Data de fabricação
                    <Field name="dataFabricacao" type="date" />
                    {errors.dataFabricacao && touched.dataFabricacao && (
                      <div>{errors.dataFabricacao}</div>
                    )}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Selecione a imagem
                    <input
                      name="imagem"
                      type="file"
                      accept="image/jpeg, image/png"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0] || null;
                        setFieldValue('imagem', file);
                      }}
                    />
                    {errors.imagem && touched.imagem && <div>{errors.imagem}</div>}
                  </label>
                </div>
              </div>

              <button type="submit">Cadastrar Item</button>
            </Form>
          )}

        </Formik>
      </div>
    </section>


  );
};

export default dashBoard;