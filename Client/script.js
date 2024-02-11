let respuestaEjercicioActual
function ObtenerEjercicio()
{
    const ejercicios = new Map([
        ["Uno", {Descripcion:"Resuelve 2*x = 10", Respuesta:"5"}],
        ["Dos", {Descripcion:"Resuelve 3*x = 12", Respuesta:"4"}]
    ]);

    nombreDeEjercicioSeleccionado = Array.from(ejercicios.keys())[Math.floor(Math.random() * ejercicios.size)]
    ejercicioSeleccionado = ejercicios.get(nombreDeEjercicioSeleccionado)

    console.log(nombreDeEjercicioSeleccionado)
    console.log(ejercicioSeleccionado)

    let nombreDeEjercicio = document.getElementById("nombreDeEjercicio")
    let descripcionDeEjercicio = document.getElementById("descripcionDeEjercicio")

    nombreDeEjercicio.textContent = nombreDeEjercicioSeleccionado
    descripcionDeEjercicio.textContent = ejercicioSeleccionado.Descripcion
    respuestaEjercicioActual = ejercicioSeleccionado.Respuesta
}
ObtenerEjercicio()

let botonEnviar = document.getElementById("botonEnviar")
botonEnviar.addEventListener("click", () => EnviarRespuesta())

function EnviarRespuesta()
{
    let input = document.getElementById("input")
    let mensajeDeRespuesta = document.getElementById("mensajeDeRespuesta")

    mensajeDeRespuesta.style.display = "block"

    console.log("input.value: " + input.value)
    if (input.value == respuestaEjercicioActual)
    {
        mensajeDeRespuesta.textContent = "Correcto"
    }
    else
    {
        mensajeDeRespuesta.textContent = "Inorrecto"
    }
}