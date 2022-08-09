/* eslint-disable no-undef */
const passwordRouter = require('express').Router();
const User = require('../models/user');
const Token = require('../models/token');
const sendPasswordResetEmail = require('../utils/sendPasswordResetEmail');
const crypto = require('crypto');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');


//send password link
passwordRouter.post('/', async (req, res) => {
    try {
        const { email } = req.body;

        const emailSchema = Joi.object({
            email: Joi.string().email().required().label('Email'),
        });

        const { error } = emailSchema.validate(req.body);

        if (error)
            return res.status(400).send({ message: error.details[0].message });


        let user = await User.findOne({ email });
        if (!user)
            return res
                .status(409)
                .send({ message: 'User with given email does not exist!' });


        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save();
        }


        const url = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendPasswordResetEmail(user.email, 'Password Reset Request', url);

        res
            .status(200)
            .send({ message: 'Password reset link sent to your email account' });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});



// verify password reset link
passwordRouter.get('/:id/:token', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: 'Invalid link' });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: 'Invalid link' });

        res.status(200).send('Valid Url');
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});






//  set new password
passwordRouter.post('/:id/:token', async (req, res) => {
    try {
        const { password } = req.body;

        const id = ObjectId(req.params.id);
        const user = await User.findOne({ _id: id });
        console.log(id);
        console.log(user);

        if(!user) {
            return res.status(400).json({
                error: 'Invalid link'
            });
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });


        if(!token) {
            return res.status(400).json({
                error: 'Invalid link'
            });
        }


        if (!user.verified) {
            await User.updateOne({ _id: user._id }, { $set:{ verified: true } });
        }


        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        await User.updateOne({ _id: user._id }, { $set:{ passwordHash: passwordHash } }, { new: true });
        await token.remove();

        res.status(200).send({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});




module.exports = passwordRouter;