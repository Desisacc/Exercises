import express from 'express'
import { simplify } from 'mathjs'

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url);
const clases = require('./jsons/clases.json');
const actividades = require('./jsons/actividades.json');
const bloques = require('./jsons/bloques.json');
const problemas = require('./jsons/problemas.json');

const PORT = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
    console.log('method: '+ req.method + '\nurl: ' + req.url + '\n')
    next();
})

// Test //

app.get('/test.js', (req, res) => {
    res.sendFile(process.cwd() + '/Client/test/test.js');
})

// Test //

// Formateo //

app.get('/formateo.js', (req, res) => {
    res.sendFile(process.cwd() + '/Server/formateo.js')
})

app.get('/Evaluate/:formula', (req, res) => {
    const { formula } = req.params;

    let resultado;
    try {
        resultado = simplify(formula);
    } catch(error) {
        resultado = 'La fórmula no se pudo evaluar';
        console.log(resultado);
    }

    res.send({ "resultado": resultado.toString() });
})

app.get('/EvaluateMany/:formulas', (req, res) => {
    const { formulas } = req.params;

    let individualFormulas = formulas.split('|');
    for (let i = 0; i < individualFormulas.length; i++)
    {
        try {
            individualFormulas[i] = simplify(individualFormulas[i]).toString();
        } catch(error) {
            throw new Error('Element with index: ' + i.toString() + ', with value: ' + individualFormulas[i] + ' could not be simplified');
        }
    }

    res.send({ "resultado": individualFormulas });
})

// Formateo //

app.get('/tabla.js', (req, res) => {
    res.sendFile(process.cwd() + '/Client/tabla.js');
})

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + '/Client/clases.html');
})

app.get('/clases.js', (req, res) => {
    res.sendFile(process.cwd() + '/Client/clases.js')
})

app.get('/clases.json', (req, res) => {
    res.json(clases);
})

app.get('/Actividades/:id', (req, res) => {
    res.sendFile(process.cwd() + '/Client/actividades.html');
})

app.get('/actividades.js', (req, res) => {
    res.sendFile(process.cwd() + '/Client/actividades.js');
})

app.get('/clases.json/:id', (req, res) => {
    const { id } = req.params;
    let clase = clases.find(clase => clase.id === id);
    res.json(clase);
})

app.get('/actividades.json/PorClase/:id', (req, res) => {
    const { id } = req.params;
    let actividadesFiltradas = actividades.filter(actividad => actividad.Clase === id);
    res.json(actividadesFiltradas);
})

app.get('/Bloques/:id', (req, res) => {
    res.sendFile(process.cwd() + '/Client/bloques.html');
})

app.get('/bloques.js', (req, res) => {
    res.sendFile(process.cwd() + '/Client/bloques.js');
})

app.get('/actividades.json/:id', (req, res) => {
    const { id } = req.params;
    let actividad = actividades.find(actividad => actividad.id === id);
    res.json(actividad);
})

app.get('/bloques.json/PorActividad/:id', (req, res) => {
    const { id } = req.params;
    let bloquesFiltrados = bloques.filter(bloque => bloque.Actividad === id);
    res.json(bloquesFiltrados);
})

app.get('/Problema/:id', (req, res) => {
    res.sendFile(process.cwd() + '/Client/problema.html');
})

app.get('/problema.js', (req, res) => {
    res.sendFile(process.cwd() + '/Client/problema.js');
})

app.get('/bloques.json/:id', (req, res) => {
    const { id } = req.params;
    let bloque = bloques.find(bloque => bloque.id === id);
    res.json(bloque);
})

app.get('/problemas.json/PorBloque/:id', (req, res) => {
    const { id } = req.params;
    let problemasFiltrados = problemas.filter(problema => problema.Bloque === id);
    res.json(problemasFiltrados);
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
})
