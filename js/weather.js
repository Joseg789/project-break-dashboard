const divWeather = document.getElementById("containerWeather");

const getWeatherData = async (city, error) => {
  const apiKey = "f17260db772c422aada181319251012";

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error in the Request" + response.status);
    }
    const data = await response.json();
    showWeather(data, error);
  } catch (error) {
    console.log(error);
  }
};

//obtenemos la localizacion
const getLocation = () => {
  let city;
  let defaultLocation = "Madrid,es"; //si hay error de ubicacion mostramos una ciudad por defecto
  city = defaultLocation;
  let error = true;

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    console.log("Coordenadas:", latitude, longitude);

    // 1. Obtener ciudad a partir de coordenadas (Reverse Geocoding)
    const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(geoUrl);
      const data = await response.json();
      city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.hamlet;

      if (city.length === 0) {
        console("ENTRE");
        city = defaultLocation;
        console.log("No se pudo identificar la ciudad. ");
        error = true;
      }
      error = false;
      //caso borde por si  alguna ciudad que se  llame igual a alguna española le incluimos el ,es para diferenciarla (por ejemplo mi ciudad Valencia Venezuela xD)
      if (data.display_name.includes("España")) {
        city += ",es";
      }
      console.log("Ciudad detectada:", city);
      //obtenemos los datos del clima
      getWeatherData(city, error);
    } catch (error) {
      console.error("Error obteniendo la ciudad:", error);
      return;
    }
  });
  getWeatherData(city, error);
};

const showWeather = (data, error) => {
  const temp = Math.floor(data.current.temp_c);

  divWeather.innerHTML = `
    <div class="divWeather">
    <div>
     <p>${data.location.name + " / " + data.location.country}</p>
     <p class="condition">${data.current.condition.text}</p>
     <img src="${data.current.condition.icon}"/>
     ${
       error
         ? `<p class="error"> ⚠️ Debes permitir el acceso a la ubicacion</p>`
         : ""
     }
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
