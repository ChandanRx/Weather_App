import React, {  useState } from 'react'
import './index.css'
import axios from 'axios'

const Home = () => {
    
    const [data, setData] = useState({
        celcius: 10,
        name: 'london',
        humidity: 10,
        speed: 2,
        image : './images/cloudy.png'
    })
    const [name , setName] = useState('')
    const [error , setError] = useState('')

    
     
    const handleClick = () =>{
        if (name !== '' ){

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a09a48dd9afd10b2223bbf827453e11a&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    let imagePath = '';

                    if(res.data.weather[0].main == 'Clouds'){
                        imagePath = './images/cloudy.png'
                    } else 
                    if(res.data.weather[0].main == 'Clear'){
                        imagePath = './images/clear.png'
                    } else 
                    if(res.data.weather[0].main == 'Rain'){
                        imagePath = './images/raining.png'
                    } else 
                    if(res.data.weather[0].main == 'Drizzle'){
                        imagePath = './images/drizzle.png'
                    } else 
                    if(res.data.weather[0].main == 'Mist'){
                        imagePath = './images/mist.png'
                    } else {
                        imagePath = './images/cloudy.png'
                    }


                    setData({
                        ...data,
                        celcius: res.data.main.temp,
                        name: res.data.name,
                        humidity: res.data.main.humidity,
                        speed: res.data.wind.speed ,
                        image : imagePath
                    })
                    setError('');
                })
                .catch(err => {
                    if(err.response.status == 404){
                        setError('Invalid City Name')
                    } else {
                        setError('');
                    }
                })
        }
    }

    return (
        <div className="container">
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder='enter city name' onChange={(e)=> setName(e.target.value)} />
                    <button className='icon' onClick={handleClick} > <img src="./images/search.svg" alt="search" /> </button>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="cloud" className='icon' />
                    <h1>{Math.round(data.celcius)}°c</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src="./images/humidity-1.png" alt="humidity" />
                            <div className='humidity'>
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="./images/wind.png" alt="wind" />
                            <div className='wind'>
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;