
import './style.css';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Link } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    interface FormValues {
        email: string;
        senha: string;
    }

    const handleClickLogin = (values: FormValues) => {

        Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.senha
        })
            .then((response) => {
                console.log(response.data.token)
                if(!response.data.token){
                    alert("Erro ao logar confira senha e email");
                }
                const token = response.data.token;
                if (token) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("email", values.email);
                    alert("Logado com Sucesso");
                    navigate("/dashboard");
                }
            })
            .catch((error) => {
                alert("Erro ao fazer login:"+ error);
            });
    };

    const validationLogin = yup.object().shape({

        email: yup.string().email().required("Este não é um email válido"),
        senha: yup.string().min(8).required("A senha deve conter mais de 8 caracteres"),

    });

    return (
        <div className='cadastro-container'>
            <Formik
                initialValues={{ email: '', senha: '' }}
                onSubmit={handleClickLogin}
                validationSchema={validationLogin}
            >
                <Form className='cadastro-form'>
                    <h1>Fazer Login</h1>
                    <div className='inputs-container'>


                        <Field name="email" className="form-field" placeholder="Email"></Field>
                        <ErrorMessage component="span"
                            name="email"
                            className='form-error'
                        />
                        <Field type="password" name="senha" className="form-field" placeholder="Senha"></Field>
                        <ErrorMessage component="span"
                            name="senha"
                            className='form-error'
                        />
                        <p>Não possui uma conta ainda? <Link to="/cadastro"><a> Crie Agora</a> </Link></p>
                        <button type='submit' className="form-cadastro">Entrar</button>

                    </div>


                </Form>
            </Formik>
        </div>
    );
};

export default Login;