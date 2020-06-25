// GET CLASS
const pokemonContainer = document.querySelector('.pokemon-container');
const formEl = document.querySelector('form');
const inputEl = document.querySelector('input[type=text]');

// LISTEN EVENTS
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    pokemonContainer.innerHTML = '';
    getPokemon(inputEl.value);
});

// GET ALL
const pokemonList = document.querySelector('.pokemon-list');
const pokemonNumber = 3;

const fechtPokemons = async () => {
    for (let i = 1; i <= pokemonNumber; i++) {
        await getAllPokemons(i);
    }
}

const getAllPokemons = async id => {
    // GET FETCH
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createpokemonInfo(pokemon);
}

const createpokemonInfo = (pokemon) => {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add('pokemon');
    console.log(pokemon.forms)
    const pokeInnerHtml = `
    <div class="poke-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
    </div>`;

    pokemonEl.innerHTML = pokeInnerHtml;
    pokemonList.appendChild(pokemonEl);
}

fechtPokemons();

const getPokemon = async (name = 'salamence') => {
    // GET FETCH
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await res.json();

    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");

    // PRINT IN THE HTML
    pokemonEl.innerHTML = `
    <div class="info">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
    </div>
    <div class="sprites">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png">
    </div>
    <div class="abilities">
    ${pokemon.abilities
      .map((ability) => {
        return `${ability.ability.name}`;
      }).join("- ")}
    <div>`;

    pokemonContainer.appendChild(pokemonEl);
}

getPokemon();