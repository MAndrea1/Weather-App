import {useState, useEffect, useRef} from 'react'

const CountryCard = () => {
    const listRef = useRef();
    const [data, setData] = useState([]);
    const [icon, setIcon] = useState('01d')
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const fetchaddress = `${process.env.REACT_APP_API_URL}/weather?q=sidney&units=metric&lang=${navigator.language}&appid=${process.env.REACT_APP_API_KEY}`

    const getListSize = () => {
        const newWidth = listRef.current.clientWidth;
        setWidth(newWidth)
        const newHeight = listRef.current.clientHeight;
        setHeight(newHeight)
    };

    useEffect(() => {
    const fetchData = async() => {
        const response = await fetch(fetchaddress)
        const weather = await response.json()
        setData(weather);
    }   
    fetchData()
    }, [fetchaddress])

    useEffect(() => {
        window.addEventListener("resize", getListSize);
      }, []);

    const CardContent = () => {
        setIcon(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
        return (
          <div>
              <div className="WeatherByCity">
                <h3 style={{margin: 0}}>Weather by city</h3>
                <input type="text" className='TypeCity' placeholder='Type a city'/>
              </div>
              <div className='Card' ref={listRef}>
              <div className="header">
                <div className="weathercontent">
                  <h3>{data.name}</h3>
                  <p>
                    {data.coord.lat}, {data.coord.lon}
                  </p>
                </div>
                <div className="weathericon">
                  <img src={icon} alt={data.weather[0].main} />
                  <p>{data.weather[0].description}</p>
                </div>
              </div>
              <div className="cardbodycontent">
                <div>
                  <p>Temperature: {data.main.temp.toFixed(2)} &deg;C</p>
                  <p>humidity: {data.main.humidity}</p>
                </div>
                <div>
                  <p>
                    Sunrise:{" "}
                    {new Date(data.sys.sunrise * 1000).toLocaleTimeString(
                      "en-US"
                    )}
                  </p>
                  <p>
                    Sunset:{" "}
                    {new Date(data.sys.sunset * 1000).toLocaleTimeString(
                      "en-US"
                    )}
                  </p>
                </div>
              </div>
              </div>
          </div>
        );
    }

    return (
        <>
            {typeof data.main !== 'undefined' ? <CardContent /> : null }
        </>
    )
}

export default CountryCard
