const container = document.querySelector('.container-photo');
const containerInfo = document.querySelector('.container-info-pokemon')
const input = document.getElementById('input');
const div = document.querySelector('.card');



document.addEventListener('click', (e) => {

    if(e.target.matches('.btn')){
        e.preventDefault();
        container.innerHTML = "";
        searchPokemon()
    }

})

const searchPokemon = async () => {        
   
    try{
        const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`)
        
        const data = await url.json();
        
        printCards(data);
        printStats(data)

    }
    catch{
        console.log('error')
    }
    finally{
        console.log('esto se ejecutara siempre')
    }
}

const printCards = (data) => { 
    
    div.innerHTML = "";   
    const img = document.createElement('img')
    img.setAttribute('src', data.sprites.front_default)
    div.appendChild(img);
    div.style.backgroundColor = '#FFF';    
    container.appendChild(div)   

}

const printStats = (data) => {
    containerInfo.innerHTML = "";
    const title = document.createElement('h3');    
    title.innerHTML = data.name;
    containerInfo.appendChild(title);

}