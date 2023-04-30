import { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Menu from './Icons/menu.svg'
import Close from './Icons/close.svg'


function Header() {
  const state = useContext(GlobalState)

  const [isLogged] = state.UserAPI.isLogged;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/api/user/logout")
    localStorage.removeItem("firstLogin")
    window.location.href = "/"
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to={"/create_product"}>Crear Producto</Link>
        </li>
      </>
    )
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to={"/"} onClick={logoutUser}>Logout</Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100",
  };

  return (
    <header>

      <div className='menu' onClick={() => setMenu(!menu)}>
        <img src={Menu} alt='' width="30" />
      </div>

      <div className='logo'>
        <h1>
          <Link to={"/"}> {isAdmin ? "admin" : "shop"} </Link>
        </h1>
      </div>

      <ul style={styleMenu} >
        <li>
          <Link to={"/"}> {isAdmin ? "productos" : "shop"}</Link>
        </li>
      </ul>

      {isAdmin && adminRouter()}

      {isLogged ? (
        loggedRouter()
      ) : (
        <li>
          <Link to={"/login"}>Login or Register</Link>
        </li>
      )}

      <li onClick={() => setMenu(!menu)}>
        <img src={Close} alt="" width="30" className='menu' />
      </li>

    </header>
  )
}

export default Header