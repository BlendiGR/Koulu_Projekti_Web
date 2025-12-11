import request from "supertest";
import app from "../../src/app.js";
import {
  loginAs,
  getAuthHeaders,
  expectSuccessResponse,
  expectErrorResponse,
  testUsers,
} from "./helpers.js";

describe("Auth API", () => {
  describe("POST /api/v1/auth/login", () => {
    it("should login successfully with valid admin credentials", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send(testUsers.ADMIN);

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("token");
      expect(response.body.data).toHaveProperty("user");
      expect(response.body.data.user.email).toBe(testUsers.ADMIN.email);
      expect(response.body.data.user.role).toBe("ADMIN");
    });

    it("should login successfully with valid customer credentials", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send(testUsers.CUSTOMER);

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("token");
      expect(response.body.data).toHaveProperty("user");
      expect(response.body.data.user.email).toBe(testUsers.CUSTOMER.email);
      expect(response.body.data.user.role).toBe("CUSTOMER");
    });

    it("should return 401 for invalid email", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "nonexistent@example.com",
          password: "password123",
        });

      expectErrorResponse(response, 401);
    });

    it("should return 401 for invalid password", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: testUsers.ADMIN.email,
          password: "wrongpassword",
        });

      expectErrorResponse(response, 401);
    });

    it("should return 400 for missing email", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          password: "password123",
        });

      expectErrorResponse(response, 400);
    });

    it("should return 400 for missing password", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: testUsers.ADMIN.email,
        });

      expectErrorResponse(response, 400);
    });
  });

  describe("GET /api/v1/auth/me", () => {
    it("should return current user profile when authenticated", async () => {
      const token = await loginAs("ADMIN");
      const response = await request(app)
        .get("/api/v1/auth/me")
        .set(getAuthHeaders(token));

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("userId");
      expect(response.body.data).toHaveProperty("email");
      expect(response.body.data).toHaveProperty("role");
      expect(response.body.data.email).toBe(testUsers.ADMIN.email);
    });

    it("should return 401 for unauthenticated request", async () => {
      const response = await request(app).get("/api/v1/auth/me");

      expectErrorResponse(response, 401);
    });

    it("should return 401 for invalid token", async () => {
      const response = await request(app)
        .get("/api/v1/auth/me")
        .set({ Authorization: "Bearer invalid_token" });

      expectErrorResponse(response, 401);
    });
  });
});
