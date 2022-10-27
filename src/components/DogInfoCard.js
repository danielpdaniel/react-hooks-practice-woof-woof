import react from "react";

function DogInfoCard({ dog, onGoodBadDog }){
const { name, image, isGoodDog} = dog

function handleClick(){
    onGoodBadDog(dog)
}

return (
    <>
    <img src={image} alt={name}/>
    <h2>{name}</h2>
    <button onClick={handleClick}>{isGoodDog ? "Good Dog" : "Bad Dog"}</button>
    </>
)
}

export default DogInfoCard