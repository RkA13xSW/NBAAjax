const NBAAPITEAMS = "https://www.balldontlie.io/api/v1/teams";
const NBAAPIPLAYERS = "https://www.balldontlie.io/api/v1/players";


async function mostrarOpciones(){
    try {
        const response = await fetch(`${NBAAPITEAMS}`)
        const data = await response.json();
        for (let i = 0; i < data.data.length; i++) {
            const OPCION = document.createElement("option");
            OPCION.innerText = data.data[i].full_name;
            OPCION.value = data.data[i].id;
            document.getElementById("equipos").appendChild(OPCION);
        }

    } catch (error) {
        console.error(error);
    }

}

async function mostrarDatosEquipo(){
    const EQUIPO = document.getElementById("equipos").value;
    if(EQUIPO != "None"){
        try {
            const response = await fetch(`${NBAAPITEAMS}/${EQUIPO}`)
            const data = await response.json();
            console.log(`El equipo con nombre ${data.full_name} tiene como abreviación "${data.abbreviation}"`);
            document.querySelector(".datos-recuperados").classList.remove("noVer");
            mostrarDatosGenerales(data);

            try {
                const response = await fetch(`${NBAAPIPLAYERS}`)
                const jugadores = await response.json();
                let contador = 0;
                    for (let i = 0; i < jugadores.data.length; i++) {
                        if(jugadores.data[i].team.id == data.id){
                            agregarJugadores(jugadores.data[i]);
                            contador++;
                        }   
                    }
                    if(contador > 1){
                        document.querySelector(".jugadores-datos").classList.remove("noVer");
                    }else{
                        document.querySelector(".jugadores-datos").classList.add("noVer");
                    }

        
            } catch (error) {
                console.error(error);
            }

        } catch (error) {
            console.error(error);
        }
    }
}

function mostrarDatosGenerales(datos){
    document.getElementById("datos-NombreEquipo").innerText = datos.name;
    document.getElementById("REC-NombreFull").innerText = datos.full_name;
    document.getElementById("REC-Nombre").innerText = datos.name;
    document.getElementById("REC-Abreviacion").innerText = datos.abbreviation;
    document.getElementById("REC-Ciudad").innerText = datos.city;
    document.getElementById("REC-Conferencia").innerText = datos.conference;
    document.getElementById("REC-Division").innerText = datos.division;
}

function agregarJugadores(jugador){
    const TR = document.createElement("tr");
    const NOMBRE = document.createElement("td");
    const APELLIDO = document.createElement("td");
    const POSICIOM = document.createElement("td");
    NOMBRE.innerText = jugador.first_name;
    APELLIDO.innerText = jugador.last_name;
    POSICIOM.innerText = jugador.position;
    TR.appendChild(NOMBRE);
    TR.appendChild(APELLIDO);
    TR.appendChild(POSICIOM);
    document.getElementById("tabla-jugadores").appendChild(TR);
}