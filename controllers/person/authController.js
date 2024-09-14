import { respondWithError, respondWithServerError } from "../../helpers/errors.js";
import generarJWT from "../../helpers/generarJWT.js";
import Usuario from "../../models/user/Usuario.js";


const autenticar = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username) {
            return respondWithError(res, 400, 'El campo "Nombre de Usuario" es obligatorio');
        }
        if (!password) {
            return respondWithError(res, 400, 'El campo "Contraseña" es obligatorio');
        }
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

        // confirmar password
        if (!usuario.confirmado) {
            return respondWithError(res, 404, 'Tu cuenta no ha sido confirmada');
        }

        // autenticar usuario
        res.json({token: generarJWT(usuario.id) });
        

    } catch (error) {
        return respondWithServerError(res, error);
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    try {
        const tokenValido = await Usuario.findOne({where: {token}});
        console.log(tokenValido);
        if (!tokenValido) {
            return respondWithError(res, 404, 'Token no válido');
        }
        res.json({msg: 'Token válido y el usuario existe'});

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

export {
    autenticar,
    confirmar,
    comprobarToken
}