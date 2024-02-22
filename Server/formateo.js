export async function Simplificar(formula)
{
    let formulaFormateada = encodeURIComponent(formula);
    let resultado = await fetch('/Evaluate/' + formulaFormateada).then(res => res.json()).then(json => json.resultado);
    return resultado;
}

export async function SimplificarMultiples(formulas)
{
    let formulasFormateadas = '';
    for (let i = 0; i < formulas.length; i++)
    {
        formulasFormateadas += encodeURIComponent(formulas[i]) + (i < formulas.length - 1 ? '|' : '');
    }
    let resultados = await fetch('/EvaluateMany/' + formulasFormateadas).then(res => res.json()).then(json => json.resultado);
    return resultados;
}
