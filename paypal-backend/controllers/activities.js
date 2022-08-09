/* eslint-disable no-undef */
const activitiesRouter = require('express').Router();
const Activity = require('../models/activity');
const User = require('../models/user');
const jwt = require('jsonwebtoken');



const getTokenFrom = req => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};



activitiesRouter.get('/', async (req, res) => {
    const activities = await Activity
        .find({}).populate('user', { username: 1, name: 1 });

    res.json(activities);
});



activitiesRouter.get('/:id', async (req, res) => {
    const activity = await Activity.findById(req.params.id);
    if (activity) {
        res.json(activity.toJSON());
    } else {
        res.status(404).end();
    }
});



activitiesRouter.post('/', async (req, res) => {
    const body = req.body;


    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);


    const activity = new Activity({
        content: body.content,
        important: body.important === undefined ? false : body.important,
        date: new Date(),
        user: user._id
    });


    const savedActivity = await activity.save();
    user.activities = user.activities.concat(savedActivity._id);
    await user.save();

    res.status(201).json(savedActivity);
});



activitiesRouter.delete('/:id', async (req, res) => {
    await Activity.findByIdAndRemove(req.params.id);
    res.status(204).end();
});




activitiesRouter.put('/:id', (req, res, next) => {
    const body = req.body;

    const activity = {
        content: body.content,
        important: body.important,
    };

    Activity.findByIdAndUpdate(req.params.id, activity, { new: true, runValidators: true, context: 'query' })
        .then(updatedActivity => {
            res.json(updatedActivity);
        })
        .catch(error => next(error));
});



module.exports = activitiesRouter;



