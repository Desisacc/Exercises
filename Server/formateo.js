export function FormatearParaURL(formula)
{
    let formulaFormateada = formula.replace('/', '(div)');
    return formulaFormateada;
}

export function FormatearDeURL(formulaDeURL)
{
    let formulaFormateada = formulaDeURL.replace('(div)', '/');
    return formulaFormateada;
}

export async function Evaluar(formula)
{
    let formulaFormateada = FormatearParaURL(formula);
    let resultado = await fetch('/Evaluate/' + formulaFormateada).then(res => res.json()).then(json => json.resultado);
    return resultado;
}
