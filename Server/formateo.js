export async function Simplificar(formula)
{
    let formulaFormateada = encodeURIComponent(formula);
    let resultado = await fetch('/Evaluate/' + formulaFormateada).then(res => res.json()).then(json => json.resultado);
    return resultado;
}
