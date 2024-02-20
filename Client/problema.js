import { ObtenerBloque, ObtenerProblemasDeBloque } from '/tabla.js'
import { Evaluar } from '/formateo.js'

let contenedorProblemas = document.getElementById('contenedorProblemas');

let currentURL = window.location.href;
let bloqueId = currentURL.substring(currentURL.search('Problema/') + 'Problema/'.length);

let bloque = await ObtenerBloque(bloqueId);
let problemas = await ObtenerProblemasDeBloque(bloqueId);

for (let i = 0; i < problemas.length; i++)
{
    let problema = problemas[i];

    // Descripción
    let descripcion = document.createElement('p');
    let textoDescripcion = bloque.Descripcion;
    for (let j = 0; j < problema.Valores.length; j++)
    {
        textoDescripcion = textoDescripcion.replace('$', problema.Valores[j]);
    }
    descripcion.textContent = textoDescripcion;
    contenedorProblemas.appendChild(descripcion);

    // Opciones e input
    if (bloque.TipoDeRespuesta === 'Abierta')
    {
        let input = document.createElement('input');
        input.placeholder = 'Escriba la respuesta aquí...';
        input.id = 'input ' + problema.id;

        contenedorProblemas.appendChild(input);
    }
    else
    {
        for (let j = 0; j < problema.Opciones.length; j++)
        {
            let radioBoton = document.createElement('input');
            radioBoton.type = 'radio';
            radioBoton.name = problema.id;
            radioBoton.id = 'radioBoton ' + j + ' ' + problema.id;

            let textoDeBoton = document.createElement('span');
            textoDeBoton.textContent = problema.Opciones[j];

            contenedorProblemas.appendChild(radioBoton);
            contenedorProblemas.appendChild(textoDeBoton);
            contenedorProblemas.appendChild(document.createElement('br'));
        }
    }

    // Output de respuesta
    let outputRespuesta = document.createElement('p');
    outputRespuesta.id = 'outputRespuesta ' + problema.id;
    contenedorProblemas.appendChild(outputRespuesta);

    // Botón de enviar
    let botonEnviar = document.createElement('button');
    botonEnviar.addEventListener('click', () => ComprobarRespuesta(problema));
    botonEnviar.textContent = 'Enviar';
    botonEnviar.id = 'botonEnviar ' + problema.id;
    contenedorProblemas.appendChild(botonEnviar);
    
    // Botón de explicación
    let botonExplicacion = document.createElement('button');
    botonExplicacion.addEventListener('click', () => MostrarRespuesta(problema));
    botonExplicacion.textContent = 'Respuesta';
    botonExplicacion.id = 'botonExplicacion ' + problema.id;
    contenedorProblemas.appendChild(botonExplicacion);

    // Explicación
    let explicacion = document.createElement('p');
    let textoExplicacion = bloque.Explicacion;
    for (let j = 0; j < problema.ValoresExplicacion.length; j++)
    {
        textoExplicacion = textoExplicacion.replace('$', problema.ValoresExplicacion[j]);
    }
    explicacion.textContent = textoExplicacion;
    explicacion.style.display = 'none';
    explicacion.id = 'explicacion ' + problema.id;
    contenedorProblemas.appendChild(explicacion);
}

async function ComprobarRespuesta(problema)
{
    let esRespuestaCorrecta;
    if (bloque.TipoDeRespuesta === 'Abierta')
    {
        let input = document.getElementById('input ' + problema.id);

        esRespuestaCorrecta = await Evaluar(input.value) === await Evaluar(problema.Respuesta)
        //esRespuestaCorrecta = input.value === problema.Respuesta;
        if (esRespuestaCorrecta)
        {
            input.readOnly = true;
        }        
    }
    else
    {
        esRespuestaCorrecta = false;
        for (let j = 0; j < problema.Opciones.length; j++)
        {
            let radioBoton = document.getElementById('radioBoton ' + j + ' ' + problema.id);

            if (radioBoton.checked && (j + 1).toString() === problema.Respuesta)
            {
                esRespuestaCorrecta = true;
                break;          
            }
        }
        
        if (esRespuestaCorrecta)
        {
            for (let j = 0; j < problema.Opciones.length; j++)
            {
                let radioBoton = document.getElementById('radioBoton ' + j + ' ' + problema.id);
                radioBoton.disabled = true; 
            }
        }
    }

    if (esRespuestaCorrecta)
    {
        document.getElementById('outputRespuesta ' + problema.id).textContent = 'Correcto';

        document.getElementById('botonExplicacion ' + problema.id).disabled = true;
        document.getElementById('botonEnviar ' + problema.id).disabled = true;
    }
    else
    {
        document.getElementById('outputRespuesta ' + problema.id).textContent = 'Incorrecto';
    }
}

function MostrarRespuesta(problema)
{
    if (bloque.TipoDeRespuesta === 'Abierta')
    {
        let input = document.getElementById('input ' + problema.id);
        input.value = problema.Respuesta;
        input.readOnly = true;
    }
    else
    {
        for (let j = 0; j < problema.Opciones.length; j++)
        {
            let radioBoton = document.getElementById('radioBoton ' + j + ' ' + problema.id);
            radioBoton.checked = (j + 1).toString() === problema.Respuesta;
            radioBoton.disabled = true; 
        }
    }

    document.getElementById('explicacion ' + problema.id).style.display = 'block';

    document.getElementById('botonExplicacion ' + problema.id).disabled = true;
    document.getElementById('botonEnviar ' + problema.id).disabled = true;
    document.getElementById('outputRespuesta ' + problema.id).textContent = '';
}
