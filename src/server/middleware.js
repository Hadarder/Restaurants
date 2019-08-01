const jwt = require('jsonwebtoken');

const secret = '1q2w3e4r';
module.exports.secret = secret;

const withAuth = function (req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
        res.status(204).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.status(204).send('Unauthorized: Invalid token');
            } else {
                req.username = decoded.username;
                next();
            }
        });
    }
};

const compareUsername = function (req, res, next) {
    const username = req.params.username;
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
        req.editable = false;
    } else {
        jwt.verify(token, secret, function (err, decoded) {
            if (!err && username === decoded.username) {
                req.editable = true;
            }  else req.editable = false;
        });
    }
    next();
};

module.exports.withAuth = withAuth;
module.exports.compareUsername = compareUsername;