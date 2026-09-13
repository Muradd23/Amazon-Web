/*
  backend-practice.js
  Archivo de práctica para probar fetch/XHR y conectar a la API del backend.
  Sirve como ejemplo de cómo hacer peticiones HTTP simples.
*/

const xhr  = new XMLHttpRequest()

xhr.addEventListener('load', ()=>{
    console.log(xhr.response)
})

xhr.open('GET','https://supersimplebackend.dev')
xhr.send()
