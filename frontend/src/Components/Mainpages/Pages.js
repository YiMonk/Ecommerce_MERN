import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import NotFound from './Utils/NotFound/NotFound';
// import Products from './Products/Products';
// import Login from './auth/Login';


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin
 

    return (
        <Routes>




            <Route path='*' element={<NotFound/>} />

        </Routes> 
    );
}

export default Pages