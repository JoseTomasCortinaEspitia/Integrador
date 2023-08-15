import './App.css';
import Nav from './components/Nav';
import Cards from './components/Cards.jsx';
import { useState } from 'react';
import axios from "axios";

const example = {
   id: 1,
   name: 'Rick Sanchez',
   status: 'Alive',
   species: 'Human',
   gender: 'Male',
   origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
   },
   image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

function App() {
   
   //Estado de funciones
   const [characters, setCharacters] = useState([])
   
   //Función onClose
   const onClose = (id) => {
      const filtered = characters.filter((char)=> char.id !== id)
      setCharacters(filtered)
   } 

   //Función onSearch
   function onSearch(id) {
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [data, ...oldChars]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      }
      ).catch((error)=>{
      window.alert(error.response.data.error)});
   }
   
   //Lo que se renderiza en pantalla es lo que esta dentro de return
   return (
      <div className='App'>
         <Nav onSearch={onSearch}/>
         <Cards characters={characters} onClose={onClose}/>
      </div>
   );
}

export default App;
