const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware.js');
const {generateLink, getUserLinks, getLinkById, deleteLinkById} = require("../controllers/linksController.js");

const router = Router();

router.route('/generate')
	.post(authMiddleware, generateLink)

router.route('/')
	.get(authMiddleware, getUserLinks)

router.route('/:id')
	.get(authMiddleware, getLinkById)
	.delete(authMiddleware, deleteLinkById);

module.exports = router;

