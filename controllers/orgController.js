const orgService = require('../services/orgService');

exports.createOrg = async (req, res) => {
  try {
    const newOrg = await orgService.createOrg(req.body);
    res.status(201).json(newOrg);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrg = async (req, res) => {
  try {
    const updatedOrg = await orgService.updateOrg(req.body);
    res.status(200).json(updatedOrg);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllOrgs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const orgs = await orgService.getAllOrgs(page, limit);
    res.status(200).json(orgs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
