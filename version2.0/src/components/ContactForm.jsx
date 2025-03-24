import  { useState, useEffect } from 'react';
import { Text ,Button } from "@chakra-ui/react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',

  });
  const [user, setUser] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  useEffect(() => {
    if(localStorage.getItem("profile")){
    let profileInfo = JSON.parse(localStorage.getItem("profile")) ;
      setUser(profileInfo.name);
    }
    },[]);
    

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Clear the form
    setFormData({ name: '', email: '', bio: '' });
    localStorage.setItem("profile", JSON.stringify(formData));
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      {user ? ( <Text fontWeight="bold" >Welcome {user}</Text> ) : ( 
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#FFFFFF' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#FFFFFF' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.message}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#FFFFFF' }}
            required
          />
        </div>
        <Button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', background: '#7672ce' }}>
          Submit
        </Button>
      </form>
  )}
    </div>
  );
};

export default Form;

