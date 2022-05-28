const {Router} = require('express');
const {redirectController} = require("../controllers/redirectController.js");
const router = Router();

router.route('/:code')
	.get(redirectController)

module.exports = router;
