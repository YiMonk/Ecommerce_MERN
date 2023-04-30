import React from 'react';
import BtnRender from './BtnRender';

function ProductItem({ product, deleteProduct }) {
    return (
        <div className='product_card'>
            <img src={product.imagen.url} alt='' />
            <div className='product_box'>
                <h2 title={product.nombre}> {product.nombre}</h2>
                <span>${product.precrio}</span>
                <p>{product.descripcion}</p>
            </div>
            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
}

export default ProductItem;