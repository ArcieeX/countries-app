import  { useState, useEffect } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',

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
    setFormData({ name: '', email: '', message: '' });
    localStorage.setItem("profile", JSON.stringify(formData));
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      {user ? ( <h2>Welcome {user}</h2> ) : ( 
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
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#FFFFFF' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', background: '#7672ce' }}>
          Submit
        </button>
      </form>
  )};
    </div>
  );
};

export default Form;
