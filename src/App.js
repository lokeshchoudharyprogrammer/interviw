// import "./styles.css";
import React, { useState, useEffect } from 'react';
import "./App.css"
export default function App() {

  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  // const 

  const [countries, setCountries] = useState([]);
  const [text, setText] = useState()


  //(countries, "yes")
  //(text, "text")
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  useEffect(() => {
    fetch(
      `http://localhost:2300/country`
    ).then((r) => {
      return r.json()
    })

      .then((response) => {
        //(response);

        const filteredCountries = response.filter((country) =>
          country.country.toLowerCase().includes(text)
        );
        //(filteredCountries)
        setCountries(filteredCountries);

      })
      .catch((error) => {
        //(error);

      });

  }, [text])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };


  return (
    <div className='box'>
      <input type="text" onChange={(e) => setText(e.target.value)} placeholder='Search Country' />
      <div className="dropdown">
        <div className="dropdown-toggle" onClick={toggleDropdown}>
          {selectedOption ? selectedOption.label : 'Select an option'}
        </div>
        {isOpen && (
          <ul className="dropdown-menu">
            {countries.map((option) => (
              <li
                key={option.value}
                className="dropdown-item"
                onClick={() => selectOption(option)}
              >
                {option.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
