import React, { useEffect } from "react";

export default function SearchForm({
    search,
    setSearch,
    clientData,
    defaultDisplayed,
    setDisplayedClients
}) {
    const displayCopy = defaultDisplayed;

    // when search input changes
    // filter clients that match search and update state for displayed clients
    // if no search data but there are clients, display all clients
    useEffect(() => {
        if (search) {
            const filterdClients = displayCopy.filter((client) => {
                const name = `${client.name.first.toLowerCase()} ${client.name.last.toLowerCase()}`;
                if (name.includes(search)) return client;
                return null;
            });
            setDisplayedClients(filterdClients);
        } else if (clientData.length > 1) setDisplayedClients(displayCopy);
    }, [search]);

    // setup controlled search inputs so search state always matches text for search input
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <form className="col d-flex">
                <input
                    className="form-control me-2"
                    value={search}
                    name="search"
                    type="search"
                    onChange={handleSearch}
                    placeholder="Search Employee"
                    aria-label="Search Employee"
                />
            </form>
            <h3>Search by first or last name</h3>
        </>
    );
}