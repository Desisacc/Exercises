import { ObtenerClases } from '/tabla.js'

let contenedor = document.getElementById('contenedorDeClases');
let clases = await ObtenerClases();

for (let i = 0; i < clases.length; i++)
{
    let anchorClase = document.createElement('a');
    anchorClase.href = '/Actividades/' + clases[i].id;
    anchorClase.textContent = clases[i].Nombre;
    
    contenedor.appendChild(anchorClase);
    contenedor.appendChild(document.createElement('br'));    
}
