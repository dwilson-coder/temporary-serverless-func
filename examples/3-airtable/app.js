const result = document.querySelector('.result')


const fetchProducts = async () => {
    try {
        // const {data} = await axios.get('/api/3-airtable')

        // 3-z-complete.js is an optional file. It contains the combined functions.
        const {data} = await axios.get('/api/3-z-complete')
        const products = data
        .map((product) =>{
            const {id, url, name, price} = product
            return `<a href="product.html?id=${id}" class="product">
            <img src="${url}" alt="${name}" class="product">
            <div class="info">
            <h5>${name}</h5>
            <h5 class="price">$${price}</h5>
            </div>
            </a>`
        }).join('')
        result.innerHTML = products
    } catch (error) {
        result.innerHTML = '<h4>There was an error.</h4>'
    }
    
}


fetchProducts()