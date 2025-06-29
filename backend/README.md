# Backend API Documentation

## User Registration Endpoint

### POST `/users/register`

Registers a new user in the system.

#### Description
This endpoint creates a new user account with the provided information. The password is automatically hashed using bcrypt before storing in the database. Upon successful registration, a JWT authentication token is generated and returned along with the user data.

#### Request Body

The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Field Requirements

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `fullname.firstname` | String | Yes | Minimum 3 characters |
| `fullname.lastname` | String | Yes | Minimum 3 characters |
| `email` | String | Yes | Valid email format, minimum 5 characters, must be unique |
| `password` | String | Yes | Minimum 6 characters |

#### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response Examples

##### Success Response (201 Created)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY4YTFiMmMzZDRlNWY2YTdiOGM5ZDAiLCJpYXQiOjE3MzQ1Njg5MjB9.example",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

##### Error Response Examples

###### 1. Validation Error - Short First Name (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "Jo",
      "msg": "FirstName must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

###### 2. Validation Error - Invalid Email (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

###### 3. Validation Error - Short Password (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 character long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

###### 4. Multiple Validation Errors (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "Jo",
      "msg": "FirstName must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 character long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

###### 5. Missing Required Fields (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "All fields are required",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

###### 6. Duplicate Email Error (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "john.doe@example.com",
      "msg": "Email already exists",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### Status Codes

| Status Code | Description |
|-------------|-------------|
| 201 | User successfully created |
| 400 | Validation error or missing required fields |
| 500 | Internal server error |

#### Validation Rules

- **First Name**: Must be at least 3 characters long
- **Last Name**: Must be at least 3 characters long  
- **Email**: Must be a valid email format and at least 5 characters long
- **Password**: Must be at least 6 characters long
- **Email Uniqueness**: Email must be unique in the database

#### Notes

- The password is automatically hashed using bcrypt with a salt rounds of 10
- A JWT token is generated using the user's `_id` and `JWT_SECRET` environment variable
- The password field is excluded from the response (`select: false` in schema)
- The `socketId` field is optional and defaults to `null` 

## User Login Endpoint

### POST `/users/login`

Authenticates a user and returns a JWT token for subsequent API access.

#### Description
This endpoint validates user credentials and authenticates them into the system. Upon successful authentication, a JWT authentication token is generated and returned along with the user data. The password is compared against the hashed password stored in the database.

#### Request Body

The request body should be a JSON object with the following structure:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Field Requirements

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `email` | String | Yes | Valid email format |
| `password` | String | Yes | Minimum 6 characters |

#### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response Examples

##### Success Response (200 OK)

```json
{
  "message": "Login Succesfully ✅",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY4YTFiMmMzZDRlNWY2YTdiOGM5ZDAiLCJpYXQiOjE3MzQ1Njg5MjB9.example",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

##### Error Response Examples

###### 1. Validation Error - Invalid Email (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

###### 2. Validation Error - Short Password (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

###### 3. Multiple Validation Errors (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

###### 4. Authentication Error - Invalid Credentials (401 Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

#### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | User successfully authenticated |
| 400 | Validation error or missing required fields |
| 401 | Invalid email or password |
| 500 | Internal server error |

#### Validation Rules

- **Email**: Must be a valid email format
- **Password**: Must be at least 6 characters long

#### Authentication Process

1. **Email Validation**: Checks if the provided email format is valid
2. **Password Validation**: Ensures password meets minimum length requirement
3. **User Lookup**: Searches for user with the provided email address
4. **Password Comparison**: Compares the provided password with the hashed password stored in the database
5. **Token Generation**: If authentication succeeds, generates a JWT token using the user's `_id`

#### Security Features

- **Password Hashing**: Passwords are compared against bcrypt-hashed values
- **Generic Error Messages**: Returns the same error message for both invalid email and invalid password to prevent user enumeration attacks
- **JWT Token**: Secure authentication token for subsequent API requests

#### Notes

- The password field is temporarily selected from the database for comparison (`select('+password')`)
- A JWT token is generated using the user's `_id` and `JWT_SECRET` environment variable
- The password field is excluded from the response (`select: false` in schema)
- The `socketId` field is optional and defaults to `null` 

## User Profile Endpoint

### GET `/users/profile`

Retrieves the current authenticated user's profile information.

#### Description
This endpoint returns the profile information of the currently authenticated user. The user must be authenticated with a valid JWT token to access this endpoint. The user information is extracted from the JWT token and returned in the response.

#### Authentication
This endpoint requires authentication. Include the JWT token in the request headers or cookies.

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

OR

```
Cookie: token=<jwt_token>
```

#### Example Request

```bash
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY4YTFiMmMzZDRlNWY2YTdiOGM5ZDAiLCJpYXQiOjE3MzQ1Njg5MjB9.example
```

#### Response Examples

##### Success Response (200 OK)

```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

##### Error Response Examples

###### 1. Authentication Error - Missing Token (401 Unauthorized)

```json
{
  "message": "Access denied. No token provided."
}
```

###### 2. Authentication Error - Invalid Token (401 Unauthorized)

```json
{
  "message": "Invalid token."
}
```

