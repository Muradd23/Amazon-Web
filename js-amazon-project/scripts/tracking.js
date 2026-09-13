/*
  tracking.js
  Muestra el estado de entrega de un pedido específico.
  - lee orderId y productId desde la URL
  - calcula el avance del paquete
  - renderiza la barra de progreso y la fecha estimada de entrega
*/

import { loadCartFetch } from "../data/cart.js";
import { getOrder} from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { setupSearchRedirect } from "./utils/searchRedirect.js";
export async function renderTrackingPage(){

    await loadProductsFetch()
    await loadCartFetch()
    let trackingOrderHTML = ''
    const url = new URL(window.location.href)
    const orderId = url.searchParams.get('orderId')
    const productId = url.searchParams.get('productId')
    const matchingOrder = getOrder(orderId)
    const matchingProduct = getProduct(productId)
    const productsOrder = matchingOrder.products
    console.log(matchingOrder);
    console.log(matchingProduct);
    console.log(productsOrder);
    

    let productDetails
    productsOrder.forEach((details) => {
        if(details.productId === matchingProduct.id){
            productDetails = details
        }
    });
    console.log(productDetails);
    const today = dayjs()
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime)
    const deliveryTimeString = deliveryTime.format('dddd MMMM, D')
    const orderTime = dayjs(matchingOrder.orderTime)
    const percentProgressDecimal = ((today-orderTime)/(deliveryTime-orderTime))*100
    console.log(percentProgressDecimal);
    
    const percentProgress = (percentProgressDecimal*100).toFixed(2)
    console.log(percentProgress);
    
    trackingOrderHTML =`
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            Arriving on ${deliveryTimeString}
        </div>

        <div class="product-info">
            ${matchingProduct.name}
        </div>

        <div class="product-info">
                Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}"}">

        <div class="progress-labels-container">
            <div class="progress-label ${(percentProgress<50) ? 'current-status':''}">
                Preparing
            </div>
            <div class="progress-label ${(percentProgress>=50 && percentProgress<100)? 'current-status':''}">
                Shipped
            </div>
            <div class="progress-label ${(percentProgress>=100)? 'current-status':''}">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width:${percentProgress}%;"></div>
        </div>
        `
    document.querySelector('.js-order-tracking').innerHTML=trackingOrderHTML   
    setupSearchRedirect()
}

renderTrackingPage()


