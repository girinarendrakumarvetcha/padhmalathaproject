const express = require('express');

const SitePageCtrl = require('../controllers/site_page-ctrl');

const router = express.Router();

router.get('/site_page/search/:q', SitePageCtrl.getSitePageSearch);

module.exports = router