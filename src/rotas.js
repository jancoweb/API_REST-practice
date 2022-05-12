const express = require('express');
const rotas = express();
const instrutores = require('./controladores/instrutores');



rotas.get('/instrutores', instrutores.listarInstrutores);
rotas.get('/instrutores/:id', instrutores.obterInstrutor);
rotas.post('/instrutores', instrutores.registrarInstrutor);
rotas.put('/instrutores/:id', instrutores.atualizarInstrutor);
rotas.patch('/instrutores/:id/status', instrutores.modificarInstrutor)
rotas.delete('/instrutores/:id/delete', instrutores.deletarInstrutor)

module.exports = rotas;