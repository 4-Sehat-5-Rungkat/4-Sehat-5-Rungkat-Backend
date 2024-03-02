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
    await queryInterface.bulkInsert('products', [
      {
        name: "Sepatu Lari",
        price: 750000,
        description: "Sepatu lari dengan teknologi terbaru untuk performa maksimal.",
      },
      {
        name: "Jersey Sepak Bola",
        price: 250000,
        description: "Jersey resmi klub favoritmu, nyaman dan stylish.",
      },
      {
        name: "Raket Bulu Tangkis",
        price: 350000,
        description: "Raket dengan desain aerodinamis untuk kontrol dan kekuatan lebih baik.",
      },
      {
        name: "Bola Basket",
        price: 200000,
        description: "Bola basket resmi ukuran standar untuk pertandingan serius.",
      },
      {
        name: "Bola Sepak",
        price: 150000,
        description: "Bola sepak resmi ukuran standar untuk pertandingan serius.",
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
