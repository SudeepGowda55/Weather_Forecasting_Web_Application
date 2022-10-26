import React, {useState} from 'react'
import axios from 'axios'
import bgImg from './climate.jpg';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${process.env.REACT_APP_WEATHER_APPID}`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation("")
    }
  }

  return (
    <div className='w-full min-w-[100%]'>
      <div className='w-full min-w-[100%]'>
        <img src={bgImg} alt="" className='w-full h-screen z-[-2] min-w-[350px]' />
        <input 
         type="text" className='absolute text-black text-2xl px-9 sm:px-12 rounded-3xl border border-indigo-600 active:border-none active:outline-none w-[270px] md:w-[280px] lg:w-[350px] h-12 top-52 sm:top-16 lg:top-[140px] left-[20vw] sm:left-[34.4vw] md:left-[36vw]'
         value={location} placeholder='Enter Location'
         onChange={event => {setLocation(event.target.value)}} 
         onKeyPress={searchLocation} />

        <div className='absolute top-20 md:top-32 left-4 text-green-600'>
           <div className='text-3xl'>
               { data.name ? <p>{data.name}</p> : 'Location'}
           </div>
           <div className='text-[60px] mt-[-6px] font-bold'>
                {data.main ? <h1>{data.main.temp}°F</h1> : '72°F'}
           </div>
        </div>
      <p className=' absolute right-[4%] text-white text-3xl  top-[40px] sm:top-[140px] md:top-[165px] lg:top-[190px]'>{data.weather ? <span>{data.weather[0].description}</span> : 'Clear'}</p>
        
        <div className=' absolute bg-zinc-500 min-w-[350px] w-full sm:w-[500px] rounded-xl left-[0vw]  sm:left-[20vw] md:left-[26vw] lg:left-[32vw] text-white top-[39vh] sm:top-[200px] md:top-[250px] flex'>
          <div className="p-7 sm:p-10">
          {data.main ? <span>{data.main.feels_like}°F</span> : '72.5°F'}         
            <p className='font-semibold'>Feels Like</p>
          </div>
          <div className="p-7 sm:p-10 ">
          {data.main ? <span>{data.main.humidity}%</span> : '80%'}            
            <p className='font-semibold'>Humidity</p>
          </div>
          <div className="p-7 sm:p-10">
          {data.main ? <span>{data.wind.speed} MPH </span> : '5 MPH'}           
            <p className='font-semibold'>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
