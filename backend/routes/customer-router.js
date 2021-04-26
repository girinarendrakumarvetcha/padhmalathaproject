const express = require('express');

const ContactCtrl = require('../controllers/contact_master-ctrl');

const router = express.Router();

router.post('/customer', ContactCtrl.createContact);
router.put('/customer/update/:id', ContactCtrl.updateContact);
router.delete('/customer/delete/:id', ContactCtrl.deleteContact);
router.get('/customer/:id', ContactCtrl.getContactById);
router.get('/customers', ContactCtrl.getContactList);
router.get('/customerdrpdwn', ContactCtrl.getCustomerDropdown);
router.get('/customer/fetch/:id', ContactCtrl.getContactById);

module.exports = router