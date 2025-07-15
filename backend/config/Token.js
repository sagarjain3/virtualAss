import jwt from "jsonwebtoken";

const getToken = (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log("Token generation error:", error);
        return null;
    }
};

export default getToken;
