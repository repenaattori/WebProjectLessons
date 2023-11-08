const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {addUser, getUsers, checkUser} = require('../postgre/user');

/**
 * User root get mapping
 */
router.get('/', async (req, res) => {

    try {
        res.json(await getUsers());    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


//User root post mapping. Supports urlencoded and multer
router.post('/register', upload.none() , async (req,res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const uname = req.body.uname;
    let pw = req.body.pw;

    pw = await bcrypt.hash(pw, 10);

    try {
        await addUser(fname,lname,uname,pw);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }

});

router.post('/login', upload.none(), async (req,res) => {
    const uname = req.body.uname;
    let pw = req.body.pw;

    const pwHash = await checkUser(uname);

    if(pwHash){
        const isCorrect = await bcrypt.compare(pw, pwHash);
        if(isCorrect){
            const token = jwt.sign({username: uname}, process.env.JWT_SECRET_KEY);
            res.status(200).json({jwtToken:token});
        }else{
            res.status(401).json({error: 'Invalid password'});
        }
    }else{
        res.status(401).json({error: 'Customer not found'});
    }
});

router.get('/private', async (req,res) => {
    //Authorization: Bearer token
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const username = jwt.verify(token, process.env.JWT_SECRET_KEY).username;
        res.status(200).json({private: 'This is private for ' + username});
    } catch (error) {
        res.status(403).json({error: 'Access forbidden'});
    }
});

module.exports = router;