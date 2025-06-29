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