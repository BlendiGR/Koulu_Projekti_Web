import request from "supertest";
import app from "../../src/app.js";
import {
  expectSuccessResponse,
  expectErrorResponse,
} from "./helpers.js";

describe("Reviews API", () => {
  describe("GET /api/v1/reviews", () => {
    it("should list all reviews without authentication", async () => {
      const response = await request(app).get("/api/v1/reviews");

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("data");
      expect(Array.isArray(response.body.data.data)).toBe(true);
    });

    it("should handle pagination parameters", async () => {
      const response = await request(app)
        .get("/api/v1/reviews")
        .query({ skip: 0, take: 5 });

      expectSuccessResponse(response, 200);
      expect(response.body.data.data.length).toBeLessThanOrEqual(5);
    });
  });

  describe("POST /api/v1/reviews", () => {
    it("should return 401 for invalid rating", async () => {
      const invalidReview = {
        productId: 1,
        rating: 6,
        comment: "Invalid rating",
      };

      const response = await request(app)
        .post("/api/v1/reviews")
        .send(invalidReview);

      expectErrorResponse(response, 401);
    });

    it("should return 401 for unauthenticated user", async () => {
      const newReview = {
        productId: 1,
        rating: 5,
        comment: "Great product!",
      };

      const response = await request(app)
        .post("/api/v1/reviews")
        .send(newReview);

      expectErrorResponse(response, 401);
    });
  });
});
