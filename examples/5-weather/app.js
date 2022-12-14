const form = document.querySelector('.form')
const input = document.querySelector('.form-input')
const alert = document.querySelector('.alert')
const result = document.querySelector('.result')
 alert.style.display = 'none'

 form.addEventListener('submit', (event) =>{
    event.preventDefault()
    const city = input.value 
    if(city){
        getWeatherData(city)
    }
 })

 async function getWeatherData(city) {
    alert.style.display = 'none'
    try {
        const {data} = await axios.post('/api/5-weather', {city})
        const {name} = data
        const {country} = data.sys
        // const {temp_max:max, temp_min:min,feels_like} = data.main
        const {temp_max:max, temp_min:min,feels_like, humidity:hum} = data.main
        const {description} = data.weather[0]
        const {lon, lat} = data.coord
        result.innerHTML = `
        <article class="card">
        <h3>${name}, ${country}</h3>
        <p>Long: ${lon} &nbsp;  | &nbsp; Lat: ${lat}</p>
        <p>${description}</p>
        <p>min temp: ${min}&#8457;</p>
        <p>max temp: ${max}&#8457;</p>
        <p>feels like: ${feels_like}&#8457;</p>
        <p>humidity: ${hum}&#8457;</p>
        </article>
        `
        

    } catch (error) {
        // console.log(error.response)    
        alert.style.display = 'block'    
        alert.textContent = `Cannot find date for city: "${city}"`
 }}