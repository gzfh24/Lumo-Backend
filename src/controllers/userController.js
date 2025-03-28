const UserModel = require('../models/userModel');

class UserController {
    static async createUser(req, res) {
        const { username, email, avatar_url, birth_date } = req.body;

        try {
            // Validation
            if (!username || !email || !birth_date) {
                return res.status(400).json({ 
                    error: 'Username, email, and birth date are required' 
                });
            }

            const newUser = await UserModel.createUser({
                username,
                email,
                avatar_url,
                birth_date
            });

            res.locals.newUser = newUser;

            return next();

        } catch (error) {
            return next(error);
        }
    }
}

module.exports = UserController;