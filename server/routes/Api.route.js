const express = require('express');
const router = express.Router();

const list_controller = require('../controllers/List.Controller');
const user_controller = require('../controllers/User.Controller');


const Auth = require('../middleware/Auth');


router.post('/user', user_controller.Create);
router.post('/user/login', user_controller.Login);

router.route('/list')
    .get(Auth,list_controller.Get)
    .post(Auth,list_controller.Create)

router.put('/list/:id',Auth,list_controller.Update)
router.delete('/list/:id',Auth,list_controller.Delete)

module.exports = router;