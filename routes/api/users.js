const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/user');

// @route       Post api/users
// @desc        Register  route
// @access     Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check(
            'email', 
            'please included a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters')
        .isLength({min: 6})
    ],  
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
        }

        const {name, email, password } = req.body;

        try {
        // See if user exists
            let user = await User.findOne({ email });
            if(user){
               return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
            }
        //Get users Gravatar 
            const avatar = gravatar.url(email, {
                s: '200',
                r:  'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            });
        //Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        //Actually Save the User
            await user.save();

        //Return the JWT
        res.send('User registered!');
        } catch(err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }

});

module.exports = router;