const bcrypt = require("bcrypt");

const passwordService = {
    comparePassword: async (password, hashedPassword) => {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    },
    hashedPassword: async (password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
}

module.exports = passwordService;