###### 3. Authentication Error - Expired Token (401 Unauthorized)

```json
{
  "message": "Token expired."
}
```

#### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | User profile successfully retrieved |
| 401 | Authentication error (missing, invalid, or expired token) |
| 500 | Internal server error |

#### Notes

- The user information is extracted from the JWT token payload
- The password field is excluded from the response (`select: false` in schema)
- The `socketId` field is optional and defaults to `null`
- This endpoint is protected by the `authMiddleware.authUser` middleware

## User Logout Endpoint

### GET `/users/logout`

Logs out the current authenticated user and invalidates their JWT token.

#### Description
This endpoint logs out the currently authenticated user by clearing the authentication cookie and adding the JWT token to a blacklist to prevent its reuse. The user must be authenticated with a valid JWT token to access this endpoint.

#### Authentication
This endpoint requires authentication. Include the JWT token in the request headers or cookies.

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

OR

```
Cookie: token=<jwt_token>
```

#### Example Request

```bash
GET /users/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY4YTFiMmMzZDRlNWY2YTdiOGM5ZDAiLCJpYXQiOjE3MzQ1Njg5MjB9.example
```

#### Response Examples

##### Success Response (200 OK)

```json
{
  "message": "Logged out"
}
```

##### Error Response Examples

###### 1. Authentication Error - Missing Token (401 Unauthorized)

```json
{
  "message": "Access denied. No token provided."
}
```

###### 2. Authentication Error - Invalid Token (401 Unauthorized)

```json
{
  "message": "Invalid token."
}
```

###### 3. Authentication Error - Expired Token (401 Unauthorized)

```json
{
  "message": "Token expired."
}
```

#### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | User successfully logged out |
| 401 | Authentication error (missing, invalid, or expired token) |
| 500 | Internal server error |

#### Logout Process

1. **Token Extraction**: Extracts the JWT token from either the Authorization header or cookies
2. **Cookie Clearing**: Clears the authentication cookie from the response
3. **Token Blacklisting**: Adds the token to a blacklist to prevent its reuse
4. **Response**: Returns a success message confirming logout

#### Security Features

- **Token Blacklisting**: Invalidates the JWT token by adding it to a blacklist
- **Cookie Clearing**: Removes the authentication cookie from the client
- **Dual Token Support**: Accepts tokens from both Authorization header and cookies
- **Authentication Required**: Ensures only authenticated users can logout

#### Notes

- The token is extracted from either the Authorization header (`Bearer <token>`) or cookies (`token=<token>`)
- The token is added to a blacklist to prevent reuse even if it hasn't expired
- This endpoint is protected by the `authMiddleware.authUser` middleware
- The logout process is secure and prevents token reuse attacks

## Captain Registration Endpoint

### POST `/captains/register`

Registers a new captain (driver) in the system.

#### Description
This endpoint creates a new captain account with the provided information, including vehicle details. The password is automatically hashed before storing in the database. Upon successful registration, a JWT authentication token is generated and returned along with the captain data.

#### Request Body

The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": 1,
    "vehicleType": "car" // or "motorcycle", "auto"
  }
}
```

#### Field Requirements

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `fullname.firstname` | String | Yes | Minimum 3 characters |
| `fullname.lastname` | String | Yes | Minimum 3 characters |
| `email` | String | Yes | Valid email format, must be unique |
| `password` | String | Yes | Minimum 6 characters |
| `vehicle.color` | String | Yes | Minimum 3 characters |
| `vehicle.plate` | String | Yes | Minimum 3 characters |
| `vehicle.capacity` | Integer | Yes | Minimum 1 |
| `vehicle.vehicleType` | String | Yes | Must be one of: car, motorcycle, auto |

#### Example Request

```json
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securepass123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Response Examples

##### Success Response (201 Created)

```json
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

##### Error Response Examples

###### 1. Validation Error - Short First Name (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "Al",
      "msg": "Firstname must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

###### 2. Validation Error - Invalid Email (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Please enter a valid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

###### 3. Validation Error - Short Password (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

###### 4. Validation Error - Invalid Vehicle Type (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "truck",
      "msg": "Vehicle type must be car, motorcycle, or auto",
      "path": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

###### 5. Multiple Validation Errors (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "Al",
      "msg": "Firstname must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "truck",
      "msg": "Vehicle type must be car, motorcycle, or auto",
      "path": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

#### Status Codes

| Status Code | Description |
|-------------|-------------|
| 201 | Captain successfully created |
| 400 | Validation error or missing required fields |
| 500 | Internal server error |

#### Validation Rules

- **First Name**: Must be at least 3 characters long
- **Last Name**: Must be at least 3 characters long
- **Email**: Must be a valid email format and unique
- **Password**: Must be at least 6 characters long
- **Vehicle Color**: Must be at least 3 characters long
- **Vehicle Plate**: Must be at least 3 characters long
- **Vehicle Capacity**: Must be at least 1
- **Vehicle Type**: Must be one of: car, motorcycle, auto

#### Notes

- The password is automatically hashed before storing in the database
- A JWT token is generated using the captain's `_id` and `JWT_SECRET` environment variable
- The password field is excluded from the response
- The endpoint validates all required fields and vehicle details