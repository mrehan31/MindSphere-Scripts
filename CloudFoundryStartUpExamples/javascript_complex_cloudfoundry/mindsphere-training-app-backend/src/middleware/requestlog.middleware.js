exports.middleware = (req, res, next) => {
    console.log('REQUEST', {
        method: req.method,
        url: req.url
    });

    const logResponseCode = () => {
        console.log('RESPONSE --', res.statusCode, '--', res.statusMessage);
    }

    const logClose = () => {
        console.log('CLOSED Connection was closed');
    }

    const logError = () => {
        console.log('CONNECTION ERROR');
    }

    const unregisterLogEvents = () => {
        res.removeListener('finish', logResponseCode);
        res.removeListener('close', logClose);
        res.removeListener('error', logError);
    }

    res.on('finish', logResponseCode, unregisterLogEvents);
    res.on('close', logClose, unregisterLogEvents);
    res.on('error', logError, unregisterLogEvents);

    next();
};
