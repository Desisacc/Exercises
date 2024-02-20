import { Evaluar } from '/formateo.js'

let texto = document.getElementById('texto');

let formula1 = '20';
let formula2 = '5*4';

let resultado1 = await Evaluar(formula1);
let resultado2 = await Evaluar(formula2);

texto.textContent = resultado1.toString() +  ' ' + resultado2.toString();
