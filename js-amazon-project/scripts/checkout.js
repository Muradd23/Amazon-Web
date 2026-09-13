/*
  checkout.js
  Inicializa la página de checkout.
  Carga los productos y el carrito antes de renderizar los paneles de resumen y pago.
*/

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'

async function loadPage(){

   try {
        await Promise.all([
            loadProductsFetch(),
            loadCart(),
        ])
   } catch (error) {
    
   }
   renderOrderSummary()
   renderPaymentSummary()
}loadPage()
// Promise.all([
//  loadProductsFetch()  
// ,new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve()
//         })
//     })
// ]).then((values)=>{
//     console.log(values);
    
//     renderOrderSummary()
//     renderPaymentSummary()
// })

//  new Promise((resolve)=>{    
//      loadProducts(()=>{
//          resolve('value1')
//     })

//  }).then((value)=>{
//     console.log(value);
    
//     return new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve()
//         })
//     })

//  }).then(()=>{
//     renderOrderSummary()
//     renderPaymentSummary()
//  })


//  loadProducts(()=>{
//     loadCart(()=>{
//         renderOrderSummary()
//         renderPaymentSummary()
//     })
     
//  })

