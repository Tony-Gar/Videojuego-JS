const CARDS = 10;
//Peticion de pokemones al API

for(let i=1; i<=CARDS; i++){
    let id=getRandomId(150)
    searchPokemonById(id)
}
function getRandomId(max){
    return Math.floor(Math.random()*max)+1
}
let draggableElements=document.querySelector('.draggable-elements')
let droppableElements=document.querySelector('.droppable-elements')
let pokemonSearched=[];
let pokemonNames=[];


async function searchPokemonById(id){
    const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data= await res.json()
    pokemonSearched.push(data)
    pokemonNames.push(data.name)
   

    pokemonNames=pokemonNames.sort(()=>Math.random()-0.5)
   

    draggableElements.innerHTML=''
    pokemonSearched.forEach(pokemon=>{
        
        draggableElements.innerHTML+=` <div class="pokemon">
                <img draggable="true" class="image" id="${pokemon.name}" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="tipo de grupo">
            </div>`
    })
    droppableElements.innerHTML=''
    pokemonNames.forEach(name=>{
        droppableElements.innerHTML+=`
        <div class="names">
                <p>${name}</p>
            </div>
        `

    })
    let pokemones=document.querySelectorAll('.image')
    pokemones=[...pokemones]
    pokemones.forEach(pokemon=>{
        pokemon.addEventListener('dragstart',event=>{
            event.dataTransfer.setData('text', event.target.id)
            

        })
    })
    let names = document.querySelectorAll('.names')
    let wrongsMsg=document.querySelector('.wrong')
    let point=0;
    names=[...names]
    
    names.forEach(name=>{
        name.addEventListener('dragover',event=>{
            event.preventDefault()
        })

        name.addEventListener('drop',event=>{
            const draggableElementData=event.dataTransfer.getData('text');
            let pokemonElement=document.querySelector(`#${draggableElementData}`)
            console.log(pokemonElement)
            if(event.target.innerText ==draggableElementData){
                console.log('SI')
                point++
                event.target.innerHTML=''
                event.target.appendChild(pokemonElement)

                wrongsMsg.innerText='Muy Bien !'
                if(point==CARDS){
                    draggableElements.innerHTML=`<p class="win">Ganaste!</p>`
                }

            }else{
                console.log('NO')
                wrongsMsg.innerText='Ups!'
            }
        })
    })
    

}


