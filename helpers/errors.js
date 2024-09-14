const respondWithError = (res, statusCode, msg) => {
    return res.status(statusCode).json({ msg: msg});
}

const respondWithServerError = (res, error) => {
    return res.status(500).json({ msg: 'Error en el servidor', error: error.message});
}

export {
    respondWithError,
    respondWithServerError
};