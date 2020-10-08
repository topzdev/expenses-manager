const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')
const auth = require('../auth');

// 1. create a route
// 2. create controller logic

router.post('/email-exists', (req, res) => {
	UserController.emailExists(req.body).then(result =>{
		res.send(result)
	})
})

router.post('/', (req, res) => {
	UserController.register(req.body).then(result =>{
		res.send(result)
	})
})

router.post('/login', (req, res) => {
	UserController.login(req.body).then(result =>{
		res.send(result)
	})
})

router.get('/details', auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization);
	UserController.get({ userId: user.id }).then(user => res.send(user))
})

router.post('/enroll', auth.verify, (req, res) => {
	const params = {
		userId: auth.decode(req.headers.authorization).id,
		courseId: req.body.courseId
	}
	UserController.enroll(params).then(result => res.send(result))
})

router.put('/details', (req, res) => {
    UserController.updateDetails()
})

router.put('/change-password', async (req, res) => {
	res.send(await UserController.changePassword(req.body));
})

router.post('/verify-google-id-token', async (req, res) => {
    res.send(await UserController.verifyGoogleTokenId(req.body.tokenId))
})

module.exports = router;