import react from "react";
function FilterButtons({ dog, onClick, filterStatus }){
    const {name, isGoodDog} = dog

    function handleClick(){
        onClick(dog)
    }

    if(filterStatus){
        if(isGoodDog){
            return (<span onClick={handleClick}>{name}</span>)
        } else {return null}
    }else{
    return (
       <span onClick={handleClick}>{name}</span>
    )
    }
}
export default FilterButtons;