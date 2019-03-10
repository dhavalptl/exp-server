const logger = (req, res, next) => {
    console.log(`\x1b[36m<\x1b[0m${req.method}\x1b[36m>\x1b[0m : ${new Date().toISOString()} : ${req.originalUrl}`);
    next();
};

module.exports = logger;