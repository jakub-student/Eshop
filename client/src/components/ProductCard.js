import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import '../css/link.css'

const ProductCard = props => (
    <Card className="text-center">
        <Link to={"/details/" + props.product._id} classname="unstyled" >
        <Card.Img variant="top" src={props.product.imgPath} />
        <Card.Body>
            <Card.Title>{props.product.name}</Card.Title>
            <Card.Text>
                Price: {props.product.price},-
            </Card.Text>
        </Card.Body>
        </Link>
    </Card>
)

export default ProductCard;