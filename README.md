======================= Client Requests ======================

Minimum Viable Product:

1. Build an SPA using at least 1 of the provided APIs beside user.js as a data source.
2. Add to state.
3. Remove from state.
4. Use props (add component files).
5. Create a search field that filters what is shown to the client.
6. Doesn’t have to be beautiful, but if you have a good css idea you’re welcome to go for it!

BONUS:

1. Use 2 or more of the API files
2. Add an additional API file.
3. Feel free to add features and functionality (having a search bar is just the minimum requirement).

Submit:

1. Copy the link for your forked sandbox and submit it to techteam@clubwealth.com.

========================= Application Workflow =======================

1. When a GET request is made to '/', an api GET request is made to "https://randomuser.me/api/?results=50" returning user data for 50 random clients.

2. The random clients are sorted alphabetically by first name and displayed to the page with data for:

   - profile picture
   - first and last name
   - country location in the form of a link
   - email address in the form of a link to send an email to the client
   - button to delete client

3. A search bar at the top allows a user to search for clients by first or last name.

4. When a client's country link is selected, the page is redirected to '/:country' where the ':country' parameter is accessed and passed into 2 custom api requests to:

   -"https://restcountries.eu/rest/v2/name/:country" returning general data for the country and saving to state.
   -"https://api.openweathermap.org/data/2.5/weather?q=:country&units=imperial&appid=APIKEY" (APIKEY provided in code for this example, but sensitive keys should always be handled server side for security), returning general weather data for the country and saved to state.

5. Country data is displayed to page as:

- image of flag
- icon resembling current general weather
- temperature in farenheight
- wind speed in m.p.h.
- Languagesd spoken in country
- Capital City
- Population

5. In addition to the country data, state for clientsByLocation is set, and state for displayedClients is updated to only hold clients from the same country.

6. The search bar at the top of this page is the same as the home page, allowing a user to search clients from the same country by first or last name.

7. When the home button is clicked, the user is taken back to the main page, state for displayedClients is updated and all clients are displayed again.

8. Anytime a client is deleted, state for clientData and displayedClients is updated to remove the client.

9. Client data that a user interacts with will stay the same until page is refreshed, or a new GET request is made to '/' again.

10. Website is responsive with a mobile first approach to accomodate all screen sizes.

Samuel Fox

- Portfolio - https://sjf-react-profile.herokuapp.com
- GitHub - https://github.com/samuelfox1
- LinkedIn - https://www.linkedin.com/in/samuel-fox-tacoma

March 2021
