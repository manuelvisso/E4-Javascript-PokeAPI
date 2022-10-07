const inputSearch = document.querySelector(".input-search");
const submitSearch = document.querySelector(".submit-search");
const pokeCard = document.querySelector(".poke-card");
const errorSmall = document.querySelector(".small-msg");
const pokeAvatar = document.querySelector(".poke-avatar");
const form = document.querySelector(".form");

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

const errorMsg = () => {
  if (!inputSearch.value || inputSearch.value === 0) {
    errorSmall.innerHTML = `Por favor, ingrese un número para realizar la busqueda`;
    pokeCard.style.visibility = "hidden";
  } else {
    pokeCard.style.visibility = "";
    errorSmall.innerHTML = ``;
  }
};

const notFoundError = () => {
  pokeCard.style.visibility = "hidden";
  errorSmall.innerHTML = `No se ha encontrado un Pokemón con el número indicado.`;
};

const pokeFetch = async () => {
  let pokeId = inputSearch.value;
  try {
    const response = await fetch(`${baseURL}${pokeId}`);
    const data = await response.json();
    return data;
  } catch {
    notFoundError();
  }
};

const renderPokemon = async (e) => {
  e.preventDefault();
  const {
    id,
    name,
    sprites,
    abilities,
    base_experience,
    types,
    height,
    weight,
  } = (pokemon = await pokeFetch());

  pokeCard.innerHTML = `
    <h2>${name.toUpperCase()}</h2>
    <img class="poke-avatar" src="${sprites.other.home.front_default}" alt="" />
    <table>
      <tr>
        <td class="td-left">ID:</td>
        <td class="td-right">#${id}
        </td>
      </tr>
      <tr>
        <td class="td-left">Tipo:</td>
        <td class="td-right">${types
          .map((tipo) => {
            return tipo.type.name;
          })
          .join(", ")}
        </td>
      </tr>
      <tr>
        <td class="td-left">Habilidades:</td>
        <td class="td-right">${abilities
          .map((habilidad) => {
            return habilidad.ability.name;
          })
          .join(", ")}
        </td>
      </tr>
      <tr>
        <td class="td-left">XP:</td>
        <td class="td-right">${base_experience}</td>
      </tr>
      <tr>
        <td class="td-left">Altura:</td>
        <td class="td-right">${height / 10} m.</td>
      </tr>
      <tr>
        <td class="td-left">Peso:</td>
        <td class="td-right">${weight / 10} Kg.</td>
      </tr>
    </table>
    `;
  form.reset;
};

const init = () => {
  submitSearch.addEventListener("click", errorMsg);
  submitSearch.addEventListener("click", renderPokemon);
};

init();
