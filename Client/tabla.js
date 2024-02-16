export async function ObtenerClases()
{
    let clases = await fetch('/clases.json');
    return clases.json();
}

export async function ObtenerClase(claseId)
{
    let clase = await fetch('/clases.json/' + claseId);
    return clase.json();
}

export async function ObtenerActividadesDeClase(claseId)
{
    let actividades = await fetch('/actividades.json/PorClase/' + claseId);
    return actividades.json();
}

export async function ObtenerActividad(actividadId)
{
    let actividad = await fetch('/actividades.json/' + actividadId);
    return actividad.json();
}

export async function ObtenerBloquesDeActividad(actividadId)
{
    let bloques = await fetch('/bloques.json/PorActividad/' + actividadId);
    return bloques.json();
}

export async function ObtenerBloque(bloqueId)
{
    let bloque = await fetch('/bloques.json/' + bloqueId);
    return bloque.json(); 
}

export async function ObtenerProblemasDeBloque(bloqueId)
{
    let problemas = await fetch('/problemas.json/PorBloque/' + bloqueId);
    return problemas.json();
}
