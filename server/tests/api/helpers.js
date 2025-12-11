import request from "supertest";
import app from "../../src/app.js";

/**
 * Helper functions for API testing
 */

/**
 * Login as a specific role and return the JWT token
 * @param {string} role - 'ADMIN' or 'CUSTOMER'
 * @returns {Promise<string>} JWT token
 */
export async function loginAs(role = "CUSTOMER") {
  const credentials = {
    ADMIN: {
      email: "admin@fooder.fi",
      password: process.env.ADMIN_PW || "admin123",
    },
    CUSTOMER: {
      email: "mikko@metropolia.fi",
      password: "Salakala123",
    },
  };

  const creds = credentials[role];
  if (!creds) {
    throw new Error(`Unknown role: ${role}`);
  }

  const response = await request(app)
    .post("/api/v1/auth/login")
    .send(creds);

  if (response.status !== 200 || !response.body.data?.token) {
    throw new Error(`Login failed for ${role}: ${JSON.stringify(response.body)}`);
  }

  return response.body.data.token;
}

/**
 * Get authorization headers with JWT token
 * @param {string} token - JWT token
 * @returns {Object} Headers object
 */
export function getAuthHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Validate successful response format
 * @param {Object} response - Supertest response
 * @param {number} statusCode - Expected status code
 */
export function expectSuccessResponse(response, statusCode = 200) {
  expect(response.status).toBe(statusCode);
  expect(response.body).toHaveProperty("success", true);
  expect(response.body).toHaveProperty("data");
}

/**
 * Validate error response format
 * @param {Object} response - Supertest response
 * @param {number} statusCode - Expected status code
 */
export function expectErrorResponse(response, statusCode) {
  expect(response.status).toBe(statusCode);
  expect(response.body).toHaveProperty("success", false);
  expect(response.body).toHaveProperty("error");
}

/**
 * Get test product IDs from database (seeded products)
 * Useful for tests that need to reference existing products
 */
export const testProducts = {
  CRISPY_FRIES: "Crispy Fries",
  CHICKEN_NUGGETS: "Chicken Nuggets",
  CHEESE_BURGER: "Cheese Burger",
};

/**
 * Get test user credentials
 */
export const testUsers = {
  ADMIN: {
    email: "admin@fooder.fi",
    password: process.env.ADMIN_PW || "admin123",
  },
  CUSTOMER: {
    email: "mikko@metropolia.fi",
    password: "Salakala123",
  },
};

/**
 * Get test coupon codes
 */
export const testCoupons = {
  WELCOME10: "WELCOME10",
};
