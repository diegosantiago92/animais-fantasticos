import AnimaNumeros from "./anima-numeros.js";

export default function initFetchAnimais(url = "./animaisapi.json") {
  const container = document.querySelector(".numeros-grid");
  if (!container) return;

  loadAnimais();

  async function loadAnimais() {
    try {
      const data = await fetchData(url);
      renderAnimais(data);

      if (!container.classList.contains("animado")) {
        new AnimaNumeros("[data-numero]", ".numeros", "ativo").init();
        container.classList.add("animado");
      }
    } catch (error) {
      container.innerHTML = "<p>Erro ao carregar dados</p>";
      console.error(error);
    }
  }

  async function fetchData(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao buscar os dados");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Formato de dados inválido");
    }

    return data;
  }

  function renderAnimais(data) {
    container.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (const animal of data) {
      fragment.appendChild(createAnimal(animal));
    }

    container.appendChild(fragment);
  }

  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");

    const h3 = document.createElement("h3");
    h3.textContent = animal.specie || "Desconhecido";

    const span = document.createElement("span");
    span.setAttribute("data-numero", "");
    span.textContent = Number(animal.total) || 0;

    div.appendChild(h3);
    div.appendChild(span);

    return div;
  }
}
