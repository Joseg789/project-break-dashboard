//script para generar los links
const form = document.getElementById("formLinks");
const sectionLinks = document.getElementById("sectionLinks");
const listLinks = document.getElementById("listLinks");

const getLinks = () => {
  try {
    const data = localStorage.getItem("dashboardsLinks");
    if (!data) return [];
    const values = JSON.parse(data);
    return Array.isArray(values) ? values : []; //si no es un arreglo
  } catch (error) {
    console.error("Error leyendo localStorage:", error);
  }
  return [];
};
let links = getLinks();

const setLinks = (links) => {
  try {
    localStorage.setItem("dashboardsLinks", JSON.stringify(links));
  } catch (error) {
    console.error("Error guardando en localStorage:", error);
  }
};

const getFormData = (e) => {
  e.preventDefault();
  const data = new FormData(form);
  // convertimos todo el formulario en un objeto
  const valores = Object.fromEntries(data.entries());
  return valores;
};

const isValidData = (data) => {
  if (data.nameLink.trim().length >= 1 && data.url.trim().length >= 1) {
    return true;
  }
  return false;
};
form.addEventListener("submit", (e) => {
  const data = getFormData(e);
  if (isValidData(data)) {
    updateLinks(data, links, "ADD");
  } else {
    alert(" ✖️El Nombre y el Url No pueden estar vacios ⚠️");
  }
});

const updateLinks = (link, currentLinks, op) => {
  const existLink = currentLinks.some((l) => l.nameLink === link.nameLink);

  let updatedLinks = currentLinks;
  if (op === "ADD") {
    if (existLink) {
      alert("⚠️ Ya existe un link con ese nombre");
      return;
    }

    updatedLinks = [...currentLinks, link]; //usamos el spread apara añadir el link
  } else {
    //eliminar
    if (op === "DEL") {
      updatedLinks = currentLinks.filter((l) => l.nameLink !== link.nameLink);
    }
  }
  console.log("links", updatedLinks);
  links = updatedLinks; //
  setLinks(updatedLinks);
  console.log("LOCAL", JSON.parse(localStorage.getItem("dashboardsLinks")));
  showLinks(updatedLinks);
};

const showLinks = (links) => {
  listLinks.innerHTML = "";
  links.forEach((link) => {
    const li = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.classList.add("link");
    anchor.classList.add("blur-backdrop");
    anchor.textContent = link.nameLink;

    const btnRemove = document.createElement("button");
    btnRemove.textContent = "X";
    btnRemove.classList.add("btnRemove");
    btnRemove.addEventListener("click", () => {
      updateLinks(link, links, "DEL");
    });
    li.appendChild(anchor);
    li.appendChild(btnRemove);
    listLinks.appendChild(li);
  });
};

showLinks(links); //MOSTRAMOS LOS LINKS  EN LA PAGINA
