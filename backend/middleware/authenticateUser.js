import { User } from "../models/User";

// Middleware to authenticate the user on login. Next() makes the program continue to the next middleware
export const authenticateUser = async (req, res, next) => {
    const user = await User.findOne({ accessToken: req.header("Auth") });

    if (user) {
        req.user = user;
        next();
    } else {
        res.status(403).send("You need to sign in!"); // Returns an error if the user is not logged in
    }
};