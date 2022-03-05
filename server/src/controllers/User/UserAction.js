const User = require('../../models/User')
const FilterUserData = require('../../utils/FilterUserData')

exports.updateProfilePic = async (req, res) => {
    const { profile_url } = req.body;
    try {
        const user = await User.findById(req.userId)
        user.profile_pic = profile_url
        await user.save()
        const getUser = await User.findById(req.userId).populate('friends')
        const userData = FilterUserData(getUser)
        const friends = getUser.friends.map((friend) => {
            return {
                ...FilterUserData(friend),
            }
        })
        userData.friends = friends
        res.status(200).json({ message: 'profile image updated', user: userData })
    } catch (err) {
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
}