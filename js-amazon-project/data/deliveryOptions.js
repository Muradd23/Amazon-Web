/*
  deliveryOptions.js
  Contiene las opciones de entrega disponibles para cada producto.
  - define días estimados de entrega
  - define costos de envío por opción
  - devuelve la opción seleccionada según su id
*/

export const deliveryOptions = [
{
    id:'1',
    deliveryDays:7,
    priceCents:0
},
{
    id:'2',
    deliveryDays:3,
    priceCents:499
},
{
    id:'3',
    deliveryDays:1,
    priceCents:999
}]

export function getDeliveryOptions(deliveryOptionId){
    let matchingDelivery
    deliveryOptions.forEach((deliveryOption)=>{
        if(deliveryOption.id===deliveryOptionId){
            matchingDelivery = deliveryOption
        }
    })
    return matchingDelivery 
}