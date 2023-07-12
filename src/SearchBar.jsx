import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const api = axios.create({
        baseURL: "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json",
        mode: "cors",
    });
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchText) {
                setLoading(true);
                fetch(
                    `http://localhost:2300/country`
                ).then((r) => {
                    return r.json()
                })

                    .then((response) => {
                        //(response);

                        const filteredCountries = response.filter((country) =>
                            country.country.toLowerCase().includes(searchText.toLowerCase())
                        );
                        //(filteredCountries)
                        setCountries(filteredCountries);
                        setLoading(false);
                    })
                    .catch((error) => {
                        //(error);
                        setLoading(false);
                    });
            } else {
                setCountries([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            // Enter key pressed
            if (countries.length > 0 && selectedIndex >= 0 && selectedIndex < 5) {
                const selectedCountry = countries[selectedIndex];
                // Redirect to the page with the country data
                window.location.href = `/country/${selectedCountry.name}`;
            }
        } else if (e.keyCode === 38) {
            // Up arrow key pressed
            setSelectedIndex((prevIndex) => {
                if (prevIndex === 0) {
                    setShowDropdown(false);
                    return prevIndex;
                } else {
                    return prevIndex - 1;
                }
            });
        } else if (e.keyCode === 40) {
            // Down arrow key pressed
            setSelectedIndex((prevIndex) => {
                if (prevIndex < countries.length - 1) {
                    return prevIndex + 1;
                } else if (prevIndex === 4 && countries.length > 5) {
                    setShowDropdown(true);
                    return prevIndex;
                } else {
                    return prevIndex;
                }
            });
        }
    };
    countries.map((r) => {
        //(r.country)
    })

    const handleCountryClick = (country) => {
        // Redirect to the page with the country data
        window.location.href = `/country/${country.name}`;
    };

    return (
        <div>
            <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for a country"
            />
            {loading && <div>Loading...</div>}
            {showDropdown && (
                <div className="dropdown">
                    {countries.map((country, index) => (
                        <div
                            key={country.country}
                            className={index === selectedIndex ? "selected" : ""}
                            onClick={() => handleCountryClick(country)}
                        >
                            {(country.country)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
