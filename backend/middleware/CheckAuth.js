import jwt from 'jsonwebtoken'

const CheckAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        // Log the token for debugging
        // console.log("TOKEN:", token);
        // console.log("req.headers.cookie:", req.headers.cookie)
        // console.log("req.cookies:", req.cookies)


        // Check if token exists and is a string
        if (!token || typeof token !== "string") {
            return res.status(401).json({ msg: "Token not found or invalid" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = verifyToken.userId; // Assign the user's ID to req

        next();
    } catch (error) {
        console.log("JWT Error:", error);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
}

export default CheckAuth;
