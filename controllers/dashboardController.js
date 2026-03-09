exports.porteiroDashboard = (req, res) => {
  if (req.user.role !== 'porteiro') {
    console.warn(`[Dashboard] Access denied for user ${req.user.id} with role '${req.user.role}' to porteiro dashboard`);
    return res.status(403).json({ error: 'Forbidden' });
  }
  console.log(`[Dashboard] Porteiro dashboard accessed by user: ${req.user.id}`);
  res.json({ dados: 'Dados para o painel do porteiro' });
};

exports.moradorDashboard = (req, res) => {
  if (req.user.role !== 'morador') {
    console.warn(`[Dashboard] Access denied for user ${req.user.id} with role '${req.user.role}' to morador dashboard`);
    return res.status(403).json({ error: 'Forbidden' });
  }
  console.log(`[Dashboard] Morador dashboard accessed by user: ${req.user.id}`);
  res.json({ dados: 'Dados para o painel do morador' });
};
