# wanted_pre_onboarding

> 개발 기간 : 2022년 09월 30일 ~ 10월 04일 (5일)

> 리팩토링(Refactoring) : 10월 05일

> 개발 인원 : Only me

## 기술 스택

- JavaScript
- Node.js (Express.js)
- MySQL
- Sequelize
- Postman

## ERD

<img width="1097" alt="스크린샷 2022-10-04 오후 7 44 55" src="https://user-images.githubusercontent.com/105341553/193800432-954515a9-2c79-4b24-808d-1ef41ebf431c.png">

## API Documentation

- [JJ_Wanted (Postman)](https://documenter.getpostman.com/view/22699914/2s83zcS6u3)

## 요구사항 분석 및 구현 과정

> Node.js를 활용하여 기업의 채용을 위한 웹 서비스 구현 회사는 채용공고를 생성하고, 이에 사용자는 지원하는 API 기능 구현

<br>

**1. 채용공고를 등록**

```
Request(Body) :

{
  "companyId": 2,
  "position":"java 주니어 개발자",
  "compensation":1000000,
  "contents":"java 주니어 개발자 모집합니다",
  "stackId": 4
}
```

```
Response :

{
  "message": "register success"
}
```

- Method : POST
- body값에 회사id, 포지션, 보상금, 채용내용, 사용기술을 받아서 데이터베이스에 등록합니다.
- 필수값이 없을 시 에러를 나오게 만들었습니다.

<br>

**2. 채용공고를 수정**

```
Request(Params) :

/:recruitmentId

Request(Body) :

{
  "compensation":1000000,
  "contents":"열심히 할 수 있는 사람만 지원해주세요",
  "stackId": 4
}
```

```
Response :

{
  "message": "update success"
}
```

- Method : PATCH
- params에 채용공고 id값을 받습니다.(JWT 사용x)
- body값에 채용공고를 수정할 정보를 받습니다.
- params에서 받은 id값이 데이터베이스에 없는 id값일시 에러를 나오게 만들었습니다.

<br>

**3. 채용공고를 삭제**

```
Request(Params) :

/:recruitmentId

```

```
Response :

  204 No Content

```

- Method : DELETE
- params에 받은 id값을 통해 채용공고를 삭제하는 기능을 구현
- params에서 받은 id값이 데이터베이스에 없는 id값일시 에러를 나오게 만들었습니다.

<br>

**4. 채용공고 목록 가져오기 & 검색 기능**

```
Request(query) :

?search="검색할단어"

```

```
Response :

  "recruitmentList": [
        {
            "id": 1,
            "companyName": "회사1",
            "countryName": "한국",
            "regionName": "서울",
            "position": "dsds",
            "compensation": "50000",
            "stackName": "python"
        },
        {
            "id": 8,
            "companyName": "회사1",
            "countryName": "한국",
            "regionName": "서울",
            "position": "python",
            "compensation": "1000000",
            "stackName": "mysql"
        },
        {
            "id": 9,
            "companyName": "python 회사",
            "countryName": "한국",
            "regionName": "판교",
            "position": "java",
            "compensation": "1000000",
            "stackName": "java"
        }
    ]

```

- Method : GET
  > 채용공고 목록을 가져오는 기능을 구현
- get 요청시 모든 채용공고 리스트를 가져오는 기능을 구현하였습니다.
- orm으로 처리시 데이터 양식이 안 예쁜거 같아서 raw 쿼리로 구현
  > 채용공고 검색 기능 구현
- 같은 url("/recruitment")에 쿼리 스트링만 붙이는 방식으로 구현하였습니다.(/recruitment?search="검색할단어")
- if문을 사용해 한개의 쿼리문으로 전체리스트 가져오기, 검색 후 리스트 가져오기를 모두 가능하게 구현
- 한번의 검색으로 모든 데이터를 조회하게 만들었습니다.(stack_name, company_name, position 등등)

<br>

**5. 채용 상세 페이지 기능**

```
Request(Params) :

/:recruitmentId

```

```
Response :

  "detailRecruitment": {
    "id": 3,
    "companyName": "회사2",
    "countryName": "한국",
    "regionName": "판교",
    "position": "백엔드 node 개발자",
    "compensation": "100000",
    "stackName": "python",
    "contents": "원티드랩에서 백엔드 시니어 개발자를 채용합니다. 자격요건은..",
    "idList": [
      3,
      11,
      12
    ]
  }

```

- Method : GET
- params에 받은 id값을 통해 채용공고를 채용 상세 페이지 구현
- 받은 채용공고 번호를 통해 회사 id를 가져온 후 JSON_ARRAYAGG 문법을 사용하여 리스트를 구현
- params에서 받은 id값이 데이터베이스에 없는 id값일시 에러를 나오게 만들었습니다.

<br>

**6. 채용공고에 지원**

```
Request(Body) :

{
    "recruitmentId" : 8,
    "userId" : 2
}
```

```
Response :

{
  "message": "application completed"
}
```

- Method : POST
- body값에 채용공고 id와 유저 id를 받아서 데이터베이스에 등록합니다.
- 필수값이 없을 시와 없는 id일 경우 에러를 나오게 하였고 이미 지원했을 경우 unique옵션과 exists를 활용하여 중복지원을 막았습니다.

<br>

**7. Unit Test 구현**

![스크린샷 2022-10-04 오후 6 11 04](https://user-images.githubusercontent.com/105341553/193815544-ef9d9a45-be62-4902-8b0c-e4714c454ca3.png)

- jest 라이브러리를 활용하여 유닛 테스트를 구현하였습니다.
- 모든 api의 성공 예시와 실패 예시를 테스트하였습니다.
