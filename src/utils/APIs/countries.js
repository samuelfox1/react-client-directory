import axios from "axios";

//documentation @https://restcountries.eu/
//feel free to add more functions!

const countries = {
    getCountry: (countryName) => {
        return new Promise((resolve, reject) => {
            axios
                .get("https://restcountries.eu/rest/v2/name/" + countryName)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    console.log("error", error);
                });
        });
    }
};

export default countries;