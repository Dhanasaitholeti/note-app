# `Note App Server`

# Index.ts

## This is the main entry point of your application.

### Dependencies

- dotenv: Loads environment variables from a .env file.
- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- express: Web application framework for Node.js.
- body-parser: Middleware for parsing request bodies.
- mongoose: MongoDB object modeling tool.
  = Environment Variables

The application uses the dotenv package to load environment variables from a .env file.

### Configuration

- Import the required packages and modules.
- Load environment variables using dotenv.config().
- Set the port number for the server.
- Create an instance of the Express application.
- Apply middleware:
- cors: Enables Cross-Origin Resource Sharing.
- body-parser: Parses request bodies in JSON format.
- Connect to the MongoDB database using connectToDb() function.
- Set up the routes using RouteHandler(App).
- Apply the error handling middleware (errorHandler).
- Start the server and listen on the specified port.

# Database Models

## Note Model

This module defines the Mongoose schema and model for the "notes" collection in the MongoDB database.

### Dependencies

- mongoose: MongoDB object modeling tool.

### Schema

The schema defines the structure of a note document in the "notes" collection. It includes the following fields:

- title (String): The title of the note.
- content (String): The content of the note.
- createdUser (ObjectId): The ID of the user who created the note.
- createdAt (Date): The date and time when the note was created.
- modifiedAt (Date): The date and time when the note was last modified.

### Model

The model is created using mongoose.model() and represents the "notes" collection in the database. It provides an interface for interacting with the collection, such as creating, reading, updating, and deleting notes.

## User Model

This module defines the Mongoose schema and model for the "users" collection in the MongoDB database.

### Dependencies

- mongoose: MongoDB object modeling tool.

### Schema

The schema defines the structure of a user document in the "users" collection. It includes the following fields:

- name (String): The name of the user.
- email (String): The email address of the user.
- password_hash (String): The hashed password of the user.

### Model

The model is created using mongoose.model() and represents the "users" collection in the database. It provides an interface for interacting with the collection, such as creating, reading, updating, and deleting user documents.

# Middlewares

## Authentication Middleware

This middleware function is responsible for verifying the authentication token provided in the request headers and populating the req.userData object with user data if the token is valid.

## Middleware Function

The middleware function takes three arguments: req, res, and next. It performs the following steps:

1. Checks if the request headers contain the Authorization header and if it starts with the string "Bearer".
2. If the above condition is true, it extracts the token from the Authorization header.
3. Verifies the token using jwt.verify() and the provided JWT secret key (process.env.JWT_KEY).
4. Retrieves user data based on the email address (decoded.Email) using the getUserDataWithEmail() helper function.
5. Populates the req.userData object with the retrieved user data.
6. Calls the next() function to proceed to the next middleware or route handler.
7. If any error occurs during token verification or user data retrieval, it sends an appropriate error response.

### Dependencies

- jsonwebtoken: Library for generating and verifying JSON Web Tokens (JWT).
- express: Web application framework for Node.js.
- getUserDataWithEmail: A helper function to retrieve user data based on the email address.

### Interface

UserData: An interface representing the structure of user data. It includes the id, email, and name fields.

### Global Declaration

The Express.Request interface is extended to include a new property userData, which will hold the user data retrieved from the authentication token.

## Error Handler Middleware

1. This middleware function handles errors that occur during the request handling process.
2. Determines the status code to be sent in the response based on the statusCode property of the err object. If statusCode is not provided, it defaults to 500 (Internal Server Error).
3. If the error is a CastError, it sets the status code to 400 (Bad Request) and modifies the error message to indicate an invalid ID.
4. Sends a JSON response with the error message and the determined status code.

### Middleware Function

The middleware function takes four arguments: err, req, res, and \_next. It performs the following steps:

### Dependencies

- express: Web application framework for Node.js.
- ErrorWithStatusCode: Custom type representing an error with a specified status code.

