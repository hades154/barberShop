const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const {authorize} = require('../middlewares/authMiddleware');
const shopController = require('../controllers/shopController');


router.post('/signup', userController.createUser);
router.post('/login',  authController.login,authorize(['admin', 'customer', 'salon']));
router.get('/barbershops', shopController.getAllBarbershops);
router.get('/barbershops/:id', shopController.getBarbershopById);
router.get('/search', shopController.searchBarbershops);
router.get("/bookingData/:uid", shopController.getBookingData);
router.post("/createAppointment", shopController.createAppointment);
router.get("/notiAppointments/:barberShopId", shopController.getNewAppointments);
  

module.exports = router;