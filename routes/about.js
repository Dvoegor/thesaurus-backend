const express = require('express')
const router = express.Router()
const pool = require('../pools/pool');

router.get('/', (req, res) => {
    res.render("about.hbs", {success: req.session.success, email: req.session.email})
})

module.exports = router
