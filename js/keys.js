const formKeys = document.getElementById("formKeys");
const divPassword = document.createElement("div");

const containerFormKeys = document.getElementById("containerFormKey");

const getFormDataKeys = (e) => {
  e.preventDefault();
  const data = new FormData(formKeys);
  // convertimos todo el formulario en un objeto
  const valores = Object.fromEntries(data.entries());
  return valores;
};

const may = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const min = "abcdefghijklmnopqrstuvwxyzñ";
const numbers = "0123456789";
const simbols = "!@#$%^&*()-_=+.";
const allChars = may + numbers + min + simbols; //hacemos una sola cadena para generar la contraseña
const max = allChars.length;

const getRandomPos = () => {
  return Math.floor(Math.random() * max);
};

const genPasswordKey = (length) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += allChars[getRandomPos()];
  }
  return password;
};

formKeys.addEventListener("submit", (e) => {
  divPassword.innerHTML = "";
  const data = getFormDataKeys(e);
  const password = genPasswordKey(data.length);
  divPassword.textContent = "Contraseña Generada:";
  const pass = document.createElement("p");
  pass.textContent = password;
  divPassword.appendChild(pass);
  containerFormKeys.appendChild(divPassword);
});
