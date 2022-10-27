import React, {useEffect, useState} from "react";
import FilterButtons from "./FilterButtons";
import DogInfoCard from "./DogInfoCard";

// App
// |-filterdogs
// |-dogCard

function App() {
  const [doggies, setDoggies] = useState(false)
  const [allDoggies, setAllDoggies] = useState(false)
  const [selectedDoggie, setSelectedDoggie] = useState(false)
  const [filterStatus, setFilterStatus] = useState(false)

  useEffect(()=>{
    fetch("http://localhost:3001/pups")
    .then(r=>r.json())
    .then(data=>{
      setDoggies(data); 
      setAllDoggies(data)
    })
  }, [])

  function handleDogClick(doggie){
    setSelectedDoggie(doggie)
  }

  function handleGoodBadDog(dog){
    // console.log(dog)
    // const newDog = {...dog, isGoodDog: !dog.isGoodDog}
    // setSelectedDoggie(newDog)

    fetch(`http://localhost:3001/pups/${dog.id}`, {
      method: "PATCH",
      headers:
      {"Content-Type": "application/json"},
      body: JSON.stringify({...dog, isGoodDog: !dog.isGoodDog})
    })
    .then(r=>r.json())
    .then(data=>{
      const newDoggies = doggies.map(dog => dog.id === data.id ? data : dog)
      setDoggies(newDoggies)
      setSelectedDoggie(data)
    })
  }

  function handleFilterClick(){
    setFilterStatus(filterStatus=>!filterStatus)
    // const filteredDoggies = allDoggies.filter(dog => dog.isGoodDog) 
    // setDoggies(filteredDoggies)
  };

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={handleFilterClick} id="good-dog-filter">Filter good dogs: {filterStatus ? "ON" : "OFF"}</button>
      </div>
      <div id="dog-bar">
        {doggies ? doggies.map(dog => <FilterButtons key={dog.id} dog={dog} onClick={handleDogClick} filterStatus={filterStatus}/>) : <p>Loading...</p>}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {selectedDoggie ? <DogInfoCard dog={selectedDoggie} onGoodBadDog={handleGoodBadDog}/> : null}
        </div>
      </div>

    </div>
  );
}

export default App;
