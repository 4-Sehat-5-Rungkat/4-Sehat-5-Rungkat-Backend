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
        image: "/images/product/sepatu_lari.jpg",
        quantity: 10
      },
      {
        name: "Jersey Sepak Bola",
        price: 250000,
        description: "Jersey resmi klub favoritmu, nyaman dan stylish.",
        image: "/images/product/jersey_sepak_bola.jpg",
        quantity: 10
      },
      {
        name: "Raket Bulu Tangkis",
        price: 350000,
        description: "Raket dengan desain aerodinamis untuk kontrol dan kekuatan lebih baik.",
        image: "/images/product/raket_bulu_tangkis.jpg",
        quantity: 10
      },
      {
        name: "Bola Basket",
        price: 200000,
        description: "Bola basket resmi ukuran standar untuk pertandingan serius.",
        image: "/images/product/bola_basket.jpg",
        quantity: 10
      },
      {
        name: "Bola Sepak",
        price: 150000,
        description: "Bola sepak resmi ukuran standar untuk pertandingan serius.",
        image: "/images/product/bola_sepak.jpg",
        quantity: 10
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
