const Registro = require('../models/registroModel');
const User = require('../models/userModel');

exports.getRegistros = async (req, res) => {
  try {
    const registros = await Registro.find().populate('user');
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegistroById = async (req, res) => {
  try {
    const registro = await Registro.findById(req.params.id).populate('user');
    if (!registro) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRegistro = async (req, res) => {
  try {
    const registro = new Registro(req.body);
    await registro.save();
    res.status(201).json(registro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRegistro = async (req, res) => {
  try {
    const registro = await Registro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!registro) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRegistro = async (req, res) => {
  try {
    await Registro.findByIdAndDelete(req.params.id);
    res.json({ message: 'Registro deletado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegistrosByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verifique se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Encontre todas as plantações associadas a esse usuário
    const registros = await Registro.find({ user: userId });

    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
