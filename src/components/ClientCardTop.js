import React from "react";

export default function UserCardTop({ client }) {
    return (
        <>
            <div className="client-image-container">
                <img className="client-image" src={client.picture.large} alt="client" />
                {/* would show system id# here. Since were using the randomuser.me api, client id's are not consistent, in this example they are replaced with uuid's for consistency */}
                {/* <p className="client-id">
          <span className="client-data-label">id: </span>
          {client.id.value ? client.id.value : " n/a"}
        </p> */}
            </div>
        </>
    );
}