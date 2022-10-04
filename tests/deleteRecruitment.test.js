const request = require("supertest");
const { createApp } = require("../app");
const { sequelize, Recruitment } = require("../models");

describe("테스트", () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await sequelize.sync({});
  });

  afterAll(async () => {
    await Recruitment.create({
      id: 12,
      company_id: 2,
      position: "java 주니어 개발자",
      compensation: 1000000,
      contents: "회사 2가 올렸당",
      stack_id: 4,
    });
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    await sequelize.close();
  });

  test("SUCCESS: delete request", async () => {
    await request(app).delete("/recruitment/12").expect(204);
  });

  test("FAILED: URL ERROR", async () => {
    await request(app).post("/recruitmen").expect(404).expect({});
  });

  test("FAILED: params ERROR", async () => {
    await request(app)
      .delete("/recruitment/just")
      .expect(400)
      .expect({ message: "id does not exist" });
  });
});
