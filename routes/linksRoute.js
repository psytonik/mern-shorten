const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware.js');
const {generateLink, getUserLinks, getLinkById, deleteLinkById,getLinkByIdAndUpdate} = require("../controllers/linksController.js");

const router = Router();

router.route('/generate')
	.post(authMiddleware, generateLink)

router.route('/')
	.get(authMiddleware, getUserLinks)

router.route('/:id')
	.get(authMiddleware, getLinkById)
	.delete(authMiddleware, deleteLinkById)
	.put(authMiddleware, getLinkByIdAndUpdate)

module.exports = router;

