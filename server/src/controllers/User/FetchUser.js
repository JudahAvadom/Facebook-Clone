const User = require('../../models/User')
const Notification = require('../../models/Notification')
const FilterUserData = require('../../utils/FilterUserData')

exports.me = async(req, res) => {
    try {
        const user = await User.findById(req.userId).populate('friends');
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }
        const userData = FilterUserData(user);
        const friends = user.friends.map((friend) => {
            return {
                ...FilterUserData(friend),
            }
        })
        userData.friends = friends
        const notifications = await Notification.find({ user: req.userId }).sort({
            createdAt: -1,
        })
        let notifData = notifications.map((notif) => {
            return {
                id: notif.id,
                body: notif.body,
                createdAt: notif.createdAt,
            }
        })
        res.status(200).json({ user: userData, notifications: notifData })
    } catch (err) {
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
}