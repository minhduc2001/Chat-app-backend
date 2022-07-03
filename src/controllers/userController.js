const User = require('../model/User')
const bcrypt = require('bcrypt')

class UserController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const emailChekck = await User.findOne({ email: email })
            if (emailChekck) {
                return res.json({
                    msg: 'Email already registered!',
                    status: false
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email,
                password: hashedPassword
            })
            user.save();

            delete user.password;

            return res.json({
                user,
                status: true
            })
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.json({
                    status: false,
                    msg: 'Email or Password incorrect!'
                })
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.json({
                    status: false,
                    msg: 'Email or Password incorrect!'
                })
            }
            delete user.password;
            return res.json({
                status: true,
                user
            })
        } catch (error) {
            next(error);
        }
    }

    async setAvatar(req, res, next) {
        try {
            const userId = req.params.id;
            const avatar = req.body.avatar;
            const username = req.body.username;
            console.log(userId, avatar, username);
            const userData = await User.findByIdAndUpdate(userId, {
                isAvatarSet: true,
                avatar: avatar,
                username: username
            }, {new: true});
            console.log('data', userData);
            if (userData)
                return res.json({
                    isSet: true,
                    avatar: userData.avatar,
                    username: userData.username
                })
            return res.json({isSet: false})
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {

            const users = await User.find({ _id: { $ne: req.params.id } }).select([
                'email', 'username', 'avatar', '_id'
            ])

            return res.json(users);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController;