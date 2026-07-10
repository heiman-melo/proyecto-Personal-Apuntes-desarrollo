export default function draw(btn,selector){
    const getWinner=(selector) => {
        const $players = document.querySelectorAll(selector),
        random = Math.floor(Math.random() * $players.length), // numero aleatorio del 0-1 * la cantidad de participantes
        winner = $players[random]; // aqui me saca en que posicion esta el ganador

        return `el ganador es ${winner.textContent}`
    }
    document.addEventListener("click", (e) => {
        if (e.target.matches(btn)){
          let result = getWinner(selector)
          alert(result)
        }
    });
    
}

