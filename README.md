# Local-Marketplace-Web-Java
Web application, which manages a local marketplace for handmade and artisan products. 




## REST Resources
### Authentication

| Method | Endpoint              | Action                    |
| ------ |:---------------------:| :-------------------------|
| `POST` | /auth/register        | Register a new user       |
| `POST` | /auth/login           | User login                |
| `POST` | /auth/logout          | User logout               |
| `POST` | /auth/forgot-password | Request to reset password |

***

### Users

| Method   | Endpoint        | Action                                           |
| -------- |:---------------:| :------------------------------------------------|
| `GET`    | /api/users      | Get all users (admin)                            |
| `GET`    | /api/users/{id} | Get a user by ID (admin)                         |
| `POST`   | /api/users      | Create user                                      |
| `PUT`    | /api/users/{id} | Update a user (amdin or logged in the same user) |
| `DELETE` | /api/users/{id} | Delete user (admin)                              |

***

### Query Parameters for GET /vendors

| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | Filter by product type |
| location | string | Filter by city / region |
| min_price | int | Min price |
| max_price | int | Max price |
| page | int | Page number (default: 0) |
| size | int | Page size (default: 20) |
