
/*
  orders.js
  Maneja el historial de pedidos del usuario.
  - guarda los pedidos en localStorage
  - agrega nuevos pedidos al inicio del arreglo
  - busca un pedido por su id para la vista de tracking
*/

export const orders = JSON.parse(localStorage.getItem('orders')) || []
export function addOrder(order){
    orders.unshift(order)
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders))
}

export function getOrder(orderId){
    let matchingOrder

    orders.forEach(order => {
        if(order.id===orderId){
            matchingOrder = order
        }
    });
    return matchingOrder
}