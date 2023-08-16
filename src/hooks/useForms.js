import { useEffect, useState } from "react";



export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);
  
 
    
 

    const onInputChange = (event) => {
      const { name, value } = event.target;
      setFormState((prevFormState) => ({
        ...prevFormState,
        [name]: value,
      }));
    };
  
    const setInitialForm = () => {
      setFormState(initialForm);
    };


  
      
  
    return {
      ...formState,
      setInitialForm,
      onInputChange,
    };
  };



