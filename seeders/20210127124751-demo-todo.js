'use strict';

const date = new Date();
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
    await queryInterface.bulkInsert('Todos', [
      {
        to_do_id: "10001",
        subject: "晨會",
        brief: "午餐負責人",
        level: 3,
        author: members[Math.floor(Math.random() * members.length)].account,
        content: "AA",
        reserved_time: date
      },
      {
        to_do_id: "10002",
        subject: "下午茶",
        brief: "50嵐 VS 可不可熟成",
        level: 8,
        author: members[Math.floor(Math.random() * members.length)].account,
        content: "BB",
        reserved_time: date
      },
      {
        to_do_id: "10003",
        subject: "客戶拜訪",
        brief: "陽明山上的阿婷來訪",
        level: 7,
        author: members[Math.floor(Math.random() * members.length)].account,
        content: "CC",
        reserved_time: date
      },
      {
        to_do_id: "10004",
        subject: "晨會",
        brief: "午餐自行處理",
        level: 3,
        author: members[Math.floor(Math.random() * members.length)].account,
        content: "DD",
        reserved_time: date
      },
      {
        to_do_id: "10005",
        subject: "下午茶",
        brief: "京盛宇限定",
        level: 5,
        author: members[Math.floor(Math.random() * members.length)].account,
        content: "QQ",
        reserved_time: date
      }
    ]);
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
