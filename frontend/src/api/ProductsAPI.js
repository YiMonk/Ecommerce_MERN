import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductsAPI() {

    const [productos, setProductos] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        const getProductos = async () => {
            const res = await axios.get('/api/productos/all');
            setProductos(res.data.productos);
        };
        getProductos();
    }, [callback])

    return {
        productos: [productos, setProductos],
        callback: [callback, setCallback],
    };
}

export default ProductsAPI;