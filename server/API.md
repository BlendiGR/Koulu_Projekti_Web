# API Documentation

## Overview

Quick navigation:

- [Common for all endpoints](#common-for-all-endpoints)
- [Auth](#auth)
- [Users](#users)
- [Products](#products)
- [Orders](#orders)
- [Reviews](#reviews)

### Endpoint summary

| Method | Path                        | Description                  | Auth                       |
|--------|-----------------------------|------------------------------|----------------------------|
| POST   | /api/v1/auth/login          | Login, get JWT and user info | Public                     |
| POST   | /api/v1/users               | Register new user            | Public                     |
| GET    | /api/v1/users               | List users                   | Admin                      |
| GET    | /api/v1/users/:userId       | Get user details             | Owner or Admin             |
| PATCH  | /api/v1/users/:userId       | Update user                  | Owner or Admin             |
| DELETE | /api/v1/users/:userId       | Delete/deactivate user       | Owner or Admin             |
| GET    | /api/v1/products            | List products                | Public                     |
| GET    | /api/v1/products/:productId | Get product                  | Public                     |
| POST   | /api/v1/products            | Create product               | Admin                      |
| PATCH  | /api/v1/products/:productId | Update product               | Admin                      |
| DELETE | /api/v1/products/:productId | Delete product               | Admin                      |
| POST   | /api/v1/orders              | Create order                 | Authenticated user         |
| GET    | /api/v1/orders              | List orders                  | Authenticated user / Admin |
| GET    | /api/v1/orders/:orderId     | Get order details            | Owner or Admin             |
| PATCH  | /api/v1/orders/:orderId     | Update order                 | Owner or Admin             |
| DELETE | /api/v1/orders/:orderId     | Cancel/delete order          | Owner or Admin             |
| GET    | /api/v1/reviews             | List reviews                 | Public                     |
| GET    | /api/v1/reviews/:reviewId   | Get review                   | Public                     |
| POST   | /api/v1/reviews             | Create review                | Authenticated user         |
| PATCH  | /api/v1/reviews/:reviewId   | Update review                | Owner or Admin             |
| DELETE | /api/v1/reviews/:reviewId   | Delete review                | Owner or Admin             |

## Common for all endpoints

Base URL (server): `/api/v1`

All resource URLs below are relative to `/api/v1`.

### Headers

- `Content-Type: application/json` (for requests with a body)
- `Authorization: Bearer <jwt_token>` (required where specified)

### Standard response format

#### Success

```json
{
  "success": true,
  "data": {}
}
```

#### Error

```json
{
  "success": false,
  "error": {
    "code": "string_error_code",
    "message": "Human-readable message",
    "details": "Optional extra info",
    "stack": "Only present in development"
  }
}
```

### General rules

- IDs in paths: positive integers, e.g. `/users/1`
- Unknown query parameters: `400 Bad Request`
- If validation fails: `400 Bad Request` with details

**Auth roles:**

- `CUSTOMER`: regular user
- `ADMIN`: admin role

**Ownership rules:**

Many routes use authorization middleware:

- `OWNER`: the authenticated user is acting on their own resource
- `ADMIN`: can access / modify any resource
- Where "Owner or Admin" is mentioned, a valid `Authorization` header is required

---

## Auth

### `POST /api/v1/auth/login`

Authenticate and receive JWT + basic user info.

**Auth:** Not required.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "string_minimum_length_? "
}
```

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "token": "jwt_token_string",
    "user": {
      "userId": 1,
      "username": "JohnDoe",
      "role": "CUSTOMER",
      "email": "user@example.com",
      "isActive": true,
      "createdAt": "2025-01-01T12:00:00.000Z"
    }
  }
}
```

**Common errors:**

- `401 Unauthorized` – invalid credentials
- `400 Bad Request` – validation error

---

## Users

**Base:** `/api/v1/users`

### `POST /api/v1/users`

Create a new user (register).

**Auth:** Not required.

**Body:**

```json
{
  "username": "JohnDoe",
  "email": "user@example.com",
  "password": "string",
  "confirmPassword": "string",
  "role": "CUSTOMER"
}
```

**Notes:**

- `role` is typically `"CUSTOMER"`. Admin creation may be restricted in backend.

**Success `201`:**

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "username": "JohnDoe",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "isActive": true,
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

### `GET /api/v1/users`

List all users.

**Auth:** Admin only.

**Query params (optional):**

- `skip`: number (default likely `1`)
- `take`: number (default e.g. `10` or `20`)

Example:

```text
/api/v1/users?skip=1&take=20
```

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "userId": 1,
        "username": "JohnDoe",
        "email": "user@example.com",
        "role": "CUSTOMER",
        "isActive": true,
        "createdAt": "2025-01-01T12:00:00.000Z"
      }
    ]
  }
}
```

---

### `GET /api/v1/users/:userId`

Get user details.

**Auth:** Owner or Admin.

**Path params:**

- `userId`: integer

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "username": "JohnDoe",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "isActive": true,
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

**Errors:**

- `403 Forbidden` – if user is not owner and not admin
- `404 Not Found` – if user does not exist

---

### `PATCH /api/v1/users/:userId`

Update user fields.

**Auth:** Owner or Admin.

**Path params:**

- `userId`: integer

**Body (any subset):**

```json
{
  "username": "NewName",
  "email": "new@example.com",
  "password": "newPassword",
  "confirmPassword": "newPassword",
  "role": "ADMIN",
  "isActive": false
}
```

**Notes:**

- Normal users typically can update their own `username`, `email`, and password.
- `role` or `isActive` are likely restricted to `ADMIN` in backend.

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "userId": 1,
    "username": "NewName",
    "email": "new@example.com",
    "role": "CUSTOMER",
    "isActive": true,
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

### `DELETE /api/v1/users/:userId`

Delete or deactivate a user.

**Auth:** Owner or Admin (admin can delete any).

**Path params:**

- `userId`: integer

**Success `200` / `204` (depending on implementation):**

Example:

```json
{
  "success": true,
  "data": null
}
```

**Errors:**

- `403 Forbidden` – if not owner or admin
- `404 Not Found` – if user does not exist

---

## Products

**Base:** `/api/v1/products`

### `GET /api/v1/products`

List products.

**Auth:** Not required.

**Query params (optional):**

- `skip`: number
- `take`: number
- `search`: string (e.g. name or description)
- `minPrice`: number
- `maxPrice`: number
- `category`: string
- `orderBy`: string (e.g. `"price"`, `"createdAt"`)
- `orderDir`: `"asc"` or `"desc"`

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "productId": 1,
        "name": "Product name",
        "description": "Product description",
        "price": 19.99,
        "stock": 100,
        "category": "Category name",
        "createdAt": "2025-01-01T12:00:00.000Z"
      }
    ]
  }
}
```

---

### `GET /api/v1/products/:productId`

Get a single product.

**Auth:** Not required.

**Path params:**

- `productId`: integer

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "productId": 1,
    "name": "Product name",
    "description": "Product description",
    "price": 19.99,
    "stock": 100,
    "category": "Category name",
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

### `POST /api/v1/products`

Create a product.

**Auth:** Admin only.

**Body:**

```json
{
  "name": "Product name",
  "description": "Product description",
  "price": 19.99,
  "stock": 100,
  "category": "Category name"
}
```

**Success `201`:**

```json
{
  "success": true,
  "data": {
    "productId": 1,
    "name": "Product name",
    "description": "Product description",
    "price": 19.99,
    "stock": 100,
    "category": "Category name",
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

### `PATCH /api/v1/products/:productId`

Update a product.

**Auth:** Admin only.

**Path params:**

- `productId`: integer

**Body (any subset):**

```json
{
  "name": "New name",
  "description": "New description",
  "price": 24.99,
  "stock": 50,
  "category": "New category"
}
```

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "productId": 1,
    "name": "New name",
    "description": "New description",
    "price": 24.99,
    "stock": 50,
    "category": "New category",
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

### `DELETE /api/v1/products/:productId`

Delete a product.

**Auth:** Admin only.

**Path params:**

- `productId`: integer

**Success `200` / `204`:**

```json
{
  "success": true,
  "data": null
}
```

---

## Orders

**Base:** `/api/v1/orders`

Authorization middleware is applied so that **only the order owner or an admin** can access or modify a specific order. Some list endpoints may be admin-only.

### `POST /api/v1/orders`

Create an order for the authenticated user.

**Auth:** Required (`CUSTOMER` or `ADMIN`).

**Body:**

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ],
  "shippingAddress": "Street 1, City, Country",
  "billingAddress": "Street 1, City, Country",
  "notes": "Optional comment"
}
```

**Notes:**

- `items` must be non-empty.
- Each `productId` must exist, and `quantity` must be positive.

**Success `201`:**

```json
{
  "success": true,
  "data": {
    "orderId": 1,
    "userId": 1,
    "status": "PENDING",
    "items": [
      {
        "orderItemId": 1,
        "productId": 1,
        "name": "Product name",
        "price": 19.99,
        "quantity": 2
      }
    ],
    "shippingAddress": "Street 1, City, Country",
    "billingAddress": "Street 1, City, Country",
    "notes": "Optional comment",
    "total": 39.98,
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

### `GET /api/v1/orders`

List orders.

**Auth:**

- For `CUSTOMER`: returns only their own orders.
- For `ADMIN`: may return all orders.

**Query params (optional):**

- `skip`: number
- `take`: number
- `status`: `"PENDING" | "PAID" | "SHIPPED" | "CANCELLED"`

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "orderId": 1,
        "userId": 1,
        "status": "PENDING",
        "total": 39.98,
        "createdAt": "2025-01-01T12:00:00.000Z"
      }
    ]
  }
}
```

---

### `GET /api/v1/orders/:orderId`

Get order details.

**Auth:** Owner or Admin (authorization middleware attached).

**Path params:**

- `orderId`: integer

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "orderId": 1,
    "userId": 1,
    "status": "PENDING",
    "items": [
      {
        "orderItemId": 1,
        "productId": 1,
        "name": "Product name",
        "price": 19.99,
        "quantity": 2
      }
    ],
    "shippingAddress": "Street 1, City, Country",
    "billingAddress": "Street 1, City, Country",
    "notes": "Optional comment",
    "total": 39.98,
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

**Errors:**

- `403 Forbidden` – if not owner or admin
- `404 Not Found` – if order does not exist

---

### `PATCH /api/v1/orders/:orderId`

Update an order.

Typical use-cases:

- Owner: update addresses or notes while `status` is still `PENDING`.
- Admin: update `status`.

**Auth:** Owner or Admin (authorization middleware attached).

**Path params:**

- `orderId`: integer

**Body (any subset, depending on role):**

```json
{
  "shippingAddress": "New shipping address",
  "billingAddress": "New billing address",
  "notes": "Updated note",
  "status": "PAID"
}
```

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "orderId": 1,
    "userId": 1,
    "status": "PAID",
    "items": [
      {
        "orderItemId": 1,
        "productId": 1,
        "name": "Product name",
        "price": 19.99,
        "quantity": 2
      }
    ],
    "shippingAddress": "New shipping address",
    "billingAddress": "New billing address",
    "notes": "Updated note",
    "total": 39.98,
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

### `DELETE /api/v1/orders/:orderId`

Cancel or delete an order.

**Auth:** Owner or Admin (authorization middleware attached).

**Path params:**

- `orderId`: integer

**Success `200` / `204`:**

```json
{
  "success": true,
  "data": null
}
```

---

## Reviews

**Base:** `/api/v1/reviews`

Typically, customers create reviews for products they purchased. Admins can manage all reviews.

### `GET /api/v1/reviews`

List reviews.

**Auth:** Not required (assuming public reviews).

**Query params (optional):**

- `productId`: integer (filter reviews for one product)
- `userId`: integer (filter reviews from a user; may require auth)
- `skip`: number
- `take`: number

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "reviewId": 1,
        "productId": 1,
        "userId": 1,
        "rating": 5,
        "title": "Great product",
        "comment": "Very happy with this",
        "createdAt": "2025-01-01T12:00:00.000Z"
      }
    ]
  }
}
```

---

### `GET /api/v1/reviews/:reviewId`

Get a single review.

**Auth:** Not required.

**Path params:**

- `reviewId`: integer

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "reviewId": 1,
    "productId": 1,
    "userId": 1,
    "rating": 5,
    "title": "Great product",
    "comment": "Very happy with this",
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

### `POST /api/v1/reviews`

Create a review.

**Auth:** Required (`CUSTOMER` or `ADMIN`).

**Body:**

```json
{
  "productId": 1,
  "rating": 4,
  "title": "Good product",
  "comment": "Some text"
}
```

**Notes:**

- `rating`: integer (e.g. `1–5`)
- Backend may check that user bought the product.

**Success `201`:**

```json
{
  "success": true,
  "data": {
    "reviewId": 1,
    "productId": 1,
    "userId": 1,
    "rating": 4,
    "title": "Good product",
    "comment": "Some text",
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

### `PATCH /api/v1/reviews/:reviewId`

Update a review.

**Auth:** Review owner or Admin.

**Path params:**

- `reviewId`: integer

**Body (any subset):**

```json
{
  "rating": 5,
  "title": "Updated title",
  "comment": "Updated comment"
}
```

**Success `200`:**

```json
{
  "success": true,
  "data": {
    "reviewId": 1,
    "productId": 1,
    "userId": 1,
    "rating": 5,
    "title": "Updated title",
    "comment": "Updated comment",
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

---

### `DELETE /api/v1/reviews/:reviewId`

Delete a review.

**Auth:** Review owner or Admin.

**Path params:**

- `reviewId`: integer

**Success `200` / `204`:**

```json
{
  "success": true,
  "data": null
}
```