# Route Handler (Routes)

### `RouteHandler(App: Application)`

A function that sets up the routes for your Express application.

**Parameters:**

- `App`: An instance of the Express `Application` class.

**Routes:**

- `GET /` - Returns a JSON response with a message indicating that it's from the server.
- `GET /user` - Forwards the request to the `userRoutes` router.
- `GET /note` - Forwards the request to the `noteRoutes` router after passing through the `authmiddleware` authentication middleware.

## Note Routes

The note routes handle CRUD (Create, Read, Update, Delete) operations for notes.

### `GET /`

Retrieves all notes.

### `GET /:id`

Retrieves a specific note by its ID.

### `POST /`

Creates a new note.

### `PUT /:id`

Updates a specific note by its ID.

### `DELETE /:id`

Deletes a specific note by its ID.

## User Routes

The user routes handle user authentication.

### `POST /signin`

Allows a user to sign in.

### `POST /signup`

Allows a user to sign up.

# controllers

## Note Controller

The note controller contains several functions for handling CRUD operations related to notes.

### Dependencies

- `express`: Web application framework for Node.js.
- `noteModel`: Model representing the note schema.
- `noteType`: Custom type representing the structure of a note.
- `ErrorWithStatusCode`: Custom type representing an error with a specified status code.
- `validateInputs`: Helper function for validating note inputs.

### Function: getAllNotes

Retrieves all notes from the database.

- Method: GET
- Route: `/notes`
- Returns: An array of notes
- Status Codes:
  - 200: Success
  - Other: Error

### Function: getNote

Retrieves a specific note based on the provided ID.

- Method: GET
- Route: `/notes/:id`
- Parameters:
  - `id`: The ID of the note to retrieve
- Returns: The requested note
- Status Codes:
  - 200: Success
  - 404: Note not found
  - Other: Error

### Function: createNote

Creates a new note.

- Method: POST
- Route: `/notes`
- Body Parameters:
  - `title`: The title of the note
  - `content`: The content of the note
- Returns: The newly created note
- Status Codes:
  - 201: Success
  - Other: Error

### Function: updateNote

Updates an existing note based on the provided ID.

- Method: PUT
- Route: `/notes/:id`
- Parameters:
  - `id`: The ID of the note to update
- Body Parameters:
  - `title`: The updated title of the note
  - `content`: The updated content of the note
- Returns: The updated note
- Status Codes:
  - 200: Success
  - 404: Note not found
  - Other: Error

### Function: deleteNote

Deletes an existing note based on the provided ID.

- Method: DELETE
- Route: `/notes/:id`
- Parameters:
  - `id`: The ID of the note to delete
- Returns: A success message
- Status Codes:
  - 200: Success
  - 404: Note not found
  - Other: Error

## User Controller

The user controller contains functions for user authentication and registration.

### Dependencies

- `express`: Web application framework for Node.js.
- `bcryptjs`: Library for hashing passwords.
- `getUserDataWithEmail`: Helper function to retrieve user data based on email.
- `tokenGenerator`: Helper function to generate a token.
- `userModel`: Model representing the user schema.
- `ErrorWithStatusCode`: Custom type representing an error with a specified status code.

### Function: userSignin

Authenticates a user and generates a token.

- Method: POST
- Route: `/signin`
- Body Parameters:
  - `email`: The email of the user
  - `password`: The password of the user
- Returns:
  - `token`: The generated token
  - `user`: User information (id, name, email)
- Status Codes:
  - 200: Success
  - 403: Invalid credentials
  - 404: Incorrect password
  - Other: Error

### Function: userSignup

Registers a new user.

- Method: POST
- Route: `/signup`
- Body Parameters:
  - `email`: The email of the user
  - `name`: The name of the user
  - `password`: The password of the user
- Returns: A success message
- Status Codes:
  - 201: Success
  - 400: Email already in use
  - Other: Error
