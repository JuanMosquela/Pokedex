const container = document.querySelector('.container-photo');
const containerInfo = document.querySelector('.container-info-pokemon')
const input = document.getElementById('input');
const div = document.querySelector('.card');
const containerTitle = document.querySelector('.title');
const containerStats = document.querySelector('.stats');
const containerTypes = document.querySelector('.types');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

document.addEventListener('click', (e) => {

    if(e.target.matches('.circle')){
        e.preventDefault();       
        searchPokemon()
        
    }

})

const searchPokemon = async () => {        
   
    try{    
          
        loading(true);
        
        const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`)        
        const data = await url.json();        
       
        printCards(data);
        printTitle(data);
        printStats(data);
        printTypes(data.types)
    }

    catch{
        console.log('error')
    } 
    
    finally{
        loading(false)
        
    }
}

const loading = (state) => {

    

    const loader = document.querySelector('.loader');
     
    state ? loader.classList.add('d-show') : loader.classList.remove('d-show')    

}



const printTitle = (data) => {
    containerTitle.innerHTML = "";
    const title = document.createElement('h3');      
    title.innerHTML = data.name;
    containerTitle.appendChild(title)
}

const printCards = (data) => { 
    
    div.innerHTML = "";   
    const img = document.createElement('img')
    img.setAttribute('src', data.sprites.front_default)
    div.appendChild(img);
    div.style.backgroundColor = '#FFF';    
    container.appendChild(div)
}

const printTypes = (types) => {
    containerTypes.innerHTML = "";
    types.forEach(types => {
        const div = document.createElement('div');
        div.style.backgroundColor = typeColors[types.type.name];
        div.textContent = types.type.name;
        containerTypes.appendChild(div)       
    })
}

const printStats = (data) => {   
     containerStats.innerHTML = "";    
    Object.values(data.stats).forEach(stat => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.innerHTML = stat.stat.name;
        span.innerHTML = stat.base_stat;
        li.appendChild(span);
        containerStats.appendChild(li);
    })

}