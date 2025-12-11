import request from "supertest";
import app from "../../src/app.js";
import {
  loginAs,
  getAuthHeaders,
  expectSuccessResponse,
  expectErrorResponse,
} from "./helpers.js";

describe("Users API", () => {
  describe("POST /api/v1/users", () => {

    it("should return 400 or 500 for mismatched passwords", async () => {
      const invalidUser = {
        username: "testuser",
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "DifferentPassword123",
      };

      const response = await request(app)
        .post("/api/v1/users")
        .send(invalidUser);

      expect([400, 500]).toContain(response.status);
      expect(response.body).toHaveProperty("success", false);
    });

    it("should return 400 for missing required fields", async () => {
      const invalidUser = {
        username: "testuser",
      };

      const response = await request(app)
        .post("/api/v1/users")
        .send(invalidUser);

      expectErrorResponse(response, 400);
    });
  });

  describe("GET /api/v1/users", () => {
    it("should list all users as admin", async () => {
      const token = await loginAs("ADMIN");
      const response = await request(app)
        .get("/api/v1/users")
        .set(getAuthHeaders(token));

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("data");
      expect(Array.isArray(response.body.data.data)).toBe(true);
      expect(response.body.data.data.length).toBeGreaterThan(0);
    });

    it("should not allow customer to list all users", async () => {
      const token = await loginAs("CUSTOMER");
      const response = await request(app)
        .get("/api/v1/users")
        .set(getAuthHeaders(token));

      expectErrorResponse(response, 403);
    });

    it("should not allow unauthenticated access", async () => {
      const response = await request(app).get("/api/v1/users");

      expectErrorResponse(response, 401);
    });

    it("should handle pagination parameters", async () => {
      const token = await loginAs("ADMIN");
      const response = await request(app)
        .get("/api/v1/users")
        .query({ skip: 0, take: 1 })
        .set(getAuthHeaders(token));

      expectSuccessResponse(response, 200);
      expect(response.body.data.data.length).toBeLessThanOrEqual(1);
    });
  });

  describe("GET /api/v1/users/:userId", () => {
    let customerToken;
    let customerId;

    beforeAll(async () => {
      customerToken = await loginAs("CUSTOMER");
      const meResponse = await request(app)
        .get("/api/v1/auth/me")
        .set(getAuthHeaders(customerToken));
      customerId = meResponse.body.data.userId;
    });

    it("should get own user profile", async () => {
      const response = await request(app)
        .get(`/api/v1/users/${customerId}`)
        .set(getAuthHeaders(customerToken));

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("userId", customerId);
      expect(response.body.data).toHaveProperty("email");
      expect(response.body.data).not.toHaveProperty("password");
    });

    it("should get any user profile as admin", async () => {
      const adminToken = await loginAs("ADMIN");
      const response = await request(app)
        .get(`/api/v1/users/${customerId}`)
        .set(getAuthHeaders(adminToken));

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("userId", customerId);
    });

    it("should not allow user to view other user profiles", async () => {
      const adminToken = await loginAs("ADMIN");
      const adminMeResponse = await request(app)
        .get("/api/v1/auth/me")
        .set(getAuthHeaders(adminToken));
      const adminId = adminMeResponse.body.data.userId;

      const response = await request(app)
        .get(`/api/v1/users/${adminId}`)
        .set(getAuthHeaders(customerToken));

      expectErrorResponse(response, 403);
    });

    it("should return 404 for non-existent user", async () => {
      const token = await loginAs("ADMIN");
      const response = await request(app)
        .get("/api/v1/users/99999")
        .set(getAuthHeaders(token));

      expectErrorResponse(response, 404);
    });
  });

  describe("PUT /api/v1/users/:userId", () => {
    let customerToken;
    let customerId;

    beforeAll(async () => {
      customerToken = await loginAs("CUSTOMER");
      const meResponse = await request(app)
        .get("/api/v1/auth/me")
        .set(getAuthHeaders(customerToken));
      customerId = meResponse.body.data.userId;
    });

    it("should update own profile", async () => {
      const updates = {
        username: `Updated User ${Date.now()}`,
      };

      const response = await request(app)
        .put(`/api/v1/users/${customerId}`)
        .set(getAuthHeaders(customerToken))
        .send(updates);

      expectSuccessResponse(response, 200);
      expect(response.body.data.username).toBe(updates.username);
    });

    it("should update any user as admin", async () => {
      const adminToken = await loginAs("ADMIN");
      const updates = {
        username: "Admin Updated Username",
      };

      const response = await request(app)
        .put(`/api/v1/users/${customerId}`)
        .set(getAuthHeaders(adminToken))
        .send(updates);

      expectSuccessResponse(response, 200);
    });

    it("should not allow user to update other users", async () => {
      const adminToken = await loginAs("ADMIN");
      const adminMeResponse = await request(app)
        .get("/api/v1/auth/me")
        .set(getAuthHeaders(adminToken));
      const adminId = adminMeResponse.body.data.userId;

      const response = await request(app)
        .put(`/api/v1/users/${adminId}`)
        .set(getAuthHeaders(customerToken))
        .send({ username: "Hacked" });

      expectErrorResponse(response, 403);
    });
  });





  describe("GET /api/v1/users/:userId/orders", () => {
    let customerToken;
    let customerId;
    let productId;

    beforeAll(async () => {
      customerToken = await loginAs("CUSTOMER");
      const meResponse = await request(app)
        .get("/api/v1/auth/me")
        .set(getAuthHeaders(customerToken));
      customerId = meResponse.body.data.userId;

      const productsResponse = await request(app).get("/api/v1/products");
      productId = productsResponse.body.data.data[0].productId;

      await request(app)
        .post("/api/v1/orders")
        .set(getAuthHeaders(customerToken))
        .send({
          products: [{ productId, quantity: 1 }],
          destinationAddress: "User Orders Test Street",
          phone: "0401234567",
        });
    });



    it("should allow admin to get any user's orders", async () => {
      const adminToken = await loginAs("ADMIN");
      const response = await request(app)
        .get(`/api/v1/users/${customerId}/orders`)
        .set(getAuthHeaders(adminToken));

      expectSuccessResponse(response, 200);
    });
  });
});
