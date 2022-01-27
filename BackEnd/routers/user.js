const express = require('express');
const {User} = require('../models/user')
const router = express.Router();
const bcryp = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get('/', async (req, res) => {
    const users = await User.find().select("-passwordHash");
    if(users) {
        res.status(200).send({success: true, size: users.length, data: users});
        return;
    }
    res.status(500).json({success: false, message: "Data not found!"});
});

router.get('/getUserById/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if(!user) {
        res.status(500).json({success: false, message: 'The user with id was not found!!'});
        return;
    }
    res.status(200).send({success: true, data: user});
});

/** Return total products document(record) */ 
router.get('/count', async (req, res) => {
    const userCount = await User.countDocuments();
    if(userCount) {
        res.status(200).send({success: true, count: userCount});
        return;
    }
    res.status(500).send({success: false, message: "User not found!"});
});


router.post('/register', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcryp.hashSync(req.body.password), // payload password and encoding password to paswordHash
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    
    // shorted code
    user = await user.save(); //Return a object if success. Otherwise return null
    if(!user) return res.status(500).send({success: false, message: 'The user cannot be created!'});
    res.send({success: true, data: user, message: "The user was created successfully"}); // send model
});

router.put('/update/:id', async (req, res) => {
    const userExist = User.findById(req.params.id);
    const passwordUpdate = req.body.password ? bcryp.hashSync(req.body.password) : userExist.passwordHash;

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        passwordHash: passwordUpdate, // payload password and encoding password to paswordHash
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUser, {new: true}); //Return a object if success. Otherwise return null
    if(!user) return res.status(500).send({success: false, message: 'The user cannot be updated!'});
    res.send({success: true, message: "User was saved successfully", data: user}); // send model
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    /**
     * Secret like a password for token,
     * This key to parse and analyzie when anyone try to pass a fake token to our application
     *  refer handle at function authJwt() in jwt-helper.js 
     * */ 
    const secretKey = process.env.secretKeyToken; 
    if(!user) return res.status(400).send({success: false, message: "The user not found!"});
    if(user && bcryp.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {userId: user.id, isAdmin: user.isAdmin}, // information contain/payload in token
            secretKey, 
            {expiresIn: "1w"}
        ); 
        //return a token, we can copy that from api to jwt.io then token infor will display if user has permission for admin or not
        res.status(200).send({success: true, user: user.email, token})
    } else {
        res.status(400).send({success: false, message: "Wrong password!!"});
    }
});

router.delete('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if(user) { //findByIdAndRemove  passing the found document (if any) to the callback.
            res.status(200).json({success: true, message: 'The user was deleted'});
        } else {
            res.status(404).json({success: false, message: 'User not found!!'});
        }
    }).catch((error) => {
        res.status(400).json({success: false, error});
    })
});


// export this router as module for app.js can using.
module.exports = router;