const User = require('../models/User');

exports.getResidents = async (req, res) => {
  try {
    console.log('[User] Fetching all residents');
    const residents = await User.find({ role: 'morador' }).select('email nome');
    console.log(`[User] Found ${residents.length} residents`);
    res.json(residents);
  } catch (error) {
    console.error('[User] Error fetching residents:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
