import request from "supertest";
import app from "../../src/app.js";
import {
  loginAs,
  getAuthHeaders,
  expectSuccessResponse,
  expectErrorResponse,
  testCoupons,
} from "./helpers.js";

describe("Coupons API", () => {
  describe("GET /api/v1/coupons", () => {
    it("should list all coupons as admin", async () => {
      const token = await loginAs("ADMIN");
      const response = await request(app)
        .get("/api/v1/coupons")
        .set(getAuthHeaders(token));

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("data");
      expect(Array.isArray(response.body.data.data)).toBe(true);
      expect(response.body.data.data.length).toBeGreaterThan(0);
    });

    it("should not allow customer to list all coupons", async () => {
      const token = await loginAs("CUSTOMER");
      const response = await request(app)
        .get("/api/v1/coupons")
        .set(getAuthHeaders(token));

      expectErrorResponse(response, 403);
    });

    it("should not allow unauthenticated access", async () => {
      const response = await request(app).get("/api/v1/coupons");

      expectErrorResponse(response, 401);
    });
  });

  describe("GET /api/v1/coupons/:code", () => {
    it("should get coupon by code without authentication", async () => {
      const response = await request(app).get(
        `/api/v1/coupons/${testCoupons.WELCOME10}`
      );

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("code", testCoupons.WELCOME10);
      expect(response.body.data).toHaveProperty("discount");
      expect(response.body.data).toHaveProperty("isActive");
    });

    it("should return 404 for non-existent coupon code", async () => {
      const response = await request(app).get("/api/v1/coupons/NONEXISTENT");

      expectErrorResponse(response, 404);
    });

    it("should get coupon info for valid code", async () => {
      const response = await request(app).get(
        `/api/v1/coupons/${testCoupons.WELCOME10}`
      );

      expectSuccessResponse(response, 200);
      expect(response.body.data.code).toBe(testCoupons.WELCOME10);
      expect(parseFloat(response.body.data.discount)).toBeGreaterThan(0);
    });
  });

  describe("POST /api/v1/coupons", () => {

    it("should not allow customer to create coupon", async () => {
      const token = await loginAs("CUSTOMER");
      const newCoupon = {
        code: "COUPON123",
        discount: 20.0,
        isActive: true,
      };

      const response = await request(app)
        .post("/api/v1/coupons")
        .set(getAuthHeaders(token))
        .send(newCoupon);

      expectErrorResponse(response, 403);
    });

    it("should not allow unauthenticated user to create coupon", async () => {
      const newCoupon = {
        code: "COUPON123",
        discount: 10.0,
        isActive: true,
      };

      const response = await request(app)
        .post("/api/v1/coupons")
        .send(newCoupon);

      expectErrorResponse(response, 401);
    });

    it("should return 400 for missing required fields", async () => {
      const token = await loginAs("ADMIN");
      const invalidCoupon = {
        code: "INCOMPLETE",
        // missing discount
      };

      const response = await request(app)
        .post("/api/v1/coupons")
        .set(getAuthHeaders(token))
        .send(invalidCoupon);

      expectErrorResponse(response, 400);
    });

    it("should return 400 for duplicate coupon code", async () => {
      const token = await loginAs("ADMIN");
      const duplicateCoupon = {
        code: testCoupons.WELCOME10,
        discount: 5.0,
        isActive: true,
      };

      const response = await request(app)
        .post("/api/v1/coupons")
        .set(getAuthHeaders(token))
        .send(duplicateCoupon);

      expectErrorResponse(response, 400);
    });
  });
});
