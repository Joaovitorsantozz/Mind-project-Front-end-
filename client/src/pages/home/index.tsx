
import './style.css';
import Trash from '../../assets/trash.png';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import Login from "./Login";
function Home() {

  interface FormValues {
    name: string;
    email: string;
    senha: string;
  }

  const handleClickLogin = (values: FormValues) => {
    console.log("Tentando fazer login com:", values.email, values.senha);  // Para verificar
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.senha
    })
    .then((response) => {
      alert(response.data.msg);
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
    });
  };

  const validationLogin = yup.object().shape({
   
    email: yup.string().email().required("Este não é um email válido"),
    senha: yup.string().min(8).required("A senha deve conter mais de 8 caracteres"),

  });


  const handleClickCadastro = (values: FormValues) => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      email: values.email,
      password: values.senha
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Erro ao enviar requisição:", error);
      });
  }
  const validationCadastro = yup.object().shape({
    name: yup.string().required("O campo é obrigatório"),
    email: yup.string().email().required("Este não é um email válido"),
    senha: yup.string().min(8).required("A senha deve conter mais de 8 caracteres"),
    confirmarSenha: yup.string().oneOf([yup.ref("senha")], "As senhas devem ser iguais")
  })
 



  return (

    <section className="cadastro">
      <div className='box-center'>
        <div className='cadastro-container'>
         

        </div>





        <div className='cadastro-container'>
          <Formik
            initialValues={{ name: '', email: '', senha: '', confirmarSenha: '' }}
            onSubmit={handleClickCadastro}
            validationSchema={validationCadastro}
          >
            <Form className='cadastro-form'>
              <h1>Cadastrar usuário</h1>
              <div className='inputs-container'>

                <Field name="name" className="form-field" placeholder="Nome"></Field>
                <ErrorMessage component="span"
                  name="name"
                  className='form-error'
                />
                <Field name="email" className="form-field" placeholder="Email"></Field>
                <ErrorMessage component="span"
                  name="email"
                  className='form-error'
                />
                <Field name="senha" className="form-field" placeholder="Senha"></Field>
                <ErrorMessage component="span"
                  name="senha"
                  className='form-error'
                />
                <Field name="confirmarSenha" className="form-field" placeholder="Confirme a senha"></Field>
                <ErrorMessage component="span"
                  name="confirmarSenha"
                  className='form-error'
                />
                <button type='submit' className="form-cadastro">Cadastrar</button>

              </div>


            </Form>
          </Formik>

        </div>
      </div>
    </section >

  )
}

export default Home
