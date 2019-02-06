import React from 'react';
import './weather-app.css';

class MainComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: null,
      temp: 'Loading....',
      isCelsius: true
    }
  }

  getLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;

        this.getWeather(url);
      });
    } else {
      console.log('No geolocation supported');
    }
  }

  getWeather = urlToCall => {
    fetch(urlToCall)
      .then(response => response.json())
      .then(dataSet => {
      let temp = String(dataSet.main.temp);
      this.setState({temp, weather: dataSet});
      console.log(dataSet);
    }).catch(err => {
      console.log(err);
    });
  }

  componentWillMount() {
    this.getLocation();
  }

  weatherDisplay() {
    if(this.state.weather !== null) {
      // console.log('weather in state: ', this.state.weather === null);
      return (
        <div className="display-container">
          <div>{this.state.weather.name}, {this.state.weather.sys.country}</div>
          <img alt={this.state.weather.weather[0].description} src={this.state.weather.weather[0].icon} />
          <div>
            <span>{this.state.temp}</span>
            <span className="toggle-temp" onClick={() => this.handleClick()}>{this.state.isCelsius ? '\xB0C' : '\xB0F'}</span>
          </div>
          <div>{this.state.weather.weather[0].description}</div>
          <div>Sunrise: {String(new Date(this.state.weather.sys.sunrise))}</div>
          <div>Sunset: {String(new Date(this.state.weather.sys.sunset))}</div>
          <div>Dt: {String(new Date(this.state.weather.dt))}</div>
        </div>
      );
    } else {
      return (
        <div className="display-container">
          <span>Loading......</span>
        </div>
      );
    }
  }

  handleClick = () => {
    let newTemp = this.state.isCelsius ? String(Math.round((Number(this.state.temp) * 9 / 5 + 32)*100)/100) :
                                         String(this.state.weather.main.temp) ;
    console.log(typeof newTemp + ' ' + newTemp);
    this.setState({
      isCelsius: !this.state.isCelsius,
      temp: newTemp
    });
  }

  render() {
    return(
      <div className='container'>
        <header>WEATHER APP</header>
        {this.weatherDisplay()}
      </div>
    );
  }
}

export default MainComponent;

// ReactDOM.render(<MainComponent />, document.getElementById('root'));
