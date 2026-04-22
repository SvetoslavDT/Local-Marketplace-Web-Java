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
| `DELETE` | /api/vendors/{id}        | Delete vendor (owner or admin)    |

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
| `category` | String  | Filter products by category           | category=handMade|
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

***

### Cart

| Method   | Endpoint             | Action                  |
| -------- |:--------------------:| :------------------------|
| `GET`    | /api/users/me/cart            | Get current user's cart |
| `POST`   | /api/users/me/cart/items      | Add item to cart        |
| `PUT`    | /api/users/me/cart/items/{id} | Update item quantity    |
| `DELETE` | /api/users/me/cart/items/{id} | Remove item from cart   |
| `DELETE` | /api/users/me/cart            | Clear cart              |

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

### Reviews

| Method   | Endpoint                                  | Action                          |
| -------- |:-----------------------------------------:| :-------------------------------|
| `GET`    | /api/products/{productId}/reviews         | Get reviews for product         |
| `POST`   | /api/products/{productId}/reviews         | Submit product review           |
| `PUT`    | /api/reviews/{id}                         | Update own review               |
| `DELETE` | /api/reviews/{id}                         | Delete review (author or admin) |
| `GET`    | /api/vendors/{vendorId}/reviews           | Get reviews for vendor          |
| `POST`   | /api/vendors/{vendorId}/reviews           | Submit vendor review            |

### Craft Fairs

| Method   | Endpoint                                 | Action                     |
| -------- |:----------------------------------------:| :--------------------------|
| `GET`    | /api/craft-fairs                         | Get all craft fairs        |
| `GET`    | /api/craft-fairs/{id}                    | Get a craft fair by ID     |
| `POST`   | /api/craft-fairs                         | Create craft fair (admin)  |
| `PUT`    | /api/craft-fairs/{id}                    | Update craft fair (admin)  |
| `DELETE` | /api/craft-fairs/{id}                    | Cancel craft fair (admin)  |
| `GET`    | /api/craft-fairs/{id}/vendors            | List participating vendors |
| `POST`   | /api/craft-fairs/{id}/vendors            | Vendor joins craft fair    |
| `DELETE` | /api/craft-fairs/{id}/vendors/{vendorId} | Vendor leaves craft fair   |

***

### Promotions

| Method   | Endpoint                           | Action                          |
| -------- |:----------------------------------:| :-------------------------------|
| `GET`    | /api/promotions                    | Get all active promotions       |
| `GET`    | /api/promotions/{id}               | Get a promotion by ID           |
| `POST`   | /api/vendors/{vendorId}/promotions | Create promotion (vendor)       |
| `PUT`    | /api/promotions/{id}               | Update promotion (vendor)       |
| `DELETE` | /api/promotions/{id}               | End promotion (vendor or admin) |

***

### Stories

| Method   | Endpoint                        | Action                         |
| -------- |:-------------------------------:| :------------------------------|
| `GET`    | /api/vendors/{vendorId}/stories | Get stories by vendor          |
| `POST`   | /api/vendors/{vendorId}/stories | Add story (vendor)             |
| `PUT`    | /api/stories/{id}               | Update story (vendor)          |
| `DELETE` | /api/stories/{id}               | Delete story (vendor or admin) |

***

## Structured DB

<img width="1024" height="1536" alt="schema" src="https://github.com/user-attachments/assets/fe9c87b9-4a1f-4694-8ca5-13c807bd2f05" />
