module.exports = (err, res, req, next) => {
    res.status(404).send({ error: message })
}