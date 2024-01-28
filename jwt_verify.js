const { CognitoJwtVerifier } = require("aws-jwt-verify");
require(`dotenv`).config();

async function verify(req, res, next) {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        res.setHeader("Content-Security-Policy", "default-src 'self'; img-src https://*; script-src 'self' https://localhost;");
        // Content-Security-Policy
        // May cause future issues if data if requested from other origin of websites
        // NEED TO MODIFY this value in production environment!!

        res.cookie('jwtToken', token, { httpOnly: true });
        // We need httpOnly to protect again XSS attacks
        // In production we use the following line, its more secure:
        // httpOnly: true, secure: true, sameSite: 'strict'
        // Keep in mind it will be HTTPS only and not HTTP.

        // Verifier that expects valid access tokens:
        const verifier = CognitoJwtVerifier.create({
            userPoolId: process.env.USER_POOL_ID,
            tokenUse: "access",
            clientId: process.env.CLIENT_ID,
        });

        try {
            const payload = await verifier.verify(
                token // the JWT as string
            );
            console.log("Token is valid. Payload:", payload);
            next();
        } catch (err) {
            console.log("Token not valid!", err);
        }
    } else {
        console.log("No token received..........")
        res.status(400).send("No token was sent to server.")
    }
}

module.exports = verify;
