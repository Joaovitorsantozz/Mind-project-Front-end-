
import './style.css';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Link } from 'react-router-dom'; 

const Login = () => {

    interface FormValues {
        name: string;
        email: string;
        senha: string;
    }

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

                        <p> Ja possui uma conta? <Link to="/login"> Faça Login</Link></p>
                        <button type='submit' className="form-cadastro">Cadastrar</button>

                    </div>


                </Form>
            </Formik>
        </div>
    );
};

export default Login;