/*
  searchRedirect.js
  Configura la búsqueda desde el header.
  - detecta el input y el botón de búsqueda
  - redirige a index.html con el texto buscado
  - permite buscar también al presionar Enter
*/

export function setupSearchRedirect(){
    const searchInput = document.querySelector('.js-search-bar')
    const searchButton = document.querySelector('.js-search-button')

    if(!searchInput || !searchButton) return

    searchButton.addEventListener('click',()=>{
        const text = searchInput.value.trim()
        if(!text) return

        window.location.href = `index.html?search=${encodeURIComponent(text)}`
    })

    searchInput.addEventListener('keydown',(e)=>{
        if(e.key==='Enter'){
            searchButton.click()
        }
    })
}