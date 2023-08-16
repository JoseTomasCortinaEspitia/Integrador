import { useEffect } from "react";
import { useParams } from "react-router-dom"
import Card from "./Card";

export default function Detail({character, onSearch, onClose}) {

    const {id} = useParams();

    useEffect(()=>{
        onSearch(id, "detail")
    }, [id]);

    return(
        <div>
            {character ? (
                <Card 
                key={character.id}
                character = {character}
                onClose = {null}/>
            ): (
                <h1>Paila, no hay!</h1>
            )}
            
        </div>
    )
}