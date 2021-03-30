import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import ClientCard from "../components/ClientCard";
import countries from "../utils/APIs/countries";
import weather from "../utils/APIs/weather";
import SearchForm from "../components/SearchForm";

export default function ({
    search,
    setSearch,
    clientData,
    handleDelete,
    displayedClients,
    setDisplayedClients,
    clientsByLocation,
    setClientsByLocation
}) {
    const { country } = useParams(); // grab the country name from url parameters
    const [redirectPage, setRedirectPage] = useState(""); // used to redirect page if needed
    const [locationData, setLocationData] = useState({}); // data from country api call
    const [weatherData, setWeatherData] = useState({}); // data from weather api call

    // when the country variable updates
    // make api call to get country data
    // make api call to get weather data for country
    // find clients from the same country
    useEffect(() => {
        clearSearch();
        getCountryData();
        getWeatherData();
        getClientsBlLocation();
    }, [country]);

    // redirects user to home page
    const handleHome = () => {
        clearSearch();
        setRedirectPage(<Redirect to="/" />);
    };

    const clearSearch = () => {
        if (search) setSearch("");
    };

    // make api call and save data object to state
    const getCountryData = () => {
        countries
            .getCountry(country)
            .then((response) => {
                const data = response.data[0];
                setLocationData({
                    flag: data.flag,
                    flagImageAltTitle: `${country} flag`,
                    capital: data.capital,
                    population: data.population,
                    languages: data.languages,
                    timezones: data.timezones
                });
            })
            .catch((err) => console.log("country error", err)); // if theres an error
    };

    // make api call and save data object to state
    const getWeatherData = () => {
        weather
            .getCurrent(country)
            .then((response) => {
                const weatherObj = {
                    icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`, // icon url to match current weather conditions
                    temp: `${Math.floor(response.data.main.temp)} °F`, // round down to whole number
                    wind: `${Math.floor(response.data.wind.speed)} mph` // round down to whole number
                };
                setWeatherData(weatherObj);
            })
            .catch((err) => console.log("weather error", err)); // if theres an error
    };

    // find clients form the same country and update state
    const getClientsBlLocation = () => {
        const locationMatch = clientData.filter((client) => {
            return client.location.country.toLowerCase() === country.toLowerCase();
        });
        setDisplayedClients(locationMatch);
        setClientsByLocation(locationMatch);
    };

    return (
        <>
            {/* if there are no clients, return home (page refresh) */}
            {displayedClients.length === 0 ? <Redirect to="/" /> : null}
            <h1>{country}</h1>
            {/* redirect to home when button is clicked  */}
            <button onClick={handleHome}>home</button>
            {redirectPage}
            <hr />
            {/* component to search for users by name */}
            <SearchForm
                search={search}
                setSearch={setSearch}
                clientData={clientData}
                defaultDisplayed={clientsByLocation}
                setDisplayedClients={setDisplayedClients}
            />
            <div className="client-container">
                {/* if location data has loaded, display data, if not display 'loading' text */}
                {locationData && weatherData ? (
                    <div className="location-data-top">
                        <div>
                            <img
                                src={locationData.flag}
                                width="200"
                                alt={locationData.flagImageAltTitle}
                                className="location-image"
                            />
                            <br />
                        </div>
                        <h3 className="weather-item">Current Weather</h3>
                        <div className="weather-data">
                            <img
                                src={weatherData.icon}
                                alt="weather icon"
                                className="weather-icon"
                            />
                            <p className="weather-item">
                                <span className="client-data-label">Temp:</span>{" "}
                                {weatherData.temp}
                            </p>
                            <p className="weather-item">
                                <span className="client-data-label">Wind:</span>{" "}
                                {weatherData.wind}
                            </p>
                        </div>
                        <div>
                            <hr />
                            <div className="location-data-bottom">
                                <p>
                                    <span className="client-data-label">Language(s):</span>{" "}
                                    {locationData.languages //  if data, display data text, else display 'n/a' text
                                        ? locationData.languages.map(
                                            (
                                                language,
                                                index // map through array of languages
                                            ) =>
                                                locationData.languages.length - 1 === index
                                                    ? language.name // if last or only index position, print language text
                                                    : `${language.name}, ` // if multiple languages, seperate text with a comma and space
                                        )
                                        : "n/a"}
                                </p>
                                <p>
                                    <span className="client-data-label">Capital City:</span>{" "}
                                    {locationData.capital}
                                </p>
                                <p>
                                    <span className="client-data-label">Population:</span>{" "}
                                    {locationData.population}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h3>loading</h3>
                )}
            </div>
            <br />
            <div className="client-container">
                {/* display client data to the page */}
                {displayedClients.map((client, index) => {
                    return (
                        <ClientCard
                            key={index}
                            client={client}
                            country={country}
                            id={client.id.value}
                            handleDelete={handleDelete}
                        />
                    );
                })}
            </div>
        </>
    );
}