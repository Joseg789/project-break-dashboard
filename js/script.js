//script principal
const body = document.body;
//cambio de background

const images = [
  "1.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
];
const preloadImages = () => {
  images.forEach((src) => {
    const img = new Image();
    img.src = `./assets/img/${src}`;
  });
};

const changeBackgroundImg = () => {
  const ramdomIndex = Math.floor(Math.random() * images.length); //indice aleatorio
  const imgPath = `./assets/img/${images[ramdomIndex]}`; //url completa de la imagen
  body.style.backgroundImage = `url("${imgPath}")`; //cambiamos la imagen
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
};
preloadImages(); // precargar al iniciar
changeBackgroundImg(); //para que se muestre la primera vez

setInterval(() => {
  changeBackgroundImg(); //cambiamos la imagen cada 15 segundos
}, 15000);
