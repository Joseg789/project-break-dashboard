const divWeather = document.getElementById("containerWeather");

const getWeatherData = async (city) => {
  const apiKey = "f17260db772c422aada181319251012";

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error in the Request" + response.status);
    }
    const data = await response.json();
    console.log(data);
    showWeather(data);
  } catch (error) {
    console.log(error);
  }
};

//obtenemos la localizacion
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    console.log("Coordenadas:", latitude, longitude);

    // 1. Obtener ciudad a partir de coordenadas (Reverse Geocoding)
    const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    let city;
    try {
      const response = await fetch(geoUrl);
      const data = await response.json();
      console.log(data);
      city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.hamlet;

      if (!city) {
        console.log("No se pudo identificar la ciudad. ");
        return;
      }
      //caso borde por si  alguna ciudad que se  llame igual a alguna española le incluimos el ,es para diferenciarla (por ejemplo mi ciudad Valencia Venezuela xD)
      if (data.display_name.includes("España")) {
        city += ",es";
      }
      console.log("Ciudad detectada:", city);
      //obtenemos los datos del clima
      getWeatherData(city);
    } catch (error) {
      console.error("Error obteniendo la ciudad:", error);
      return;
    }
  });
};

const showWeather = (data) => {
  const temp = Math.floor(data.current.temp_c);

  divWeather.innerHTML = `
    <div class="divWeather ">
    <div>
     <p>${data.location.name + " / " + data.location.country}</p>
      <p>${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}"/>
    </div>
     
      <p class="temp">${temp}</p>
      <img src="./assets/icons/celsius.png" class="imgTemp"/>
      
      <div>
     <p>Precipitaciones: ${data.current.precip_in}%</p>
    <p>Humedad: ${data.current.humidity}</p>
     <p>Viento: ${data.current.wind_kph}</p>
    </div>
    </div>
    
    <div >
        <ul class="divHours">
        ${data.forecast.forecastday[0].hour
          .map((h) => {
            const time = h.time.split(" ")[1]; //divido el time y me quedo con la posicion 1 que es la hora
            return `<li><p>${time}</p>
      <img src="https:${h.condition.icon}"></img>
      <p class="temp">${Math.floor(h.temp_c)}ºC</p>
      
      </li>`;
          })
          .join(" ")}
        </ul>
      </div>

  `;
};

getLocation();
