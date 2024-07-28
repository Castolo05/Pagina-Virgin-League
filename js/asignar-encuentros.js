document.addEventListener('DOMContentLoaded', () => {
    const numEquipos = document.getElementById('numEquipos');
    const generarLista = document.getElementById('generarLista');
    const listaEquipos = document.getElementById('listaEquipos');
    const sortear = document.getElementById('sortear');
    const torneo = document.getElementById('torneo');

    generarLista.addEventListener('click', () => {
        const num = parseInt(numEquipos.value);
        if (num >= 2) {
            generarInputs(listaEquipos, num);
            sortear.style.display = 'block';
        } else {
            alert('Por favor, ingrese un número mayor o igual a 2.');
        }
    });

    sortear.addEventListener('click', () => {
        const equipos = obtenerValores(listaEquipos);
        if (equipos.length > 0) {
            const emparejamientos = generarEmparejamientos(equipos);
            mostrarTorneo(emparejamientos);
        } else {
            alert('Asegúrese de ingresar al menos un equipo.');
        }
    });

    function generarInputs(lista, num) {
        lista.innerHTML = '';
        for (let i = 0; i < num; i++) {
            const li = document.createElement('li');
            li.innerHTML = `<input type="text" placeholder="Equipo ${i + 1}">`;
            lista.appendChild(li);
        }
    }

    function obtenerValores(lista) {
        return Array.from(lista.querySelectorAll('input')).map(input => input.value).filter(val => val.trim() !== '');
    }

    function generarEmparejamientos(equipos) {
        const equiposAleatorios = [...equipos].sort(() => Math.random() - 0.5);
        const emparejamientos = [];
        const byeTeams = [];

        while (equiposAleatorios.length > 1) {
            emparejamientos.push([equiposAleatorios.pop(), equiposAleatorios.pop()]);
        }

        if (equiposAleatorios.length === 1) {
            byeTeams.push(equiposAleatorios[0]);
        }

        return { emparejamientos, byeTeams };
    }

    function mostrarTorneo({ emparejamientos, byeTeams }) {
        torneo.innerHTML = '<h3>Diagrama del torneo:</h3>';
        emparejamientos.forEach(([equipo1, equipo2], index) => {
            torneo.innerHTML += `<p>Partido ${index + 1}: ${equipo1} vs ${equipo2}</p>`;
        });

        if (byeTeams.length > 0) {
            torneo.innerHTML += '<h4>Equipos que pasan directamente a la siguiente fase:</h4>';
            byeTeams.forEach(equipo => {
                torneo.innerHTML += `<p>${equipo}</p>`;
            });
        }
    }
});