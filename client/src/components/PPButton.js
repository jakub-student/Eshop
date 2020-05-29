import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// převzato z: https://github.com/fireship-io/193-paypal-checkout-v2-demos/blob/master/react-app/src/App.js
export function PPButton({ cart, total, emptyCart }) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    useEffect(() => {
        if(paypalRef.current){
            const child = paypalRef.current.children[0];
            if(child){
                paypalRef.current.removeChild(paypalRef.current.children[0]);
            }
        }
        
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units : [
                        {
                            amount: {
                                currency_code: 'USD',
                                value: total,
                                breakdown: {
                                    item_total: {currency_code: "USD", value: total},
                                },
                            },
                            items : cart.map(product => {
                                return{
                                    name: product.name,
                                    unit_amount: {
                                        currency_code: 'USD',
                                        value: product.price,
                                    },
                                    quantity: product.quantity,
                                }
                            }),
                        },
                    ],
                });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaidFor(true);
                    axios.post('http://localhost:5000/products/order', cart);
                    emptyCart();
                },
                onError: err => {
                    setError(err);
                },
            })
        .render(paypalRef.current);
    }, [cart]);
  

    if (paidFor) {
        return (
            <div>
                <h1>Purchase complete!</h1>
            </div>
        );
    } else if(cart.length > 0){
        return (
            <div>
                {error && <div>Uh oh, an error occurred! {error.message}</div>}
                <div style={{textAlign: "center"}} ref={paypalRef} />
            </div>
        );
    }
    
    return null;
}