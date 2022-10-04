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

  test("SUCCESS: get request", async () => {
    await request(app)
      .get("/recruitment/1")
      .expect(200)
      .expect({
        detailRecruitment: {
          id: 1,
          companyName: "회사1",
          countryName: "한국",
          regionName: "서울",
          position: "dsds",
          compensation: "50000",
          stackName: "python",
          contents: "python",
          idList: [1, 8],
        },
      });
  });

  test("SUCCESS: get request", async () => {
    await request(app)
      .get("/recruitment/3")
      .expect(200)
      .expect({
        detailRecruitment: {
          id: 3,
          companyName: "회사2",
          countryName: "한국",
          regionName: "판교",
          position: "백엔드 node 개발자",
          compensation: "100000",
          stackName: "python",
          contents:
            "원티드랩에서 백엔드 시니어 개발자를 채용합니다. 자격요건은..",
          idList: [3, 11, 12],
        },
      });
  });

  test("FAILED: params ERROR", async () => {
    await request(app)
      .get("/recruitment/just")
      .expect(400)
      .expect({ message: "id does not exist" });
  });
});
