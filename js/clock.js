const divClock = document.getElementById("containerClock");

setInterval(() => {
  getDate();
}, 1000);

const getDate = () => {
  let date = new Date();

  divClock.innerHTML = "";
  let minits = date.getMinutes();
  let hour = date.getHours();
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

  divClock.appendChild(hh);
};

const formatNumber = (num) => {
  num = "0" + num;
  return num;
};
getDate(); //para que se muestre al cargar la pagina
