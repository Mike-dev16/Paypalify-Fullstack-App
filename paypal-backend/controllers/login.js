/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const Token = require('../models/token');
const sendSignUpEmail = require('../utils/sendSignUpEmail');
const crypto = require('crypto');



loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid email or password'
        });
    }



    if (!user.verified) {
        let signUpToken = await Token.findOne({ userId: user._id });
        if(!signUpToken) {
            signUpToken = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex')
            }).save();
        }
        const url = `${process.env.Base_URL}/users/${user._id}/verify/${signUpToken.token}`;
        await sendSignUpEmail(user.email, 'Email Verification', url, user.firstName);

        return res.status(400).send({
            message: 'An Email sent to your account, please verify'
        });
    }

    const userForToken = {
        email: user.email,
        id: user._id,
    };

    // token expires in 60*60 seconds, that is, in one hour
    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60*60 }
    );


    res
        .status(200)
        .send({ token, email: user.email, name: user.firstName });
});

module.exports = loginRouter;