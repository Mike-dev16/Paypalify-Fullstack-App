/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const Token = require('../models/token');
const sendSignUpEmail = require('../utils/sendSignUpEmail');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');



usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({}).populate('activities', { content: 1, date: 1 });

    res.json(users);
});



usersRouter.post('/', async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            error: 'User already exist'
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        email,
        firstName,
        lastName,
        passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);


    const token = new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex')
    });


    const savedToken = await token.save();
    //res.status(201).json(savedToken);

    const url = `${process.env.Base_URL}/users/${user._id}/verify/${savedToken.token}`;
    await sendSignUpEmail(user.email, 'Email Verification', url, firstName);

});




usersRouter.get('/:id/verify/:token', async (req, res) => {
    try {
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


        await User.updateOne({ _id: user._id }, { $set:{ verified: true } });
        await token.remove();

        res.status(200).json({
            message: 'Email verified successfully'
        });


    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});




usersRouter.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.status(204).end();

});


module.exports = usersRouter;