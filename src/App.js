import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AllClients from "./Pages/AllClients";
import Locations from "./Pages/Locations";
import "./style.css";
import user from "./APIs/user";

function App() {
  const [search, setSearch] = useState(""); // search form inputs
  const [clientData, setClientData] = useState([]); // client data master list
  const [clientsByLocation, setClientsByLocation] = useState([]); // clients filtered by location master list
  const [displayedClients, setDisplayedClients] = useState([]); // clients displayed to page

  // delete a user
  // takes in an id argument
  // updates clientData and displayedClients with all clients who dont match the id
  const handleDelete = (id) => {
    if (!id) return; // if no id, exit function
    const filterClients = (list, id) => {
      const filteredClients = list.filter((client) => {
        if (client.id.value !== id) return client;
        return null;
      });
      return filteredClients;
    };
    const filteredClients = filterClients(clientData, id);
    const filteredDisplayed = filterClients(displayedClients, id);
    setClientData(filteredClients);
    setDisplayedClients(filteredDisplayed);
  };

  // on component mounting
  // if no client data is present, make api call to get client data
  // sort the client data by first name
  // set clientData and displayecClients to sorted data from api call
  useEffect(() => {
    if (clientData.length === 0) {
      user
        .getRandomUserNames()
        .then((response) => {
          const clients = response.data.results;
          clients.map((client) => {
            // update United States to be United States of America for country & weather api call accuracy
            if (client.location.country.toLowerCase() === "united states") {
              client.location.country += " of America";
            }
            return (client.id.value = uuidv4());
          });
          const sortedClients = clients.sort((a, b) => {
            a = a.name.first.toLowerCase();
            b = b.name.first.toLowerCase();
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
          });
          setClientData(sortedClients);
          setDisplayedClients(sortedClients);
        })
        .catch((err) => console.log("random users error", err));
    }
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/:country">
          {" "}
          {/* location route to display all clients if exact path is found*/}
          <Locations
            handleDelete={handleDelete}
            clientData={clientData}
            search={search}
            setSearch={setSearch}
            clientsByLocation={clientsByLocation}
            setClientsByLocation={setClientsByLocation}
            displayedClients={displayedClients}
            setDisplayedClients={setDisplayedClients}
          />
        </Route>
        <Route path="/">
          {/* home route to display all clients*/}
          {
            <AllClients
              handleDelete={handleDelete}
              clientData={clientData}
              search={search}
              setSearch={setSearch}
              displayedClients={displayedClients}
              setDisplayedClients={setDisplayedClients}
            />
          }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
