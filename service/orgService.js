const Org = require('../models/Org');

exports.createOrg = async (data) => {
  const { parent } = data;
  const parentOrg = await Org.findById(parent);

  if (parentOrg) {
    if (!data.fuelReimbursementPolicy) {
      data.fuelReimbursementPolicy = parentOrg.fuelReimbursementPolicy;
    }
    if (!data.speedLimitPolicy) {
      data.speedLimitPolicy = parentOrg.speedLimitPolicy;
    }
  }

  const org = new Org(data);
  await org.save();

  if (parentOrg) {
    parentOrg.children.push(org._id);
    await parentOrg.save();
  }

  return org;
};

exports.updateOrg = async (data) => {
  const org = await Org.findById(data._id);
  const { parent } = org;

  if (data.fuelReimbursementPolicy && org.fuelReimbursementPolicy !== parent.fuelReimbursementPolicy) {
    throw new Error("Child org's fuel policy can only be updated via parent org");
  }

  Object.assign(org, data);
  await org.save();

  return org;
};

exports.getAllOrgs = async (page, limit) => {
  const orgs = await Org.find()
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate('parent')
    .populate('children');
  return orgs;
};
