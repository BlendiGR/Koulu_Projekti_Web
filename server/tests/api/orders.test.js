import request from "supertest";
import app from "../../src/app.js";
import {
  loginAs,
  getAuthHeaders,
  expectSuccessResponse,
  expectErrorResponse,
} from "./helpers.js";

describe("Orders API", () => {
  describe("GET /api/v1/orders", () => {
    it("should list all orders as admin", async () => {
      const token = await loginAs("ADMIN");
      const response = await request(app)
        .get("/api/v1/orders")
        .set(getAuthHeaders(token));

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("data");
      expect(Array.isArray(response.body.data.data)).toBe(true);
    });

    it("should not allow customer to list all orders", async () => {
      const token = await loginAs("CUSTOMER");
      const response = await request(app)
        .get("/api/v1/orders")
        .set(getAuthHeaders(token));

      expectErrorResponse(response, 403);
    });

    it("should not allow unauthenticated access", async () => {
      const response = await request(app).get("/api/v1/orders");

      expectErrorResponse(response, 401);
    });
  });

  describe("POST /api/v1/orders", () => {
    it("should not create order without authentication", async () => {
      const orderData = {
        products: [{ productId: 1, quantity: 1 }],
        destinationAddress: "Unauthenticated Street",
        phone: "0401234567",
      };

      const response = await request(app)
        .post("/api/v1/orders")
        .send(orderData);

      expectErrorResponse(response, 401);
    });

    it("should return 400 for missing required fields", async () => {
      const token = await loginAs("CUSTOMER");
      const invalidOrder = {
        products: [{ productId: 1, quantity: 1 }],
        // missing destinationAddress
      };

      const response = await request(app)
        .post("/api/v1/orders")
        .set(getAuthHeaders(token))
        .send(invalidOrder);

      expectErrorResponse(response, 400);
    });

    it("should return 400 for empty products array", async () => {
      const token = await loginAs("CUSTOMER");
      const invalidOrder = {
        products: [],
        destinationAddress: "Test Street",
        phone: "0401234567",
      };

      const response = await request(app)
        .post("/api/v1/orders")
        .set(getAuthHeaders(token))
        .send(invalidOrder);

      expectErrorResponse(response, 400);
    });
  });
});
