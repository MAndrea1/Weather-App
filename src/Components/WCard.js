import moment from 'moment'
import {useState, useEffect} from 'react'

const WCard = () => {
    const [lat, setLat] = useState([]);
    const [lon, setLon] = useState([]);
    const [data, setData] = useState([]);
    const [icon, setIcon] = useState()
    const fetchaddress = `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&lang=${navigator.language}&appid=${process.env.REACT_APP_API_KEY}`
  
      useEffect(() => {
      const fetchData = async() => {
        navigator.geolocation.getCurrentPosition(success, error)
          const response = await fetch(fetchaddress)
          const weather = await response.json()
          setData(weather);
      }
  
      function success(pos) {
        var crd = pos.coords;
        setLat(crd.latitude);
        setLon(crd.longitude);
        console.log('More or less ' + crd.accuracy + ' meters.');
      };
      
      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      };
  
      fetchData()
    }, [fetchaddress])

    const CardContent = () => {
        setIcon(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
        return(<>
            <div className="header">
                <div className='weathercontent'>
                    <h3>{data.name}</h3>
                    <p>{moment().format('LL')}, {moment().format('dddd')}</p>
                </div>
                <div className='weathericon'>
                    <img src={icon} alt={data.weather[0].main}/>
                    <p>{data.weather[0].description}</p>
                </div>
            </div>
            <div className='cardbodycontent'>
                <div>
                    <p>Temperature: {((data.main.temp).toFixed(2))} &deg;C</p>
                    <p>humidity: {data.main.humidity}</p>
                </div>
                <div>
                    <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US')}</p>
                    <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US')}</p>
                </div>
            </div>
            </>
        )
    }

    return (
        <div className='Card'>
            {typeof data.main !== 'undefined' ? <CardContent /> : null }
        </div>
    )
}

export default WCard
