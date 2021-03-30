import axios from "axios";

// API keys should always be handled server side as they can not be secured on client side.
// this one is free so not too concerned for this use 🤷‍♂️
const APIKEY = "5fb601afb9ee3cc974379d932b3c5bea";

const weather = {
    getCurrent: (location) => {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${APIKEY}`
                )
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

export default weather;