document.addEventListener('DOMContentLoaded', () => {
    const numParticipantes = document.getElementById('numParticipantes');
    const generarListas = document.getElementById('generarListas');
    const listaJugadores = document.getElementById('listaJugadores');
    const listaEquipos = document.getElementById('listaEquipos');
    const sortear = document.getElementById('sortear');
    const resultado = document.getElementById('resultado');
    const toggleReveal = document.getElementById('toggleReveal');

  const combinacionesProhibidas = [
    ["Julian Rivero", "Real Madrid"],
    ["Julian Rivero", "Barcelona"],
    ["Julian Rivero", "Inter"],
    ["Julian Rivero", "Manchester United"],
    ["Fausto Guaita", "Tottenham"],
    ["Fausto Guaita", "Benfica"],
    ["Fausto Guaita", "Valencia"],
    ["Fausto Guaita", "Atletico de Madrid"],
    ["Fausto Guaita", "Lyon"],
    ["Tomas Loto", "Real Madrid"],
    ["Tomas Loto", "Barcelona"],
    ["Tomas Loto", "Inter"],
    ["Tomas Loto", "Manchester United"],
    ["Santiago Marzolino", "Juventus"],
    ["Santiago Marzolino", "Bayern Munich"],
    ["Santiago Marzolino", "Roma"],
    ["Santiago Marzolino", "Villarreal"],
    ["Esteban Raffaeli", "Chelsea"],
    ["Esteban Raffaeli", "Arsenal"],
    ["Esteban Raffaeli", "Liverpool"],
    ["Esteban Raffaeli", "Milan"],
    ["Daniel Gongora", "Real Madrid"],
    ["Daniel Gongora", "Barcelona"],
    ["Daniel Gongora", "Inter"],
    ["Daniel Gongora", "Manchester United"],
    ["Daniel Cordoba", "Chelsea"],
    ["Daniel Cordoba", "Arsenal"],
    ["Daniel Cordoba", "Liverpool"],
    ["Daniel Cordoba", "Milan"],
    ["Tomas Beneitez", "Chelsea"],
    ["Tomas Beneitez", "Arsenal"],
    ["Tomas Beneitez", "Liverpool"],
    ["Tomas Beneitez", "Milan"],
    ["Ulises Banus", "Chelsea"],
    ["Ulises Banus", "Arsenal"],
    ["Ulises Banus", "Liverpool"],
    ["Ulises Banus", "Milan"],
    ["Franco Nelli", "Real Madrid"],
    ["Franco Nelli", "Barcelona"],
    ["Franco Nelli", "Inter"],
    ["Franco Nelli", "Manchester United"],
    ["Julian Gonzalez", "Tottenham"],
    ["Julian Gonzalez", "Benfica"],
    ["Julian Gonzalez", "Valencia"],
    ["Julian Gonzalez", "Atletico de Madrid"],
    ["Julian Gonzalez", "Lyon"],
    ["Facundo Berbel", "Juventus"],
    ["Facundo Berbel", "Bayern Munich"],
    ["Facundo Berbel", "Roma"],
    ["Facundo Berbel", "Villarreal"],
    ["Mateo Alonso", "Juventus"],
    ["Mateo Alonso", "Bayern Munich"],
    ["Mateo Alonso", "Roma"],
    ["Mateo Alonso", "Villarreal"],
    ["Nahuel Lamorte", "Juventus"],
    ["Nahuel Lamorte", "Bayern Munich"],
    ["Nahuel Lamorte", "Roma"],
    ["Nahuel Lamorte", "Villarreal"]

  ];

    const frases = [
        "Uh que ojete! parece que a {jugador} le tocó el {equipo}",
        "Mala suerte che. {jugador} se la va a tener que bancar con el {equipo}",
        "¡Qué casualidad! {jugador} y el {equipo}, una combinación inesperada",
        "Parece que {jugador} tendrá que aprender a amar al {equipo}",
        "¡Vaya sorpresa! {jugador} ahora es parte de la familia del {equipo}",
        "El destino ha hablado: {jugador} defenderá los colores del {equipo}",
        "¿Quién lo diría? {jugador} y el {equipo}, unidos por el azar",
        "La suerte está echada: {jugador} se pone la camiseta del {equipo}",
        "¡Atención! {jugador} acaba de ser 'condenado' al {equipo}",
        "En un giro inesperado, {jugador} ahora es la nueva estrella del {equipo}",
        "¡Increíble! {jugador} tendrá que aprender el himno del {equipo}",
        "¡Qué locura! {jugador} ahora deberá defender a muerte al {equipo}",
        "¡Sorpresa, sorpresa! {jugador} se ha convertido en el nuevo ídolo del {equipo}",
        "¡Atención fanáticos! {jugador} ahora sudará la camiseta del {equipo}",
        "¡Bombazo! {jugador} es la nueva incorporación estrella del {equipo}",
        "¡Impensado! {jugador} tendrá que acostumbrarse a los colores del {equipo}",
        "Parece que al guampudo de {jugador} le tocó el {equipo}",
        "Quien lo diria, {jugador} va a campeonar con el {equipo}"
    ];

    generarListas.addEventListener('click', () => {
        const num = parseInt(numParticipantes.value);
        if (num >= 2 && num <= 32) {
            generarInputs(listaJugadores, num, 'jugador');
            generarInputs(listaEquipos, num, 'equipo');
            sortear.style.display = 'block';
            toggleReveal.parentElement.style.display = 'flex';
        } else {
            alert('Por favor, ingrese un número entre 2 y 32.');
        }
    });

    sortear.addEventListener('click', () => {
        const jugadores = obtenerValores(listaJugadores);
        const equipos = obtenerValores(listaEquipos);
        
        if (jugadores.length === equipos.length) {
            const asignaciones = asignarEquiposAleatorios(jugadores, equipos);
            if (asignaciones) {
                mostrarResultado(asignaciones);
            } else {
                alert('No se pudo realizar el sorteo con las restricciones dadas. Por favor, intente nuevamente.');
            }
        } else {
            alert('Asegúrese de que todas las listas estén completas.');
        }
    });

    function generarInputs(lista, num, tipo) {
        lista.innerHTML = '';
        for (let i = 0; i < num; i++) {
            const li = document.createElement('li');
            li.innerHTML = `<input type="text" placeholder="${tipo} ${i + 1}" data-index="${i}" data-tipo="${tipo}">`;
            lista.appendChild(li);
        }
        agregarNavegacionTeclado(lista);
    }

    function agregarNavegacionTeclado(lista) {
        const inputs = lista.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keydown', (e) => {
                const currentIndex = parseInt(input.dataset.index);
                const currentTipo = input.dataset.tipo;
                if (e.key === 'ArrowDown' && currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    inputs[currentIndex - 1].focus();
                } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    const otherListId = currentTipo === 'jugador' ? 'listaEquipos' : 'listaJugadores';
                    const otherList = document.getElementById(otherListId);
                    const otherInput = otherList.querySelector(`input[data-index="${currentIndex}"]`);
                    if (otherInput) {
                        otherInput.focus();
                    }
                }
            });
        });
    }

    function obtenerValores(lista) {
        return Array.from(lista.querySelectorAll('input')).map(input => input.value).filter(val => val.trim() !== '');
    }

    function asignarEquiposAleatorios(jugadores, equipos) {
        const asignaciones = [];
        const equiposDisponibles = [...equipos];
    
        for (const jugador of jugadores) {
            let equipoAsignado = null;
            for (let i = 0; i < equiposDisponibles.length; i++) {
                const indiceAleatorio = Math.floor(Math.random() * equiposDisponibles.length);
                const equipo = equiposDisponibles[indiceAleatorio];
                if (!combinacionesProhibidas.some(([j, e]) => j === jugador && e === equipo)) {
                    equipoAsignado = equipo;
                    equiposDisponibles.splice(indiceAleatorio, 1);
                    break;
                }
            }
            
            if (equipoAsignado === null) {
                return null; // No se pudo asignar un equipo válido
            }
            
            asignaciones.push({ jugador, equipo: equipoAsignado });
        }
    
        return asignaciones;
    }

    function mostrarResultado(asignaciones) {
        resultado.innerHTML = '<h3>Resultados del sorteo:</h3>';
        let frasesDisponibles = [...frases];
    
        asignaciones.forEach(({jugador, equipo}) => {
            let frase;
            if (frasesDisponibles.length > 0) {
                const indiceAleatorio = Math.floor(Math.random() * frasesDisponibles.length);
                frase = frasesDisponibles[indiceAleatorio];
                frasesDisponibles.splice(indiceAleatorio, 1);
            } else {
                frasesDisponibles = [...frases];
                const indiceAleatorio = Math.floor(Math.random() * frasesDisponibles.length);
                frase = frasesDisponibles[indiceAleatorio];
                frasesDisponibles.splice(indiceAleatorio, 1);
            }
    
            frase = frase.replace('{jugador}', `<span class="jugador">${jugador}</span>`)
                         .replace('{equipo}', `<span class="equipo">${equipo}</span>`);
            
            const div = document.createElement('div');
            div.className = 'resultado-item';
            div.innerHTML = '<p>Haz clic para mostrar</p>';
            div.dataset.frase = frase;
            div.addEventListener('click', () => {
                revelarResultado(div);
            });
            resultado.appendChild(div);
        });
    
        aplicarEstadoToggle();
    }

    function revelarResultado(div) {
        div.innerHTML = div.dataset.frase;
        div.classList.add('revealed');
    }

    function aplicarEstadoToggle() {
        const items = resultado.querySelectorAll('.resultado-item');
        items.forEach(item => {
            if (toggleReveal.checked) {
                revelarResultado(item);
            } else if (item.classList.contains('revealed')) {
                item.innerHTML = '<p>Haz clic para mostrar</p>';
                item.classList.remove('revealed');
            }
        });
    }

    toggleReveal.addEventListener('change', aplicarEstadoToggle);
});
