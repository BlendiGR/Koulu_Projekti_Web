import request from "supertest";
import app from "../../src/app.js";
import {
  loginAs,
  getAuthHeaders,
  expectSuccessResponse,
  expectErrorResponse,
} from "./helpers.js";

describe("Products API", () => {
  describe("GET /api/v1/products", () => {
    it("should list all products without authentication", async () => {
      const response = await request(app).get("/api/v1/products");

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("data");
      expect(Array.isArray(response.body.data.data)).toBe(true);
      expect(response.body.data.data.length).toBeGreaterThan(0);
    });

    it("should return products with correct structure", async () => {
      const response = await request(app).get("/api/v1/products");

      expectSuccessResponse(response, 200);
      const product = response.body.data.data[0];
      expect(product).toHaveProperty("productId");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("cost");
      expect(product).toHaveProperty("type");
    });

    it("should filter products by type", async () => {
      const response = await request(app)
        .get("/api/v1/products")
        .query({ type: "FOOD" });

      expectSuccessResponse(response, 200);
      expect(response.body.data.data.every((p) => p.type === "FOOD")).toBe(true);
    });

    it("should handle pagination parameters", async () => {
      const response = await request(app)
        .get("/api/v1/products")
        .query({ skip: 0, take: 2 });

      expectSuccessResponse(response, 200);
      expect(response.body.data.data.length).toBeLessThanOrEqual(2);
    });
  });

  describe("GET /api/v1/products/:productId", () => {
    it("should return 400 for invalid product ID", async () => {
      const response = await request(app).get("/api/v1/products/invalid");

      expectErrorResponse(response, 400);
    });
  });

  describe("POST /api/v1/products", () => {
    it("should not allow customer to create product", async () => {
      const token = await loginAs("CUSTOMER");
      const newProduct = {
        name: "Unauthorized Product",
        type: "FOOD",
        cost: 9.99,
      };

      const response = await request(app)
        .post("/api/v1/products")
        .set(getAuthHeaders(token))
        .send(newProduct);

      expectErrorResponse(response, 403);
    });

    it("should not allow unauthenticated user to create product", async () => {
      const newProduct = {
        name: "Unauthenticated Product",
        type: "FOOD",
        cost: 9.99,
      };

      const response = await request(app)
        .post("/api/v1/products")
        .send(newProduct);

      expectErrorResponse(response, 401);
    });

    it("should return 400 for missing required fields", async () => {
      const token = await loginAs("ADMIN");
      const invalidProduct = {
        name: "Incomplete Product",
        // missing type and cost
      };

      const response = await request(app)
        .post("/api/v1/products")
        .set(getAuthHeaders(token))
        .send(invalidProduct);

      expectErrorResponse(response, 400);
    });
  });

  describe("PUT /api/v1/products/:productId", () => {
    it("should not allow customer to update product", async () => {
      const token = await loginAs("CUSTOMER");
      const updates = { name: "Unauthorized Update" };

      const response = await request(app)
        .put("/api/v1/products/1")
        .set(getAuthHeaders(token))
        .send(updates);

      expectErrorResponse(response, 403);
    });
  });

  describe("DELETE /api/v1/products/:productId", () => {
    it("should not allow customer to delete product", async () => {
      const token = await loginAs("CUSTOMER");
      const response = await request(app)
        .delete("/api/v1/products/1")
        .set(getAuthHeaders(token));

      expectErrorResponse(response, 403);
    });
  });
});
