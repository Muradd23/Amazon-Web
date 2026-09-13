/*
  paymentSummary.js
  Calcula y renderiza el resumen financiero del pedido.
  - suma precios de productos y envío
  - calcula impuesto y total final
  - genera la acción de "Place your order" para enviar la compra
*/

import{cart} from '../../data/cart.js'
import{getProduct} from '../../data/products.js'
import { getDeliveryOptions } from '../../data/deliveryOptions.js'
import { formatCurrency } from '../utils/money.js'
import { addOrder } from '../../data/orders.js'
export function renderPaymentSummary(){
      let productPriceCents = 0
      let shippingPriceCents = 0
      let totalQuantity = 0
       cart.forEach((cartItem)=>{
          const product =  getProduct(cartItem.productId)
          productPriceCents += product.priceCents * cartItem.quantity
          const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId)
          shippingPriceCents += deliveryOption.priceCents
          totalQuantity += cartItem.quantity
       })  
      const totalBeforeTax = productPriceCents + shippingPriceCents
      const tax = totalBeforeTax * 0.1
      const totalCents = totalBeforeTax + tax
      
      const paymentSummaryHTML =`
       <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-holder">
            Place your order
          </button>
      `

      const checkoutHeaderHTML = `
         Checkout (<a class="return-to-home-link"
            href="amazon.html">${totalQuantity} items</a>)
      `
  const paymentSummaryEl = document.querySelector('.js-payment-summary')
  if(paymentSummaryEl) paymentSummaryEl.innerHTML = paymentSummaryHTML

  const checkoutHeaderEl = document.querySelector('.js-checkout-header-middle-section')
  if(checkoutHeaderEl) checkoutHeaderEl.innerHTML = checkoutHeaderHTML

  document.querySelector('.js-place-holder').
  addEventListener('click',async ()=>{


    try {
      const response =  await fetch('https://supersimplebackend.dev/orders',{
        method: 'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          cart:cart
        })
    })

    const order = await response.json()
    console.log(order);
    addOrder(order)

    } catch (error) {
      console.log('Unexpected Error');
      
    }

    window.location.href = 'orders.html'
  })
} 