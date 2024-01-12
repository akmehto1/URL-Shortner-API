const router = require('express').Router()
const {homepageHandler,gotoURL,analytics}=require('../controllers/homepage')




router.post('/' ,homepageHandler)

router.get('/:shortURL',gotoURL);


router.get('/analytics/:shortId',analytics);



module.exports  = router