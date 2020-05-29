import React from "react";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const ProductInfo = props => (
    <tr>
        <td>
            {props.product.name}
        </td>
        <td>
            {props.product.atStore} pcs at store
        </td>
        <td>
            {props.product.price}
        </td>
        <td>
            <Link to={"/admin/edit/"+props.product._id} classname="unstyled" >
                <Button>Edit</Button>
            </Link>
        </td>
        <td>
            <Button onClick={() => props.onClickRemove(props.product._id)}>Delete</Button>
        </td>
    </tr>
)

export default ProductInfo;