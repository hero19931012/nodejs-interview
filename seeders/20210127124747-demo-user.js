'use strict';
const bcrypt = require('bcrypt')
const members = [
  { account: "Oliver" },
  { account: "Harry" },
  { account: "Noah" },
  { account: "Olivia" },
  { account: "George" },
  { account: "Isla" },
  { account: "Leo" },
  { account: "Jack" },
  { account: "Emily" },
  { account: "Ava" }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const saltRounds = 10
    for (let member of members) {
      const salt = await bcrypt.genSalt(saltRounds)
      const hash = await bcrypt.hash(member.account, salt)
      member.passwd = hash
    }
    queryInterface.bulkInsert('Members', members);
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};