const User = require('../models/User');

exports.getResidents = async (req, res) => {
  try {
    const residents = await User.find({ role: 'morador' }).select('email nome');
    res.json(residents);
  } catch (error) {
    console.error("Erro ao buscar moradores:", error);
    res.status(500).json({ error: 'Server error' });
  }
};
