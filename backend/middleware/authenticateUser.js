// // Middleware for authentication
// const authenticateUser = async (req, res, next) => {
//     // Extract JWT token from request header
//     const token = req.header("Authorization");

//     if (!token) {
//         return res.status(401).json({ success: false, error: 'Authorization denied. Token not provided.' });
//     }

//     try {
//         // Verify and decode the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || "Sixten");

//         // Attach the user's ID from the token to the request object for later use
//         req.user = decoded.id;
//         next(); // Move to the next middleware
//     } catch (error) {
//         return res.status(401).json({ success: false, error: "Invalid token." });
//     }
// };