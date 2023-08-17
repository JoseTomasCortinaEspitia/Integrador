import { useEffect, useState } from "react"
import validation from "../utils/validations";

export default function Form({login}) {
    
    //Estado local 
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        //se van almacenar los mensajes de error que se le van a mostrar al usuario

    })

    //Funcion handleChange que nos permite reflejar el texto 
    //ingresado de los inputs en nuestro estado local

    //opción 1
    // const handleChange = (event) => {
    //     const {name, value} = event.target
    //     console.log(name, value)
    //     if (name === "email") {
    //         setUserData({
    //             email: value,
    //         }) 
    //     }   else{
    //             setUserData({
    //                 password: value,
    //             })
    //         }      
    // }

    //opción 2: mejor por que es un codigo dinamico , osea no depende de valores ingresados a mano.
    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData({
            ...userData, 
            [name]: value,
        })
        
        setErrors(
            validation({
            ...userData,
        [name]: value,
        }))
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        login(userData)
    } 

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input 
                name="email" 
                onChange={(e) => handleChange(e)} 
                value={userData.email} 
                type="email" />
                {errors.email ? (<p>{errors.email}</p>) : (<p>Email ingresado exitosamente!</p>) }
            </div>
            <div>
                <label>Password</label>
                <input 
                name="password" 
                onChange={handleChange} 
                value={userData.password} 
                type="password" />
                {errors.password ? (<p>{errors.password}</p>):(<p>Password ingresado exitosamente!</p>)}
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}