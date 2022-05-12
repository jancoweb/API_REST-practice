let { instrutores, identificadorInstrutor } = require('../database');

const listarInstrutores = (req, res)=>{
  return res.json(instrutores);
};
const obterInstrutor = (req,res)=>{
  const { id } = req.params;
  const instrutor = instrutores.find((instrutor)=>{
    return instrutor.id === Number(id);
  });

  if(!instrutor){
    return res.status(404).json({mensagem : "Instrutor não encontrado"});
  }
  res.status(200).json(instrutor);
}
const registrarInstrutor = (req, res)=>{
  const { nome, email, status } = req.body;

  if(!nome){
    return res.status(400).json({mensagem: "o nome é obrigatório"})
  }
  if(!email){
    return res.status(400).json({mensagem: "o email é obrigatório"})
  }

  const instrutor = {
    id: identificadorInstrutor++,
    nome,
    email,
    status: status ?? true
  }

  instrutores.push(instrutor)

  return res.status(201).json(instrutor)
}

const atualizarInstrutor = (req, res)=>{
  const { nome, email, status } = req.body;
  const { id } = req.params;

  if(!nome) {
    return res.status(404).json({mensagem: "O nome é obrigatório"});
  }
  if(!email){
    return res.status(404).json({mensagem: "O email é obrigatório"});
  }

  const instrutor = instrutores.find((instrutor)=>{
    return instrutor.id === Number(id);
  })

  if(!instrutor) {
    return res.send(404).json({mensagem: "instrutor não encontrado"});
  }
  instrutor.nome = nome;
  instrutor.email = email;
  instrutor.status = status;

  return res.status(204).send();
}

const modificarInstrutor = (req, res) =>{
  const { id } = req.params;
  const { status } = req.body;
  const instrutor = instrutores.find((instrutor)=>{
    return instrutor.id === Number(id);
  })
  if(!instrutor) {
    return res.status(404).json({mensagem: "insutrtor não encontrado"});
  }
  instrutor.status = status

  return res.status(204).json(instrutor)
}

const deletarInstrutor = (req, res)=>{
  const { id } = req.params;
  const instrutor = instrutores.find((instrutor)=>{
    return instrutor.id === Number(id);
  })

  if(!instrutor){
    return res.status(404).json({mensagem: "Instrutor não encotrado"});
  }

  // filtrar todos os intrutores que NÃO tem o ID do REQ.PARAMS
  instrutores = instrutores.filter((instrutor)=>{
    return instrutor.id !== Number(id);
  });
  return res.status(204).json({ mensagem: "instrutor removido" })
}

module.exports = {
  listarInstrutores,
  obterInstrutor,
  registrarInstrutor,
  atualizarInstrutor,
  modificarInstrutor,
  deletarInstrutor
}