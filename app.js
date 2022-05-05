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

document.addEventListener('DOMContentLoaded', () => {

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
            printTypes({types})
    
            pokemons = []
            
            pokemons.push(data)
            localStorage.setItem('pokedex', JSON.stringify(pokemons))
            console.log(pokemons)
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
    
    const printTitle = ({name}) => {
        containerTitle.innerHTML = "";
        const title = document.createElement('h3');      
        title.innerHTML = name;
        containerTitle.appendChild(title)
    }
    
    const printCards = ({sprites}) => {         
        div.innerHTML = "";   
        const img = document.createElement('img')
        img.setAttribute('src', sprites.front_default)
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
    
    const printStats = ({stats}) => {   
         containerStats.innerHTML = "";    
        Object.values(stats).forEach(stat => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            li.innerHTML = stat.stat.name;
            span.innerHTML = stat.base_stat;
            li.appendChild(span);
            containerStats.appendChild(li);
        })    
    }

    if(localStorage.getItem('pokedex')){
        pokemons = JSON.parse(localStorage.getItem('pokedex'));       
        
        printTitle(pokemons[0]);        
        printCards(pokemons[0]); 
        printTypes(pokemons[0].types);        
        printStats(pokemons[0])  

    }
})