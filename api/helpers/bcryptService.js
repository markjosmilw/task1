const bcrypt = require("bcrypt");

async function validatePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
    validatePassword
}