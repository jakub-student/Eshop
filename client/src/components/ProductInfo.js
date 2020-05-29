import React from "react";
import Button from 'react-bootstrap/Button'

const ProductInfo = props => (
    <tr>
        <td>
            {props.item.name}
        </td>
        <td>
            <Button onClick={() => props.onClickIncrease(props.item)}>+</Button>
            <input type="text" pattern="[0-9]*" value={props.item.quantity} onChange={(event) => props.onChange(props.item, event.target.value)} onBlur={(event) => props.onBlur(props.item)} />
            <Button onClick={() => props.onClickDecrease(props.item)}>-</Button>
        </td>
        <td>
            {props.item.atStore} pcs at store
        </td>
        <td>
            {props.item.price * props.item.quantity}
        </td>
        <td>
            <Button onClick={() => props.onClickRemove(props.item.id)}>X</Button>
        </td>
    </tr>
)

export default ProductInfo;