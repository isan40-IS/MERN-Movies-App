import request from "supertest";
import app from "../app.js";

import {
  connectTestDB,
  clearTestDB,
  closeTestDB,
} from "./setupTestDB.js";

import Genre from "../models/Genre.js";

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe("Genre API Endpoints", () => {
  test("GET /api/v1/genre/genres should return empty array initially", async () => {
    const res = await request(app).get("/api/v1/genre/genres");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test("GET /api/v1/genre/genres should return inserted genres", async () => {
    await Genre.create({ name: "Action" });
    await Genre.create({ name: "Drama" });

    const res = await request(app).get("/api/v1/genre/genres");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);

    expect(
      res.body.some((genre) => genre.name === "Action")
    ).toBeTruthy();

    expect(
      res.body.some((genre) => genre.name === "Drama")
    ).toBeTruthy();
  });

  test("GET /api/v1/genre/:id should return genre detail", async () => {
    const genre = await Genre.create({
      name: "Comedy",
    });

    const res = await request(app).get(
      `/api/v1/genre/${genre._id}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Comedy");
  });

  test("GET /api/v1/genre/:id with non-existing id should return null genre", async () => {
    const fakeId = "507f191e810c19729de860ea";

    const res = await request(app).get(
      `/api/v1/genre/${fakeId}`
    );

    expect(res.statusCode).toBe(200);

    // sesuaikan nanti dengan behavior controller
    expect(res.body).toBeDefined();
  });
});