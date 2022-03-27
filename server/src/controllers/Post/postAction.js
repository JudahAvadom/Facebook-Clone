const User = require('../../models/User')
const Post = require('../../models/Post')

exports.createPost = async (req, res) => {
    let { content, privacy, image, body } = req.body
    if (!content && content.trim().length === 0 && !image) {
        return res.status(422).json({
            error: 'Post Image or Write Some Content  to Post. Can`t upload empty post',
        })
    }
    try {
        const createPost = new Post({
            image,
            privacy,
            content,
            user: req.userId,
            isProfilePost: false,
        });
        const savePost = await createPost.save()
        if (Object.keys(body).length) {
            savePost.body = {
                feelings: body.feelings,
                at: body.at,
                date: body.date,
                with: body.with.map((user) => user),
            }
            await savePost.save()
        }
        const post = await Post.findById(savePost.id).populate('user').populate({ path: 'body.with', select: '_id name' })
        const postData = FilterPostData(post)
        res.status(201).json({ message: 'post created successfully', post: postData })
        let dataToSend = {
            req, key: "new-post", data: postData,
            notif_body:`${post.user.name} has created new post`
        }
        await sendDataToFriends(dataToSend)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
}