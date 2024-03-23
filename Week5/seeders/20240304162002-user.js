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
        password: '$2a$12$gDyCUOPlyaOIfev/0iBMp.zZU2zIvPvD89yE9atMuazVtgXF93NnO', //Askoltus
        email: 'Samlays@gmail.com',
        number: '6282298789781'
      },
      {
        name: 'Dore Doebee',
        password: '$2a$12$Cm/otfsDUgJC5nxEkLHJg.yKD8jq7RgM893DB7RlaisTwcEMB7zom', //1234567890
        email: 'Doredoe@gmail.com',
        number: '6282298789781'
      },
      {
        name: 'Archie Bunker',
        password: '$2a$12$zcC/UtbBVUdKV8hMQvSmtuyhis4mfmQRMEHsZW1p6aBF5qsjpnivG', //Somehow123
        email: 'Bunkersa@gmail.com',
        number: '6282298789781'
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
