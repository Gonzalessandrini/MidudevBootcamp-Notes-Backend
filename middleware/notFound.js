module.exports = (req, res, message,next) => {
    res.status(404).send({ error: message })
}