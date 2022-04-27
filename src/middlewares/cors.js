module.exports = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('origin') || '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, cache-control');
    res.header('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' === req.method) {
        return res.status(200).send();
    }

    next();
}
