/*
  orders.js
  Genera la página de historial de pedidos.
  - muestra todos los pedidos realizados
  - calcula fechas y totales
  - permite volver a comprar y redirigir a tracking o búsqueda
*/

import { orders } from "../data/orders.js";
import { addToCart,cart, vaciarCart} from "../data/cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { formatCurrency } from "./utils/money.js";
import { getProduct,loadProductsFetch } from "../data/products.js";
import { setupSearchRedirect } from "./utils/searchRedirect.js";

async function renderOrderPage(){
    await loadProductsFetch()
    let orderSummaryHTML = ''
    orders.forEach(order => {
        console.log(order);
        const orderPlaced = dayjs(order.orderPlaced)
        const orderPlacedString=orderPlaced.format('dddd MMMM D')
        const orderTotal = formatCurrency(order.totalCostCents)
        const orderId = order.id
        const orderProducts = order.products
        orderSummaryHTML +=`
            <div class="order-header">
                <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderPlacedString}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${orderTotal}</div>
                </div>
                </div>

                <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${orderId}</div>
                </div>
            </div>
        `
        orderProducts.forEach(product=>{
            const productId = product.productId
            const matchingProduct = getProduct(productId)
            console.log(matchingProduct);
            const orderEstimatedDelivery = dayjs(product.estimatedDeliveryTime)
            const orderEstimatedDeliveryString = orderEstimatedDelivery.format('dddd MMMM, D')
            console.log(orderEstimatedDeliveryString);
            console.log(product.quantity);
            
            
            orderSummaryHTML += `
            <div class="order-details-grid">
                <div class="product-image-container">
                <img src="${matchingProduct.image}">
                </div>

                <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${orderEstimatedDeliveryString}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${productId}" data-product-quantity="${product.quantity}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${productId}">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
            </div>
        ` 
        })  
    });
    document.querySelector('.js-order-container').innerHTML=orderSummaryHTML
    const searchInput = document.querySelector('.js-search-bar')
    const searchButton = document.querySelector('.js-search-button')

    searchButton.addEventListener('click',()=>{
        console.log('click');
        
        const text = searchInput.value.trim()
        console.log(text);
        if(text !== ''){
            const encondedText = encodeURIComponent(text)
            console.log(encondedText);
            window.location.href=`index.html?search=${encondedText}`
        }
     })
    document.querySelectorAll('.js-buy-again-button').forEach((button)=>{
        button.addEventListener('click',()=>{
            const productId = button.dataset.productId
            const quantity=Number(button.dataset.productQuantity)
            console.log(productId);
            console.log(quantity);
            
            vaciarCart()
            addToCart(productId,quantity)
            renderOrderPage()
            console.log(quantity);
            
            console.log(cart);
            
            button.innerHTML='Added'
            setTimeout(()=>{
                button.innerHTML =`
                <button class="buy-again-button button-primary js-buy-again-button">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                `
            },1000)
        })
    })
    setupSearchRedirect()
}

renderOrderPage()
