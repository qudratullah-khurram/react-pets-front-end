import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/PetList/PetList';
import PetDetail from './components/PetDetail/PetDetail';
import PetForm from './components/PetForm/PetForm';

const App = () => {
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState (null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Create a new useEffect
  useEffect(() => {
    // Create a new async function
    const fetchPets = async () => {
      try {
      // Call on the pet service's index function
      const fetchedPets = await petService.index();
      if (fetchedPets.err) {
        throw new Error(fetchedPets.err)
      }
      // Set pets state to the returned pets data
       setPets(fetchedPets);
      } catch (err) {
        // Log the error object
        console.log(err);
      }
    };
    fetchPets();
  }, []);

const handleSelect = (pet) => {
  setSelected (pet)
}
 const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  
  const handleAddPet = async (formData) => {
    try {
    const newPet = await petService.create(formData);
     if (newPet.err) {
      throw new Error(newPet.err);
    }
    setPets([newPet, ...pets]);
    setIsFormOpen (false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <PetList
        pets={pets}
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
       {isFormOpen ? (
        <PetForm handleAddPet={handleAddPet} />
      ) : (
        <PetDetail selected={selected} />
      )}
    </>
  );


};

export default App;