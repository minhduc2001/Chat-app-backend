const router = require('express').Router();
const messagesController = require('../controllers/messagesController')

router.post('/addmsg', messagesController.addMessages)
router.post('/getmsg', messagesController.getAllMessages)

module.exports = router;