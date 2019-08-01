# Restaurants Review Platform

The project specifications can be found in: https://www.cs.bgu.ac.il/~majeek/atd/192/assignments/3/.

## Our Design:
We created a component for each page in the App. Each of these components is responsible for rendering the right data using other react components we created. The routing between the pages is done using React-Router. All the UI design is done using material-ui framework. We implemented all the required features as written in the project description.

###### Reducers & Sagas:
We have 5 reducers and 5 sagas:
1.	Session reducer/saga – responsible for all the requests and actions related to the session implementation (sign in, sign up, sign       out).  
2.	Profile reducer/saga – responsible for all the requests and actions related to the user profile (showing and updating user profile).
3.	Search reducer/saga – responsible for all the requests and actions related to the search abilities (search user or restaurant by         some criteria).
4.	Restaurants reducer/saga – responsible for all the requests related to the restaurant page (showing all the restaurants details).
5.	Review reducer/saga - responsible for all the requests related to displaying and modifying reviews.

###### Our Models:
1.	User model – contains all the information about users (username, full name, etc.). Adding a user document is performed upon sign up.     Validating log in credentials is performed against this model. Username is unique and used as a key. All of the fields in the model     are required except for Full name.
2.	Restaurant model – contains all the information about restaurants (name, location, etc.). Restaurant name is unique and used as a       key. All of the fields in the model are required.
3.	Review model – contains all the information about the reviews (author, score, etc.). The review model contains Username and             Restaurant, connecting between the different models. Adding a review to the DB is performed upon adding a restaurant review. When       such occurs, the average score of the review is calculated, and the restaurant total score is updated accordingly.
•	We also have a schema representing location, containing the name, the latitude and the longitude of the city.
 
###### Extra libraries:
•	cookie-parser - used for setting and reading cookies for session implementation.
•	jsonwebtoken - used for encoding and decoding session token.
•	bcrypt – used for encrypting and decrypting user’s password
•	react-select – used for auto complete implementation
•	cities – a json containing cities and their latitude and longitude for the location info.
•	geolib – used for computing the distance between 2 cities.
•	material-ui-dropzone – used for uploading pictures using drag and drop or selecting a file.
•	query-string – used for handling query parameters.
•	react-router-dom – used for dynamic routing of the Application.

###### Extra Features:
•	The ability to search restaurants by cuisine type .
•	The ability to search users by more than one criteria.
•	The ability to search users and restaurants together by some string appearing in the username/restaurant name.
•	Disabling the ability to sort by closer better search when no user is connected.
•	Adding a default picture for users who didn’t upload a picture while signing up.

###### Flow example:
Most of the requests in the system goes through the following cycle:
Component -> Saga -> Server -> Saga -> Reducer (Store)-> Component.

Updating user’s profile:
When a user profile page is loaded, a check is performed to determine if the requesting user is the user whose profile is viewed. If so, the fields showing the user’s username and location are displayed editable and a ‘save changes’ button is displayed. The check is done as follows:
*	When the profile page is loaded a request for getting the user’s details from the database is submitted from the profile page           component.
*	This request goes to the profile saga, who communicates with the server, sending a get request for the specified user details.
*	The request goes through a middleware to determine whether or not the details should be editable.
*	The sever search the relevant user document in the database and sends it back to the saga.
*	When receiving the server response, the saga dispatches a new action for the profile reducer to perform with the data sent from the     server.
*	The profile reducer updates the store with all the details from the server and also a field - editable, which controls the edit         abilities in the react component.
*	After the reducer updates the store the page is re-rendered, and all the details of the user appear on the screen.
*	If a user is viewing his own profile, he can edit his username, location and submitted reviews.
*	When the user changes the username/location field, the profile reducer updates the store with these new values.
*	When the user clicks the save changes button, a request is submitted to the profile saga with the new username or location, to update   the user profile details in the DB.
*	The profile saga sends a post request to the server, containing the new details, asking to update the user’s details in the database.
*	The server performs the update.
*	The saga dispatches a new action, to update the session username in the store, for the use of other components as well.
*	After the reducer updates the username in the store the page is rendered again, and the new name appears on the screen.


to run the app:

1. Clone this repo
2. `npm install`
1. start mongodb using `mongod`
2. `node src\server\server.js` # backend
3. `npm run dev` # frontend.
