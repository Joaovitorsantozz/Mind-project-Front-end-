
import React, { useState, useEffect } from 'react';
import "./style.css"
import assets from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Axios from "axios";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
const dashBoard = () => {
  const [categoriaSelecionada, setCategoriaselecionada] = useState<string | undefined>(undefined);
  const [produtos, setProdutos] = useState<Item[]>([]);
  const username = localStorage.getItem("email");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();



  useEffect(() => {
    const token = localStorage.getItem('token');
    const verificarToken = () => {
      if (!token) {
        alert('Sua sessão expirou. Por favor, faça login novamente.');
        navigate('/login');
      }
      setToken(token);
    };


    verificarToken();


    if (token) {
      Axios.get("http://localhost:3001/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Produtos recebidos:", response.data);
          setProdutos(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
        });
    }

  }, [navigate, token]);


  const handleDelete = async (id: number) => {
    try {
      await Axios.delete(`http://localhost:3001/products/${id}`);
      alert("O item foi excluido com sucesso (atualize a página)");
    } catch (error) {
      alert('Erro ao excluir');
    }
  };

  const produtosFiltrados = categoriaSelecionada
    ? produtos.filter((produto) => produto.categoria === categoriaSelecionada)
    : produtos;


  interface Item {
    id: number;
    nome: string;
    imagem: string;
    preco: number;
    categoria: string;
    quantidade: number;
    dataFabricacao: string;
    descricao: string;
  }


  const handleLogout = (event: any) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

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
    formData.append("descricao", values.descricao);

    if (values.imagem) {
      formData.append("imagem", values.imagem);
    }


    Axios.post("http://localhost:3001/dashboard", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const getClassName = (categoria: string) => {
    return categoria === categoriaSelecionada ? "selected" : '';
  }

  const handleScrollToSection = (sectionId: any) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

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
        <div className='cadastrar-novo'>
          <h2> <a href="#sessaocadastraritem"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection('sessaocadastraritem');
            }}>Cadastrar novo produto</a></h2>
        </div>
        <div className="header-right">
          <img src={assets.door} width={30}></img>
          <h2><Link to="/login" onClick={handleLogout}>Fazer Logout</Link></h2>
        </div>
      </header>
      <div className="container">
        <div className="barra-lateral">
          <h2>Selecione uma categoria para filtrar</h2>
          <ul>
            <li onClick={() => setCategoriaselecionada('')} className={getClassName('')}><a href='#'>Todos</a></li>
            <li onClick={() => setCategoriaselecionada('bermuda')} className={getClassName('bermuda')} ><a href='#'>Bermuda</a></li>
            <li onClick={() => setCategoriaselecionada('camiseta')} className={getClassName('camiseta')}><a href='#'>Camiseta</a></li>
            <li onClick={() => setCategoriaselecionada('agasalho')} className={getClassName('agasalho')}><a href='#'>Agasalho</a></li>
            <li onClick={() => setCategoriaselecionada('roupa-intima')} className={getClassName('roupa-intima')}><a href='#'>Roupa íntima</a></li>
            <li onClick={() => setCategoriaselecionada('regata')} className={getClassName('regata')}><a href='#'>Regatas</a></li>
            <li onClick={() => setCategoriaselecionada('calça')} className={getClassName('calça')}><a href='#'>Calças</a></li>
            <li onClick={() => setCategoriaselecionada('roupa-de-inverno')} className={getClassName('roupa-de-inverno')}><a href='#'>Roupas de inverno</a></li>
            <li onClick={() => setCategoriaselecionada('meia')} className={getClassName('meia')}><a href='#'>Meias</a></li>

          </ul>
        </div>
        <div className='produtos-show'>
          <h2>Produtos Cadastrados</h2>
          <div className="products-box">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <div key={produto.id} className='product'>
                  <img src={produto.imagem} alt={produto.imagem}></img>
                  <h2>{produto.nome}</h2>
                  <h4>{produto.categoria}</h4>
                  <Link to={`/estoque/${produto.id}`}>Ver mais detalhes</Link>
                  <button
                    className="excluir-item"
                    onClick={() => handleDelete(produto.id)}
                  >
                    Excluir <img src={assets.trash} width={20}></img>
                  </button>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center' }}> Nenhum produto encontrado, cadastre no banco de dados</p>
            )}


          </div>
        </div>
      </div>


      <div className='container'>
        <div className="cadastrar-item" id="sessaocadastraritem">
          <Formik
            initialValues={{
              id: 0,
              nome: '',
              preco: 0,
              categoria: '',
              quantidade: 0,
              imagem: '',
              dataFabricacao: '',
              descricao: ''
            }}
            validationSchema={validationCadastroItem}
            onSubmit={handleCadastroItem}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="form-container">
                <h1>Insira os itens no banco de dados</h1>
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
                      Descrição do produto
                      <Field name="descricao" placeholder="Descrição" />
                      {errors.descricao && touched.descricao && <div>{errors.descricao}</div>}
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
                        <option value="regata">Regatas</option>
                        <option value="Calça">Calça</option>
                        <option value="roupa-de-inverno">Roupas de inverno</option>
                        <option value="roupa-intima">Roupas íntimas</option>
                        <option value="meia">Meias</option>
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

      </div>
    </section >

  );
};

export default dashBoard;