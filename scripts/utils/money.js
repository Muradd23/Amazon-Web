/*
  money.js
  Utilidad para formatear valores monetarios.
  Convierte centavos a un valor con dos decimales para mostrarlo en la interfaz.
*/

export function formatCurrency(priceCents){
    return (Math.round(priceCents)/100).toFixed(2)
}