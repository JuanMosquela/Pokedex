const container = document.querySelector('.container-photo');
const containerInfo = document.querySelector('.container-info-pokemon')
const input = document.getElementById('input');
const div = document.querySelector('.card');
const containerTitle = document.querySelector('.title');
const containerStats = document.querySelector('.stats');
const containerTypes = document.querySelector('.types');

document.addEventListener('click', (e) => {

    if(e.target.matches('.circle')){
        e.preventDefault();       
        searchPokemon()
        
    }

})

const searchPokemon = async () => {        
   
    try{
        const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`)        
        const data = await url.json();
       
        printCards(data);
        printTitle(data)
        printStats(data);
        printTypes(data.types[0], data.types[1] )

    }
    catch{
        console.log('error')
    }
    finally{
        console.log('esto se ejecutara siempre')
    }
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

const printTypes = (data1, data2) => {
    containerTypes.innerHTML = "";
    const typePrimary = document.createElement('div');
     typePrimary.className = 'type-primary';
     typePrimary.innerHTML = data1.type.name;
     const typeSecondary = document.createElement('div');
     typeSecondary.className = 'type-secondary';
     typeSecondary.innerHTML = data2.type.name;     
     containerTypes.appendChild(typePrimary);
     containerTypes.appendChild(typeSecondary);
    
     
     

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