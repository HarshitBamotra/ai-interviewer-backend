const User = require("../models/user.model");
const { InternalServerError, NotFound, BadRequest } = require("../errors");
const jwt = require('jsonwebtoken');


class AuthRepo {
    async register(userData) {
        try {
            const { username, email, password, profileImage } = userData;

            const existingUser = await User.findOne({ email });

            if (existingUser) {

                const isMatch = await existingUser.comparePassword(password);

                if (isMatch) {

                    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

                    return {
                        token,
                        user: {
                            id: existingUser._id,
                            username: existingUser.username,
                            email: existingUser.email,
                            profileImage: existingUser.profileImage
                        },
                        isNewUser: false
                    };
                } else {

                    return {
                        userExists: true,
                        isNewUser: false
                    };
                }
            }


            const user = new User({ username, email, password, profileImage });
            await user.save();


            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });


            return {
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileImage: user.profileImage
                },
                isNewUser: true
            };

        } catch (error) {
            console.log(error);
            throw new InternalServerError(error.message);
        }
    }

    async login(userData) {
        try {
            const { email, password } = userData;

            const user = await User.findOne({ email });
            if (!user) {
                return { userNotFound: true };
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return { invalidPassword: true };
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            return {
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            };
        } catch (error) {
            console.log(error);
            throw new InternalServerError(error.message);
        }
    }

    async updateUser(userId, userData){
        try{
            const {username, profileImage} = userData;
            
            const user = await User.findByIdAndUpdate(userId, {username, profileImage}, {new: true});

            if(!user){
                throw new NotFound("User", userId);
            }

            return user;
        }
        catch(err){
            console.log(err);
            throw new InternalServerError(err.message);
        }
    }
}

module.exports = AuthRepo;