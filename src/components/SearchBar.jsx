import { useState } from "react";

export default function SearchBar({onSearch}) {

   //Estado local
   const [id, setId] = useState("");

   //Función para que cada vez que el usuario escribe algo en el input, este se guarde en el estado local
   const handleChange = (event) => {

      //Capturar el id que ingresa el usuario
      const{value} = event.target;

      //Actualizar el estado con lo que escribio
      setId(value);
   }

   return (
      <div>
         <input type='search' onChange={handleChange}/>
         <button onClick={()=>onSearch(id)}>Agregar</button>
      </div>
   );
}
