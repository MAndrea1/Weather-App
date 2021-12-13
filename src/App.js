import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { useEffect, useRef, useState } from 'react';
import Card from './Components/Card';
import { Button, Icon } from 'semantic-ui-react'

function App() {
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const listRef = useRef();

  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [city, setCity] = useState('Sidney')
 
  function success(pos) {
    var crd = pos.coords;
    setLat(crd.latitude);
    setLon(crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  };
  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  const fetchData = async(la, lo) => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${la}&lon=${lo}&units=metric&lang=${navigator.language}&appid=${process.env.REACT_APP_API_KEY}`)
    let weather = await response.json()
    setData(weather);
  }

  const fetchData2 = async(city) => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/weather?q=${city}&units=metric&lang=${navigator.language}&appid=${process.env.REACT_APP_API_KEY}`)
    let weather = await response.json()
    if (typeof weather.main !== 'undefined') 
    setData2(weather);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error)
    fetchData(lat, lon)
  }, [lat, lon])

  useEffect(() => {
    const width = listRef.current.offsetWidth ;
    const height = listRef.current.offsetHeight;
    console.log("width", width);
    setWidth(width);
    setHeight(height);
  }, [data]);


  return (
    <div className='App'>
      <div className='Container'>
        {/* <CountryCard /> */}
        <div className='CardContainer'>
          <div className='Shadow' style={{width: `${width}px`, height:`${height}px`}}></div>
          <div className='heightwidtref' ref={listRef}>
            {typeof data.main !== 'undefined' ? <Card data={data}/> : null }
          </div>
        </div>
        <div className="WeatherByCity">
          <h3 style={{margin: 0}}>Weather by city</h3>
          <input type="text" className='TypeCity' placeholder='Type a city' onChange={(e) => {setCity(e.target.value)}}/>
          <Button className='buttonsend' icon onClick={() => {fetchData2(city)}}>
           <Icon name='world' />
          </Button>
        </div>
        <div className='CardContainer'>
          <div className='Shadow' style={{width: `${width}px`, height:`${height}px`}}></div>
            {typeof data2.main !== 'undefined' ? <Card data={data2}/> : null }
        </div>
      </div>
    </div>
  );
}

export default App;
