import { ObtenerActividad, ObtenerBloquesDeActividad } from '/tabla.js'

let contenedorBloques = document.getElementById('contenedorBloques');

let currentURL = window.location.href;
let actividadId = currentURL.substring(currentURL.search('Bloques/') + 'Bloques/'.length);

let actividad = await ObtenerActividad(actividadId);
let bloques = await ObtenerBloquesDeActividad(actividadId);

document.title = actividad.Nombre;

for (let i = 0; i < bloques.length; i++)
{
    let nuevoBloque = document.createElement('a');
    nuevoBloque.href = '/Problema/' + bloques[i].id;
    nuevoBloque.textContent = bloques[i].Nombre;

    contenedorBloques.appendChild(nuevoBloque);
    contenedorBloques.appendChild(document.createElement('br'));
}
