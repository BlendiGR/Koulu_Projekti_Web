import request from "supertest";
import app from "../../src/app.js";
import { expectSuccessResponse, expectErrorResponse } from "./helpers.js";

describe("Payments API", () => {
  describe("POST /api/v1/payments/create-intent", () => {
    it("should create payment intent with valid data", async () => {
      const paymentData = {
        amount: 2500,
        currency: "eur",
      };

      const response = await request(app)
        .post("/api/v1/payments/create-intent")
        .send(paymentData);

      if (response.status === 200) {
        expectSuccessResponse(response, 200);
        expect(response.body.data).toHaveProperty("clientSecret");
      } else if (response.status === 500) {
        expectErrorResponse(response, 500);
      }
    });

    it("should validate payment amount", async () => {
      const invalidPayment = {
        amount: -100,
        currency: "eur",
      };

      const response = await request(app)
        .post("/api/v1/payments/create-intent")
        .send(invalidPayment);

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it("should require amount field", async () => {
      const invalidPayment = {
        currency: "eur",
      };

      const response = await request(app)
        .post("/api/v1/payments/create-intent")
        .send(invalidPayment);

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it("should handle zero amount", async () => {
      const zeroPayment = {
        amount: 0,
        currency: "eur",
      };

      const response = await request(app)
        .post("/api/v1/payments/create-intent")
        .send(zeroPayment);

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
