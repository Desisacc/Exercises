import { ObtenerClase, ObtenerActividadesDeClase } from "/tabla.js";

let contenedorDeBloques = document.getElementById('actividades');

let currentURL = window.location.href;
let claseId =  currentURL.substring(currentURL.search('Actividades/') + 'Actividades/'.length);

let clase = await ObtenerClase(claseId);
let actividades = await ObtenerActividadesDeClase(claseId); 

document.title = clase.Nombre;

for (let i = 0; i < actividades.length; i++)
{
    let nuevaActividad = document.createElement('a');
    nuevaActividad.textContent = actividades[i].Nombre;
    nuevaActividad.href = '/Bloques/' + actividades[i].id;
    
    contenedorDeBloques.appendChild(nuevaActividad);
    contenedorDeBloques.appendChild(document.createElement('br'));
}
