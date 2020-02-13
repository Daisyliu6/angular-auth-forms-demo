// 28 added
const db = require('_helpers/db');
const Role = db.Role;

module.exports = {
    getAllRole,
    addRole,
    deleteRole
};

async function getAllRole() {
    return await Role.find();
}

async function addRole(roleParam) {
  // validate
  if (await Role.findOne({ role: roleParam.role })) {
      throw 'Role "' + roleParam.role + '" is already here';
  }
  const role = new Role(roleParam);
  // save role
  await role.save();
}

async function deleteRole(id) {
    await Role.findByIdAndRemove(id);
}