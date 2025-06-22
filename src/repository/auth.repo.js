const User = require("../models/user.model");
const { InternalServerError, NotFound } = require("../errors");
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
}

module.exports = AuthRepo;