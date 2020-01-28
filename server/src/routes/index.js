// routes/index.js
import express from 'express';
import link from './link'
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: `index page`
  })
});
router.use('/link', link)


export default router;