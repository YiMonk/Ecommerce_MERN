import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';


function BtnRender({ productos, deleteProduct }) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.UserAPI.isAdmin

    return (
        <div className='row_btn'>
            {isAdmin ?
                (
                    <>
                        <Link
                            id="btn_buy"
                            to={"#!"}
                            onClick={() => deleteProduct(products_id)}
                        >
                            Borrar
                        </Link>

                        <Link
                            id="btn_view"
                            to={`/edit_product/${products_id}`}
                        >
                            Editar
                        </Link>

                    </>
                ) : (
                    <>
                        <Link
                            id="btn_view"
                            to={`/detail/${products_id}`}
                        >
                            Ver detalles
                        </Link>

                    </>
                )

            }
        </div>
    )
}

export default BtnRender