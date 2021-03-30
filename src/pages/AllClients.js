import React from "react";
import ClientCard from "../components/ClientCard";
import SearchForm from "../components/SearchForm";

function AllClients({
  search,
  setSearch,
  clientData,
  handleDelete,
  displayedClients,
  setDisplayedClients
}) {
  return (
    <>
      <main className="App">
        <h1>Client Directory</h1>
        <hr />
        <p>Check out the <a href="https://github.com/samuelfox1/react-client-directory" className="repo" target="about_blank">repo</a> on GitHub</p>
        {/* component to search for users by name */}
        <SearchForm
          search={search}
          setSearch={setSearch}
          clientData={clientData}
          defaultDisplayed={clientData}
          setDisplayedClients={setDisplayedClients}
        />
        <h6>
          *Select a location to see country data and other clients from the
          country.
        </h6>
        <div className="client-container">
          {/* if theres client data, display client data */}
          {displayedClients.length >= 1 ? (
            displayedClients.map((client) => {
              return (
                <ClientCard
                  key={client.id.value}
                  client={client}
                  id={client.id.value}
                  handleDelete={handleDelete}
                />
              );
            })
          ) : search ? (
            // if theres no displayed clients form search query
            <h3>"{search}" not available</h3>
          ) : (
            // if client data is still loading
            <h3>"loading"</h3>
          )}
        </div>
      </main>
    </>
  );
}

export default AllClients;