### Project

This project is an API built using Node.js, Typescript, Prisma, SQLite.

The API simulates the functionality of a a social-media backend like twitter. Users can register themselves into the app, and send tweets.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/williamasjr/SocialMedia-backend.git
```

## Usage

1. Start the application with npm run dev.

## API Endpoints
The API provides the following endpoints:

For endpoint to USERS.

```markdown
GET /user - Retrieve a list of all users.

GET /user/:id - Retrieve a specific user by ID.

POST /user - Register a new user.

PUT /user/:id - Update a specific user by ID.

DELETE /user/:id - Delete a specific user by ID.
```

For endpoint to Tweets.

```markdown
GET /tweet - Retrieve a list of all tweets.

GET /tweet/:id - Retrieve a specific tweet by ID.

POST /tweet - Register a new tweet.

PUT /tweet/:id - Update a specific tweet by ID.

DELETE /tweet/:id - Delete a specific tweet by ID.
```


