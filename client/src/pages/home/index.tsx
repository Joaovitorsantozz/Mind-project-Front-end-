
import './style.css';
import Trash from '../../assets/trash.png';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
function Home() {

  interface FormValues {
    name: string;
    email: string;
    senha: string;
  }

  const handleClickLogin = (values: FormValues) => console.log(values);
  const validationLogin = yup.object().shape({
    name: yup.string().required("O campo é obrigatório"),
    email: yup.string().email().required("Este não é um email válido"),
    senha: yup.string().min(8).required("A senha deve conter mais de 8 caracteres"),

  });


  const handleClickCadastro = (values: FormValues) => console.log(values);
  const validationCadastro = yup.object().shape({
    name: yup.string().required("O campo é obrigatório"),
    email: yup.string().email().required("Este não é um email válido"),
    senha: yup.string().min(8).required("A senha deve conter mais de 8 caracteres"),
    confirmarSenha:yup.string().oneOf([yup.ref("senha")],"As senhas devem ser iguais")
  })
const users = [{
  id: "1941agagawopgawg3r215",
  name: "João",
  email: "joao@gmail.com"
}, {
  id: "09592169nisangangaig",
  name: "Marcelo",
  email: "marcelo@gmail.com"
}]



return (

  <section className="cadastro">
    <div className='box-center'>
      <div className='cadastro-container'>
        <Formik
          initialValues={{ name: '', email: '', senha: '' }}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}
        >
          <Form className='cadastro-form'>
            <h1>Fazer Login</h1>
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
              <button type='submit' className="form-cadastro">Entrar</button>

            </div>


          </Form>
        </Formik>

      </div>





      <div className='cadastro-container'>
        <Formik
          initialValues={{ name: '', email: '', senha: '' ,confirmarSenha:''}}
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
    <div className='user-container'>
      {users.map(user => (
        <div className='user' key={user.id}>
          <p><b style={{ color: "#0A3D47", fontWeight: "bold" }}>Nome:</b> {user.name}</p>
          <p><b style={{ color: "#0A3D47", fontWeight: "bold" }}>Email:</b> {user.email}</p>
          <p><b style={{ color: "#0A3D47", fontWeight: "bold" }}>Senha:</b> {user.id}</p>
          <button><img src={Trash} width={20}></img></button>
        </div>
      ))}






    </div>
  </section >

)
}

export default Home
