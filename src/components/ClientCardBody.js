import React from "react";
import { Link } from "react-router-dom";

export default function UserCarBody({ client, country }) {
    const email = `mailto:${client.email}`;
    const linkLocation = `/${client.location.country.toLowerCase()}`;
    return (
        <>
            <div>
                <h6 className="client-data-label">name</h6>
                <p className="client-data">
                    {client.name.first} {client.name.last}
                </p>
                {/* if country variable has data, from paramaters in "./Pages/Location.js", hide the link to  "/:country" url */}
                {!country ? (
                    <>
                        <h6 className="client-data-label">location</h6>
                        <Link to={linkLocation} className="client-data location-link">
                            {client.location.country}
                        </Link>
                    </>
                ) : null}

                <h6 className="client-data-label">email</h6>
                <a href={email} className="client-data">
                    {client.email}
                </a>
            </div>
        </>
    );
}