const divClock = document.getElementById("containerClock");

const msg = (hour) => {
  const messages = [
    [7, "Es hora de descansar. Apaga y sigue mañana"],
    [12, "Buenos días, desayuna fuerte y a darle al código"],
    [14, "Echa un rato más pero no olvides comer"],
    [16, "HOLA! ...Espero que hayas comido"],
    [18, "Buenas tardes, ¡vamoss! el último empujón"],
    [22, "Esto ya son horas extras, piensa en descansar pronto"],
    [23, "Buenas noches, es hora de pensar en parar y descansar bien"],
  ];

  if (hour < 0 || hour > 23) return;

  for (const range of messages) {
    if (hour <= range[0]) {
      return range[1];
    }
  }
};

const formatDate = (date) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}/${month}/${year}`;
};
const getDate = () => {
  let date = new Date();

  divClock.innerHTML = "";
  let minits = date.getMinutes();
  let hour = date.getHours();

  const divDate = document.createElement("div");
  divDate.textContent = formatDate(date);
  divDate.classList.add("divDate");

  let seconds = date.getSeconds();
  if (minits < 10) {
    minits = formatNumber(minits);
  }
  if (seconds < 10) {
    seconds = formatNumber(seconds);
  }
  if (hour < 10) {
    hour = formatNumber(hour);
  }
  const hh = document.createElement("p");

  hh.textContent = hour + " : " + minits + " : " + seconds;
  const clockPage = document.getElementById("clockPage");
  if (clockPage) {
    const msgDiv = document.getElementById("divMsg");
    msgDiv.innerText = msg(hour);
  }

  divClock.appendChild(hh);
  divClock.appendChild(divDate);
};

const formatNumber = (num) => {
  num = "0" + num;
  return num;
};
getDate(); //para que se muestre al cargar la pagina

setInterval(() => {
  getDate();
}, 1000);
