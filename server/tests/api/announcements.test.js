import request from "supertest";
import app from "../../src/app.js";
import {
  loginAs,
  getAuthHeaders,
  expectSuccessResponse,
  expectErrorResponse,
} from "./helpers.js";

describe("Announcements API", () => {
  describe("GET /api/v1/announcement", () => {
    it("should get active announcement without authentication", async () => {
      const response = await request(app).get("/api/v1/announcement");

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("title");
      expect(response.body.data).toHaveProperty("message");
      expect(response.body.data.isActive).toBe(true);
    });
  });

  describe("GET /api/v1/announcement/admin", () => {
    it("should get announcement admin view as admin", async () => {
      const token = await loginAs("ADMIN");
      const response = await request(app)
        .get("/api/v1/announcement/admin")
        .set(getAuthHeaders(token));

      expectSuccessResponse(response, 200);
      expect(response.body.data).toHaveProperty("title");
      expect(response.body.data).toHaveProperty("message");
      expect(response.body.data).toHaveProperty("isActive");
    });

    it("should not allow customer to access admin view", async () => {
      const token = await loginAs("CUSTOMER");
      const response = await request(app)
        .get("/api/v1/announcement/admin")
        .set(getAuthHeaders(token));

      expectErrorResponse(response, 403);
    });

    it("should not allow unauthenticated access to admin view", async () => {
      const response = await request(app).get("/api/v1/announcement/admin");

      expectErrorResponse(response, 401);
    });
  });

  describe("PUT /api/v1/announcement", () => {
    it("should update announcement as admin", async () => {
      const token = await loginAs("ADMIN");
      const updates = {
        title: `Updated Announcement ${Date.now()}`,
        message: "This is an updated announcement message",
        isActive: true,
      };

      const response = await request(app)
        .put("/api/v1/announcement")
        .set(getAuthHeaders(token))
        .send(updates);

      expectSuccessResponse(response, 200);
      expect(response.body.data.title).toBe(updates.title);
      expect(response.body.data.message).toBe(updates.message);
      expect(response.body.data.isActive).toBe(updates.isActive);
    });

    it("should allow toggling announcement active status", async () => {
      const token = await loginAs("ADMIN");
      const updates = {
        isActive: false,
      };

      const response = await request(app)
        .put("/api/v1/announcement")
        .set(getAuthHeaders(token))
        .send(updates);

      expectSuccessResponse(response, 200);
      expect(response.body.data.isActive).toBe(false);

      const toggleBack = await request(app)
        .put("/api/v1/announcement")
        .set(getAuthHeaders(token))
        .send({ isActive: true });

      expectSuccessResponse(toggleBack, 200);
      expect(toggleBack.body.data.isActive).toBe(true);
    });

    it("should not allow customer to update announcement", async () => {
      const token = await loginAs("CUSTOMER");
      const updates = {
        title: "Customer Update",
        message: "This should fail",
      };

      const response = await request(app)
        .put("/api/v1/announcement")
        .set(getAuthHeaders(token))
        .send(updates);

      expectErrorResponse(response, 403);
    });

    it("should not allow unauthenticated user to update announcement", async () => {
      const updates = {
        title: "Unauthenticated Update",
        message: "This should fail",
      };

      const response = await request(app)
        .put("/api/v1/announcement")
        .send(updates);

      expectErrorResponse(response, 401);
    });
  });
});
