module.exports = (req, res, next) => {
    if (res.locals.user) {
        if (res.locals.user.rolId > 0) {
            next();
        } else {
            return res.sendStatus(401);
        }
    } else {
        return res.sendStatus(401);
    }
}