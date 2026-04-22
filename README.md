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

### Vendors

| Method   | Endpoint                 | Action                            |
| -------- |:------------------------:| :----------------------------------|
| `GET`    | /api/vendors             | Get all vendors                   |
| `GET`    | /api/vendors/{id}        | Get a vendor by ID                |
| `POST`   | /api/vendors             | Create vendor profile             |
| `PUT`    | /api/vendors/{id}        | Update vendor (owner or admin)    |
| `PATCH`  | /api/vendors/{id}/status | Approve or suspend vendor (admin) |
| `DELETE` | /api/vendors/{id}        | Delete vendor (owner or admin)    |

***

### Categories

| Method   | Endpoint             | Action                  |
| -------- |:--------------------:| :------------------------|
| `GET`    | /api/categories      | Get all categories      |
| `GET`    | /api/categories/{id} | Get a category by ID    |
| `POST`   | /api/categories      | Create category (admin) |
| `PUT`    | /api/categories/{id} | Update category (admin) |
| `DELETE` | /api/categories/{id} | Delete category (admin) |

***

### Products

| Method   | Endpoint                         | Action                           |
| -------- | :------------------------------: | :--------------------------------|
| `GET`    | /api/products                    | Get all products                 |
| `GET`    | /api/products/{id}               | Get product by ID                |
| `GET`    | /api/vendors/{vendorId}/products | Get all products by vendor       |
| `POST`   | /api/products                    | Create a new product             |
| `PUT`    | /api/products/{id}               | Update a product                 |
| `DELETE` | /api/products/{id}               | Delete a product                 |

#### Query Parameters for GET /api/products

| Parameter  | Type    | Description                           | Example          |
|------------|---------|---------------------------------------|------------------|
| `type`     | String  | Filter products by product type       | type=JEWELRY     |
| `minPrice` | Number  | Minimum price filter                  | minPrice=10      |
| `maxPrice` | Number  | Maximum price filter                  | maxPrice=100     |
| `location` | String  | Filter products by artisan location   | location=Plovdiv |
| `search`   | String  | Search by product name or description | search=ring      |

***

### Inventory

| Method  | Endpoint                                    | Action                        |
| ------- |:-------------------------------------------:| :-----------------------------|
| `GET`   | /api/products/{id}/inventory                | Get stock level for product   |
| `PATCH` | /api/products/{id}/inventory                | Adjust stock (vendor)         |
| `GET`   | /api/vendors/{vendorId}/inventory           | Inventory overview for vendor |
| `GET`   | /api/vendors/{vendorId}/inventory/low-stock | Items below stock threshold   |

***

### Cart

| Method   | Endpoint             | Action                  |
| -------- |:--------------------:| :------------------------|
| `GET`    | /api/cart            | Get current user's cart |
| `POST`   | /api/cart/items      | Add item to cart        |
| `PUT`    | /api/cart/items/{id} | Update item quantity    |
| `DELETE` | /api/cart/items/{id} | Remove item from cart   |
| `DELETE` | /api/cart            | Clear cart              |

***

### Orders

| Method   | Endpoint                       | Action                             |
| -------- |:------------------------------:| :----------------------------------|
| `GET`    | /api/orders                    | Get all orders (admin)             |
| `GET`    | /api/orders/{id}               | Get an order by ID                 |
| `POST`   | /api/orders                    | Place order from cart              |
| `PATCH`  | /api/orders/{id}/status        | Update order status (vendor/admin) |
| `PATCH`  | /api/orders/{id}/cancel        | Cancel order (customer or vendor)  |
| `GET`    | /api/users/me/orders           | Get my orders (customer)           |
| `GET`    | /api/vendors/{vendorId}/orders | Get orders for vendor              |

***

### Payments

| Method | Endpoint                       | Action                         |
| ------ |:------------------------------:| :------------------------------|
| `POST` | /api/orders/{orderId}/payments | Initiate payment for order     |
| `GET`  | /api/payments/{id}             | Get payment details            |
| `POST` | /api/payments/{id}/refund      | Issue refund (vendor or admin) |

***