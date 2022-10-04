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
    await Recruitment.destroy({ where: { contents: "회사 2가 올렸당test" } });
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    await sequelize.close();
  });

  test("SUCCESS: post request", async () => {
    await request(app)
      .post("/recruitment")
      .send({
        companyId: 2,
        position: "node 주니어 개발자",
        compensation: 1000000,
        contents: "회사 2가 올렸당test",
        stackId: 4,
      })
      .expect(201)
      .expect({
        message: "register success",
      });
  });

  test("FAILED: URL ERROR", async () => {
    await request(app).post("/recruitmen").expect(404).expect({});
  });

  test("FAILED: KEY ERROR", async () => {
    await request(app)
      .post("/recruitment")
      .send({
        companyId: "",
        position: "node 주니어 개발자",
        compensation: 1000000,
        contents: "회사 2가 올렸당test",
        stackId: 4,
      })
      .expect(400)
      .expect({ message: "empty required value" });
  });

  test("FAILED: KEY ERROR", async () => {
    await request(app)
      .post("/recruitment")
      .send({
        companyId: 2,
        position: "",
        compensation: 1000000,
        contents: "회사 2가 올렸당test",
        stackId: 4,
      })
      .expect(400)
      .expect({ message: "empty required value" });
  });

  test("FAILED: KEY ERROR", async () => {
    await request(app)
      .post("/recruitment")
      .send({
        companyId: 2,
        position: "node 주니어 개발자",
        compensation: 1000000,
        contents: "회사 2가 올렸당test",
        stackId: "",
      })
      .expect(400)
      .expect({ message: "empty required value" });
  });

  test("FAILED: KEY ERROR", async () => {
    await request(app)
      .post("/recruitment")
      .send({
        companyId: 2,
        position: "node 주니어 개발자",
        compensation: 1000000,
        contents: "",
        stackId: 4,
      })
      .expect(400)
      .expect({ message: "empty required value" });
  });
});
