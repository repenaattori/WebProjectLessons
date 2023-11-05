const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

/**
 * User root get mapping
 */
router.get('/', (req, res) => {

    const id = req.query.id;
    const name = req.query.name;

    console.log(id);
    console.log(name);
    res.send('Reima Riihimäki');
});


//User root post mapping. Supports urlencoded and multer
router.post('/', upload.none() ,(req,res) => {

    console.log(req.body.username);
    console.log(req.body.pw);

    res.send('Post working');
});

module.exports = router;