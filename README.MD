# Jobs API

A small, self-contained README for the Jobs API project.

## Project Overview
A RESTful API to manage job listings (create, read, update, delete). This repository currently contains Git metadata and project prompts; add application code into the repository root alongside this README.

## Features
- List jobs
- Get job details
- Create new jobs
- Update existing jobs
- Delete jobs

## Tech / Stack (example)
- Node.js + Express / Swagger UI / REST framework
- MongoDB 
- Docker (optional)
#### Security

- helmet
- cors
- xss-clean
- express-rate-limit
```
## Prerequisites
- Install Node.js
- Database server MongoDB

## Installation (example for Node.js)
1. Clone the repo
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file with required environment variables (see below).

## Environment variables (example)
- PORT=3000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_super_secret_key
- Run the server:

## Running

```bash
npm start
```

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

- you can test all of the endpoints in Swagger UI "localhost:3000/api-docs"


## Contributing
- Open an issue to discuss features/bugs
- Send a pull request with descriptive commit messages and tests

## License
Specify a license (e.g., MIT) or add one to the repository.

---
