const Card = ({data}) => {
console.log(data);
    return (
        <div className='Card'>
            <div className="header">
                <div className='weathercontent'>
                    <h3>{data.name}</h3>
                    <p>{data.coord.lat}, {data.coord.lon}</p>
                </div>
                <div className='weathericon'>
                    <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={data.weather[0].main}/>
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
        </div>
    )
}

export default Card
