const request = require("supertest");
const { createApp } = require("../app");
const { sequelize } = require("../models");

describe("테스트", () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await sequelize.sync({ force: false });
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    await sequelize.close();
  });

  test("SUCCESS: patch request", async () => {
    await request(app)
      .patch("/recruitment/5")
      .send({
        compensation: 1000000,
        contents: "잘하는 사람만 지원 ㄱㄱ",
        stackId: 4,
      })
      .expect(200)
      .expect({
        message: "update success",
      });
  });

  test("FAILED: URL ERROR", async () => {
    await request(app).post("/recruitmen").expect(404).expect({});
  });

  test("FAILED: params ERROR", async () => {
    await request(app)
      .patch("/recruitment/just")
      .expect(400)
      .expect({ message: "id does not exist" });
  });
});
