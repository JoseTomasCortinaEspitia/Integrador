import './App.css';
import Nav from './components/Nav';
import About from './components/About';
import Detail from './components/Detail';
import Home from './components/Home';
import { useState } from 'react';
import axios from "axios";
import { Routes, Route } from 'react-router-dom';

function App() {
   
   //Estado de funciones
   const [characters, setCharacters] = useState([])
   const [character, setCharacter] = useState({})
   
   //Función onClose
   const onClose = (id) => {
      const filtered = characters.filter((char)=> char.id !== id)
      setCharacters(filtered)
   } 

   //Función onSearch
   function onSearch(id, string="all") {
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         if (data.name) {
            if(string !=="all"){
               setCharacter(data);
            }else{
               setCharacters((oldChars) => [data, ...oldChars]);
            }   
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
         <Routes>
            <Route path='/home' element={<Home characters={characters} onClose={onClose}/>}>
            </Route>
            <Route path='/about' element={<About/>}>
            </Route>
            <Route path='/detail/:id' element={<Detail character={character} onSearch={onSearch} onClose={onClose}/>}>
            </Route>
         </Routes>
      </div>
   );
}

export default App;
