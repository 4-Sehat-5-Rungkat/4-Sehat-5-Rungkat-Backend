'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users',[
      {
        name: 'Sam Lays',
        password: 'Askoltus',
        email: 'Samlays@gmail.com'
      },
      {
        name: 'Felicia Doebee',
        password: '1234567890',
        email: 'Feliciad@gmail.com'
      },
      {
        name: 'Siaw Michelle',
        password: 'Somehow123',
        email: 'MichelleMP@gmail.com'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
