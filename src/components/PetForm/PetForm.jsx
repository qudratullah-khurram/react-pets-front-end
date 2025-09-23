// src/components/PetForm/PetForm.jsx

import { useState } from 'react';

const PetForm = (props) => {
// src/components/PetForm/PetForm.jsx

  const initialState = {
    name: "",
    age: "",
    breed: "",
  }
  // If pet data has been passed as props, we set formData as that pet object.
  // Otherwise, we can assume this is a new pet form and use the empty
  // initialState object.
  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  )



  // handleChange function to update formData state.
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };
 

 // src/components/PetForm.jsx

   const handleSubmit = (evt) => {
     evt.preventDefault();
     if (props.selected) {
       // Don't forget to pass both formData and the ._id!
       props.handleUpdatePet(formData, props.selected._id);
     } else {
       props.handleAddPet(formData);
     }
   };

  // And finally, the form itself.
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="age"> Age </label>
        <input
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <label htmlFor="breed"> Breed </label>
        <input
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
       
 </form>
      <form onSubmit={handleSubmit}>
        {/* Code for form inputs here */}
        <button type="submit">
          {props.selected ? 'Update Pet' : 'Add New Pet'}
        </button>
      </form>

    </div>
  );
};

export default PetForm;
