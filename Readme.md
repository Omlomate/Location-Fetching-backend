
# Location Tracking API

## Endpoints

### 1. User Registration
**POST** `/api/auth/register`

- Request Body:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password",
    "isAdmin": true
  }
  ```
- Response:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### 2. User Login
**POST** `/api/auth/login`

- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
- Response:
  ```json
  {
    "token": "JWT_TOKEN",
    "userId": "USER_ID",
    "isAdmin": true
  }
  ```

### 3. Get All Registered Users (Admin)
**GET** `/api/admin/users`

- Protected route for admins only. Returns all registered non-admin users.
- Response:
  ```json
  [
    {
      "_id": "USER_ID",
      "name": "User Name",
      "email": "user@example.com",
      "isAdmin": false
    }
  ]
  ```

### 4. Get Location Logs for User
**GET** `/api/admin/location-logs/:userId`

- Parameters:
  - `userId`: The ID of the user whose location logs you want to fetch.
- Response:
  ```json
  {
    "lastLogin": "TIMESTAMP",
    "location": "LOCATION",
    "logs": [
      {
        "_id": "LOG_ID",
        "userId": "USER_ID",
        "timestamp": "TIMESTAMP",
        "location": "LOCATION",
        "isSuccess": true
      }
    ]
  }
  ```

### 5. Get Latest Location for User
**GET** `/api/admin/location/:userId`

- Parameters:
  - `userId`: The ID of the user whose latest location you want to fetch.
- Response:
  ```json
  {
    "latitude": "LATITUDE",
    "longitude": "LONGITUDE",
    "timestamp": "TIMESTAMP"
  }
  ```

### 6. Get Login Logs for User
**GET** `/api/admin/login-logs/:userId`

- Parameters:
  - `userId`: The ID of the user whose login logs you want to fetch.
- Response:
  ```json
  {
    "data": [
      {
        "_id": "LOG_ID",
        "userId": "USER_ID",
        "timestamp": "TIMESTAMP",
        "location": "LOCATION",
        "isSuccess": true
      }
    ]
  }
  ```

### 7. Update User Location
**POST** `/api/location`

- Request Body:
  ```json
  {
    "userId": "USER_ID",
    "latitude": "LATITUDE",
    "longitude": "LONGITUDE"
  }
  ```
- Response:
  ```json
  {
    "message": "Location updated successfully",
    "location": {
      "_id": "LOCATION_ID",
      "userId": "USER_ID",
      "latitude": "LATITUDE",
      "longitude": "LONGITUDE",
      "timestamp": "TIMESTAMP"
    }
  }
  ```

## Error Responses

- **500 Internal Server Error**: Indicates that something went wrong on the server side.
- **400 Bad Request**: Indicates invalid or missing data in the request body.
- **404 Not Found**: Indicates that a resource could not be found (e.g., user or location).
- **403 Forbidden**: Indicates that the user does not have permission to access the resource.

## Dependencies

- express
- mongoose
- cors
- body-parser
- dotenv
- bcrypt
- jsonwebtoken
- request-ip
- geoip-lite

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up your `.env` file with necessary environment variables:
   - `MONGO_URI`: Your MongoDB URI
   - `JWT_SECRET`: Your JWT secret

4. Start the server:
   ```bash
   npm start
   ```

