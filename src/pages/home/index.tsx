
import './style.css'
import Trash from '../../assets/trash.png'
function Home() {

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
          <form>
            <h1>Cadastrar usuário</h1>
            <div className='inputs-container'>
              <input type="text" placeholder='Insira seu Nome' name="nome" />
              <input type="text" placeholder='Insira seu Email' name="email" />
              <input type="text" placeholder='Insira sua Senha' name="senha" />

              <button type='button' className="form-cadastro">Cadastrar</button>

            </div>
          </form>
        </div>
      </div>
      <div className='user-container'>
        {users.map(user => (
          <div className='user' key={user.id}>
            <p><b style={{ color: "#0A3D47", fontWeight:"bold"}}>Nome:</b> {user.name}</p>
            <p><b style={{ color: "#0A3D47", fontWeight:"bold"}}>Email:</b> {user.email}</p>
            <p><b style={{ color: "#0A3D47", fontWeight:"bold"}}>Senha:</b> {user.id}</p>
            <button><img src={Trash} width={20}></img></button>
          </div>
        ))}






      </div>
    </section>

  )
}

export default Home
