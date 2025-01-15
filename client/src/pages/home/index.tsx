
import './style.css';
import Trash from '../../assets/trash.png';

import * as yup from "yup";
import Axios from "axios";
import { BrowserRouter as Router, Routes,Route,} from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro"
import DashBoard from './dashbord';
import Estoque from './estoque';
function Home() {

  interface FormValues {
    name: string;
    email: string;
    senha: string;
  }

  





  return (

    <section className="cadastro">
      <div className='box-center'>
        <section className="cadastro">
          <div className='box-center'>
            <Router>
              <Routes>
                {/* Rota para o login */}
                <Route path="/login" element={<Login />} />

                {/* Rota para o cadastro */}
                <Route path="/cadastro" element={<Cadastro />} />

                <Route path="/dashboard" element={<DashBoard />} />

                <Route path="/estoque" element={<Estoque />} />

                <Route path="/estoque/:id" element={<Estoque/>}/>
                <Route path="/" element={<Login/>}/>
              </Routes>
            </Router>
          </div>
        </section>
      </div>
    </section >

  )
}

export default Home
