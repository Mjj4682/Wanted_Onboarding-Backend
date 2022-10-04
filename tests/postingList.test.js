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
      .get("/recruitment")
      .expect(200)
      .expect({
        recruitmentList: [
          {
            id: 1,
            companyName: "회사1",
            countryName: "한국",
            regionName: "서울",
            position: "dsds",
            compensation: "50000",
            stackName: "python",
          },
          {
            id: 8,
            companyName: "회사1",
            countryName: "한국",
            regionName: "서울",
            position: "python",
            compensation: "1000000",
            stackName: "mysql",
          },
          {
            id: 3,
            companyName: "회사2",
            countryName: "한국",
            regionName: "판교",
            position: "백엔드 node 개발자",
            compensation: "100000",
            stackName: "python",
          },
          {
            id: 11,
            companyName: "회사2",
            countryName: "한국",
            regionName: "판교",
            position: "java 시니어",
            compensation: "10000",
            stackName: "java",
          },
          {
            id: 12,
            companyName: "회사2",
            countryName: "한국",
            regionName: "판교",
            position: "java 주니어 개발자",
            compensation: "1000000",
            stackName: "mysql",
          },
          {
            id: 9,
            companyName: "python 회사",
            countryName: "한국",
            regionName: "판교",
            position: "java",
            compensation: "1000000",
            stackName: "java",
          },
          {
            id: 4,
            companyName: "회사3",
            countryName: "미국",
            regionName: "뉴욕",
            position: "백엔드 주니어 개발자",
            compensation: "1000000",
            stackName: "node",
          },
          {
            id: 5,
            companyName: "회사4",
            countryName: "미국",
            regionName: "워싱턴",
            position: "mysql 개발자",
            compensation: "1000000",
            stackName: "mysql",
          },
        ],
      });
  });

  test("SUCCESS: get request(search)", async () => {
    await request(app)
      .get("/recruitment/?search=python")
      .expect(200)
      .expect({
        recruitmentList: [
          {
            id: 1,
            companyName: "회사1",
            countryName: "한국",
            regionName: "서울",
            position: "dsds",
            compensation: "50000",
            stackName: "python",
          },
          {
            id: 8,
            companyName: "회사1",
            countryName: "한국",
            regionName: "서울",
            position: "python",
            compensation: "1000000",
            stackName: "mysql",
          },
          {
            id: 3,
            companyName: "회사2",
            countryName: "한국",
            regionName: "판교",
            position: "백엔드 node 개발자",
            compensation: "100000",
            stackName: "python",
          },
          {
            id: 9,
            companyName: "python 회사",
            countryName: "한국",
            regionName: "판교",
            position: "java",
            compensation: "1000000",
            stackName: "java",
          },
        ],
      });
  });

  test("FAILED: URL ERROR", async () => {
    await request(app).get("/recruitmen").expect(404).expect({});
  });
});
