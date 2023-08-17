import './App.css';
import Nav from './components/Nav';
import About from './components/About';
import Detail from './components/Detail';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Form from './components/Form';

const EMAIL= "a@a.com";
const PASSWORD="123456";

function App() {

   //useLocation para renderizado condicional
   let location = useLocation();
   // useNavigate para cuando el usuario ingresa correctamente email y password lo redirija al home
   let navigate = useNavigate()

   //Estado de funciones
   const [characters, setCharacters] = useState([])
   const [character, setCharacter] = useState({})
   const [access, setAccess] = useState(false)
   
   //Declaraciones de useState
   useEffect(()=>{console.log(location)},[location])
   useEffect(() => {
      !access && navigate('/');
   }, [access]);

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
   
   //Función login
   function login({email, password}) {
      if(email===EMAIL && password===PASSWORD) {
         setAccess(true)
         navigate("/home")
      }    
   }


   //Lo que se renderiza en pantalla es lo que esta dentro de return
   return (
      <div className='App'>
         {location.pathname !== "/" && <Nav onSearch={onSearch}/>}
         <Routes>
            <Route path='/' element={<Form login={login}/>}>
            </Route>
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
