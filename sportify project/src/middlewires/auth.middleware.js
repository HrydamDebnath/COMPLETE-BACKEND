const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // 1. Verify the token signature
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 2. Check if the user role is authorized
        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "Forbidden: Only artists can access this resource"
            });
        }
        

        // 3. Attach the decoded user data to the request object so controllers can use it
        req.user = decoded; 
        
        // 4. Everything is good, move to the next function!
        next(); 
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
}


async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== "user" ) {
            return res.status(403).json({
                message: "Forbidden: Only users  can access this resource"
            });
        }
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = { authArtist, authUser };