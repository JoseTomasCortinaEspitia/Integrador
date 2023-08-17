export default function validation({email, password}) {
    //input -> {email:"", password:""}
    let error = {};
    let regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let regexNumber = /\d/;

    if (!regexEmail.test(email)) {
        error.email = "Debe ser un Email valido"
    }

    if (!email){
        error.email = "Este campo no puede estar vacio"
    }

    if (email.length > 35){
        error.email = "Debe tener menos de 35 caracteres"
    }

    if (!regexNumber.test(password)){
        error.password = "La contraseña debe tener al menos un numero"
    }
    if (password.length < 6 || password.length > 10) {
        error.password = "Debe tener una longitud entre 6 y 10 caracteres"
    }

    return error
}