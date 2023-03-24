const pokeContainer = document.querySelector(".poke-container");
const searchBox = document.querySelector(".search-box");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const pokemonCoutn = 151;


searchButton.addEventListener("click", () => {
  searchBox.classList.toggle("active");
});

searchInput.addEventListener('input', (e) => {
  //console.log(searchInput.value)
  const searchValue = searchInput.value.toLowerCase()
  const pokemonNames = document.querySelectorAll('.poke-name')
  //console.log(pokeName)

  pokemonNames.forEach((pokemonName) => {

    if (pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = 'block'
    }else{
    pokemonName.parentElement.parentElement.style.display = 'none'
      
    }
  })
})

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCoutn; i++) {
    await getPokemon(i);
  }
};
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const respo = await fetch(url);
  const data = await respo.json();
  //console.log(data);
  creatPokemonCard(data);
};

const creatPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");



  const pokemonId = pokemon.id.toString().padStart(3, "0");

  pokemonDiv.innerHTML = `
  <div class="img-container ">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
  </div>
  <div class="poki-info">
      <span class="poke-id">#${pokemonId}</span>
      <h3 class="poke-name">${pokemon.name}</h3>
      <div class="small">
          <small class="poke-exp"><i class="fa-solid fa-flask"></i><span>${pokemon.base_experience} exp</span></small>
          <small class="poke-weight"><i class="fa-solid fa-weight-scale"></i><span>${pokemon.weight} kg</span></small>
      </div>
      <div class="poke-type">
          <small><i class="fa-brands fa-uncharted"></i><span>${pokemon.types[0].type.name}</span></small>
      </div>
  </div>
  
  `;
  pokeContainer.appendChild(pokemonDiv);
};

fetchPokemons();
