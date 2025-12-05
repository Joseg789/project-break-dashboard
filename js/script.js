//script principal
const body = document.body;
//cambio de background

const changeBackgroundImg = () => {
  const ramdomIndex = Math.floor(Math.random() * 10 + 1); //indice aleatorio
  const imgPath = `../assets/img/${ramdomIndex}.jpg`; //url completa de la imagen
  body.style.backgroundImage = `url("${imgPath}")`; //cambiamos la imagen
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
};
changeBackgroundImg(); //para que se muestre la primera vez

setInterval(() => {
  changeBackgroundImg(); //cambiamos la imagen cada 15 segundos
}, 15000);
