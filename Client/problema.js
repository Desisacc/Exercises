import { ObtenerBloque, ObtenerProblemasDeBloque } from '/tabla.js'
import { Simplificar, SimplificarMultiples } from '/formateo.js'

let contenedorProblemas = document.getElementById('contenedorProblemas');

let currentURL = window.location.href;
let bloqueId = currentURL.substring(currentURL.search('Problema/') + 'Problema/'.length);

let bloque = await ObtenerBloque(bloqueId);
let problemas = await ObtenerProblemasDeBloque(bloqueId);

for (let i = 0; i < problemas.length; i++)
{
    let problema = problemas[i];

    // Generar valores aleatorios si es pregunta al azar
    if (bloque.TipoDeRespuesta === 'Abierta' && problema.hasOwnProperty('Aleatorio') && problema.Aleatorio === true)
    {
        await GenerarValoresDeProblema(problema);
    }

    // Descripción
    let descripcion = document.createElement('p');
    descripcion.textContent = EscribirDescripcion(problema);
    descripcion.id = 'descripcion ' + problema.id;
    contenedorProblemas.appendChild(descripcion);

    // Opciones e input
    if (bloque.TipoDeRespuesta === 'Abierta')
    {
        let input = document.createElement('input');
        input.placeholder = 'Escriba la respuesta aquí...';
        input.id = 'input ' + problema.id;
        contenedorProblemas.appendChild(input);

        if (problema.hasOwnProperty('Aleatorio') && problema.Aleatorio)
        {
            let botonReset = document.createElement('button');
            botonReset.textContent = 'Intentar otro';
            botonReset.addEventListener('click', async () => {
                await GenerarValoresDeProblema(problema);
                document.getElementById('descripcion ' + problema.id).textContent = EscribirDescripcion(problema);
                
                let explicacion = document.getElementById('explicacion ' + problema.id);
                explicacion.textContent = EscribirExplicacion(problema);
                explicacion.style.display = 'none';

                document.getElementById('outputRespuesta ' + problema.id).textContent = '';

                let input = document.getElementById('input ' + problema.id);
                input.value = '';
                input.readOnly = false;

                let botonEnviar = document.getElementById('botonEnviar ' + problema.id);
                botonEnviar.disabled = false;

                let botonExplicacion = document.getElementById('botonExplicacion ' + problema.id);
                botonExplicacion.disabled = false;
            });

            contenedorProblemas.appendChild(botonReset);
        }
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
    explicacion.textContent = EscribirExplicacion(problema);
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

        if (input.value.length > 0)
        {
            esRespuestaCorrecta = await Simplificar(input.value) === problema.Respuesta;
            if (esRespuestaCorrecta)
            {
                input.readOnly = true;
                input.value = problema.Respuesta;
            }
        }
        else
        {
            esRespuestaCorrecta = false;
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
        if (bloque.TipoDeRespuesta === 'Abierta' && problema.hasOwnProperty('Aleatorio') && problema.Aleatorio && await Simplificar(document.getElementById('input ' + problema.id).value) === 'La fórmula no se pudo evaluar')
        {
            document.getElementById('outputRespuesta ' + problema.id).textContent = 'La fórmula no se pudo evaluar';
        }
        else
        {
            document.getElementById('outputRespuesta ' + problema.id).textContent = 'Incorrecto';
        }
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

function EscribirDescripcion(problema)
{
    let textoDescripcion = bloque.Descripcion;
    if (problema.hasOwnProperty('Valores'))
    {
        for (let j = 0; j < problema.Valores.length; j++)
        {
            textoDescripcion = textoDescripcion.replace('$', problema.Valores[j]);
        }
    }
    return textoDescripcion;
}

function EscribirExplicacion(problema)
{
    let textoExplicacion = bloque.Explicacion;
    if (problema.hasOwnProperty('ValoresExplicacion'))
    {
        for (let j = 0; j < problema.ValoresExplicacion.length; j++)
        {
            textoExplicacion = textoExplicacion.replace('$', problema.ValoresExplicacion[j]);
        }
    }
    return textoExplicacion;
}

async function GenerarValoresDeProblema(problema)
{
    problema.Valores = [];
    problema.Respuesta = problema.FormulaRespuesta;
    problema.ValoresExplicacion = JSON.parse(JSON.stringify(problema.FormulaValoresExplicacion));

    for (let j = 0; j < problema.RangoDeValoresAleatorios.length; j++)
    {
        problema.Valores.push(Math.floor(problema.RangoDeValoresAleatorios[j][0] + Math.random() * problema.RangoDeValoresAleatorios[j][1]).toString());
        problema.Respuesta = problema.Respuesta.replaceAll('[' + j.toString() + ']', problema.Valores[j]);

        for (let k = 0; k < problema.FormulaValoresExplicacion.length; k++)
        {
            problema.ValoresExplicacion[k] = problema.ValoresExplicacion[k].replaceAll('[' + j.toString() + ']', problema.Valores[j]);
        }
    }

    let formulasSimplificadas = await SimplificarMultiples([ problema.Respuesta ].concat(problema.ValoresExplicacion));
    problema.Respuesta = formulasSimplificadas[0];
    problema.ValoresExplicacion = formulasSimplificadas.slice(1);
}
