exports.porteiroDashboard = (req, res) => {
  if (req.user.role !== 'porteiro') return res.status(403).json({ error: 'Forbidden' });
  res.json({ dados: 'Dados para o painel do porteiro' });
};

exports.moradorDashboard = (req, res) => {
  if (req.user.role !== 'morador') return res.status(403).json({ error: 'Forbidden' });
  res.json({ dados: 'Dados para o painel do morador' });
};