const NBAAPITEAMS = "https://www.balldontlie.io/api/v1/teams";

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
        } catch (error) {
            console.error(error);
        }
    }
}

function mostrarDatosGenerales(datos){
    document.getElementById("REC-NombreFull").innerText = datos.full_name;
    document.getElementById("REC-Nombre").innerText = datos.name;
    document.getElementById("REC-Abreviacion").innerText = datos.abbreviation;
    document.getElementById("REC-Ciudad").innerText = datos.city;
    document.getElementById("REC-Conferencia").innerText = datos.conference;
    document.getElementById("REC-Division").innerText = datos.division;
}