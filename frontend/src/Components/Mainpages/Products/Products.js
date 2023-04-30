import { useContext, useState } from 'react';
import {GlobalState} from '../../../GlobalState';
import axios from 'axios';
import Loading from '../Utils/Loading/Loading'
import ProductItem from '../Utils/ProductItem/ProductItem'

function Products() {
  
    const state = useContext(GlobalState);
    const [productos] = state.ProductsAPI.productos
    const [isAdmin] = state.UserAPI.isAdmin
    const [callback, setCallback] = state.ProductsAPI.callback
    const [loading, setLoading] = useState(false)
    const [token] = state.token

    const deleteProduct = async (id) => {
        try {
            setLoading(true)
            await axios.delete(`http://localhost:3002/api/productos/deleteProduct/${id}`, {
                headers: { Authorization: token },
            });

            setLoading(false)
            setCallback(!callback)

        } catch (error) {
            alert(error.res.data.msg)
        }
    }

    return (
        <>
            <div className='products'>
                {productsmap((producto) => {
                        return (
                            <ProductItem
                                key={producto._id}
                                productos={producto}
                                isAdmin={isAdmin}
                                deleteProduct={deleteProduct}
                            />

                        )
                    })
                }
            </div>

            {productslength === 0 && <Loading />}
        </>
    )
}

export default Products;