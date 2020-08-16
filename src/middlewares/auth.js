module.exports = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else if (req.cookies.email) {
        return next();
    } else {
        //res.redirect('/login');
        return res.sendStatus(401);
    }
}