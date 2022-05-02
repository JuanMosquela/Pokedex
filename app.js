const container = document.querySelector('.container-photo');
const containerInfo = document.querySelector('.container-info-pokemon')
const input = document.getElementById('input');
const div = document.querySelector('.card');
const containerStats = document.querySelector('.stats')
const containerTypes = document.querySelector('.types')



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
     const typePrimary = document.createElement('div');
     typePrimary.className = 'type-primary';
     typePrimary.innerHTML = data.types;
     const typeSecondary = document.createElement('div');
     typeSecondary.className = 'type-secondary';
     containerTypes.appendChild(typePrimary, typeSecondary);
    
    const title = document.createElement('h3');    
    title.innerHTML = data.name;
    containerInfo.insertBefore(title, containerTypes);
    Object.values(data.stats).forEach(stat => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.innerHTML = stat.stat.name;
        span.innerHTML = stat.base_stat;
        li.appendChild(span);
        containerStats.appendChild(li);
    })

}