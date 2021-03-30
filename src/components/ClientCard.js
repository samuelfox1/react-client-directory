import React from "react";
import ClientCardTop from "./ClientCardTop";
import ClientCardBody from "./ClientCardBody";

export default function UserCard({ client, id, handleDelete, country }) {
    return (
        <div className="client-card">
            <ClientCardTop client={client} />

            <hr />
            <ClientCardBody client={client} country={country} />

            <button className="delete-client" onClick={() => handleDelete(id)}>
                delete
      </button>
        </div>
    );
}