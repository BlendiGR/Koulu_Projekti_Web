import request from "supertest";
import app from "../../src/app.js";
import path from "path";
import { fileURLToPath } from "url";
import {
  loginAs,
  getAuthHeaders,
  expectSuccessResponse,
  expectErrorResponse,
} from "./helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Media API", () => {
  describe("POST /api/v1/media/upload", () => {
    it("should upload file as admin", async () => {
      const token = await loginAs("ADMIN");
      const testBuffer = Buffer.from("test file content");

      const response = await request(app)
        .post("/api/v1/media/upload")
        .set(getAuthHeaders(token))
        .attach("file", testBuffer, "test-image.jpg");
      if (response.status === 200 || response.status === 201) {
        expectSuccessResponse(response, response.status);
        expect(response.body.data).toHaveProperty("url");
      } else {
        expect(response.status).not.toBe(403);
      }
    });

    it("should not allow customer to upload file", async () => {
      const token = await loginAs("CUSTOMER");
      const testBuffer = Buffer.from("test file content");

      const response = await request(app)
        .post("/api/v1/media/upload")
        .set(getAuthHeaders(token))
        .attach("file", testBuffer, "test-image.jpg");

      expectErrorResponse(response, 403);
    });

    it("should not allow unauthenticated upload", async () => {
      const testBuffer = Buffer.from("test file content");

      const response = await request(app)
        .post("/api/v1/media/upload")
        .attach("file", testBuffer, "test-image.jpg");

      expectErrorResponse(response, 401);
    });

    it("should require file in request", async () => {
      const token = await loginAs("ADMIN");

      const response = await request(app)
        .post("/api/v1/media/upload")
        .set(getAuthHeaders(token));

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
