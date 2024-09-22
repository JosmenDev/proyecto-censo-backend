import { respondWithError, respondWithServerError } from "../../helpers/errors.js";
import generarJWT from "../../helpers/generarJWT.js";
import Usuario from "../../models/user/Usuario.js";


const autenticar = async (req, res) => {
    const { username, password } = req.body;
    try {
        // console.log('Validando...');
        const usuario = await Usuario.findOne({ where: {username}});
        // validar el username
        // console.log('Validando username');
        if (!usuario) {
            return respondWithError(res, 404, 'El nombre de usuario no está registrado');
        }

        // validar password
        const validarPassword = await usuario.comprobarPassword(password);
        if (!validarPassword) {
            return respondWithError(res, 404, 'El password es incorrecto');
        }
        const data = {confirmado: usuario.confirmado};

        // confirmar password
        if (!usuario.confirmado) {
            data.token = usuario.token;
        } else {
            data.token = generarJWT(usuario.id);
        }

        // autenticar usuario
        res.json(data);

    } catch (error) {
        return respondWithServerError(res, error);
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    try {
        const tokenValido = await Usuario.findOne({where: {token}});
        // console.log(tokenValido);
        if (!tokenValido) {
            return respondWithError(res, 404, 'Token no válido');
        }
        res.json(tokenValido);

    } catch (error) {
        respondWithServerError(res, error);
    }
};

const confirmar = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    try {
        const  usuario = await Usuario.findOne({where: {token}});
        // Validar token
        if (!usuario) {
            return respondWithError(res, 404, 'Token no válido');
        }
        // Validar clave
        const passwordIngresado = await usuario.comprobarPassword(password);
        if (passwordIngresado) {
            return respondWithError(res, 400, 'La contraseña tiene que ser distinta a la actual');
        }

        usuario.token = null;
        usuario.confirmado = true;
        usuario.password = password;
        await usuario.save();
        res.json({msg: 'Password modificado correctamente'});

    } catch (error) {
        respondWithServerError(res, error);
    }

};

const perfil = (req, res) => {
    const { usuario } = req;
    res.json(usuario);
}

export {
    autenticar,
    confirmar,
    comprobarToken,
    perfil
}