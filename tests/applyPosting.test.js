const request = require("supertest");
const { createApp } = require("../app");
const { sequelize, Application } = require("../models");

describe("테스트", () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await sequelize.sync({});
  });

  afterAll(async () => {
    await Application.destroy({ where: { recruitment_id: 11, user_id: 2 } });
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    await sequelize.close();
  });

  test("SUCCESS: post request", async () => {
    await request(app)
      .post("/application")
      .send({
        recruitmentId: 11,
        userId: 2,
      })
      .expect(201)
      .expect({
        message: "application completed",
      });
  });

  test("FAILED: URL ERROR", async () => {
    await request(app).post("/applicatio").expect(404).expect({});
  });

  test("FAILED: userId KEY ERROR", async () => {
    await request(app)
      .post("/application")
      .send({
        recruitmentId: 11,
        userId: 20,
      })
      .expect(400)
      .expect({ message: "userId does not exist" });
  });

  test("FAILED: recruitmentId KEY ERROR", async () => {
    await request(app)
      .post("/application")
      .send({
        recruitmentId: 30,
        userId: 2,
      })
      .expect(400)
      .expect({ message: "recruitmentId does not exist" });
  });

  test("FAILED: duplication KEY ERROR", async () => {
    await request(app)
      .post("/application")
      .send({
        recruitmentId: 11,
        userId: 2,
      })
      .expect(400)
      .expect({ message: "already applied" });
  });
});
