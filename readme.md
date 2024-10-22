# Gonguerie / 공길이
학교 홈페이지에 게시되는 게시물을 종류별로 구분하여 나에게 필요한 공지만을 알림받는다!

> [!Warning]
> 현재 이 프로젝트는 개발 중이며, 지속적인 개선을 통해 더 나은 성능과 기능을 제공할 예정입니다. 완성된 버전이 출시되기 전까지는 테스트 목적으로만 사용해주시길 바랍니다.

## Getting Started / 시작하기

### Prerequisites / 필요한 프로그램

```
Node.js
```

### How to start the server / 서버를 시작하는 방법

1. Install dependencies
```sh
npm install
```

2. Write .env file
```
NODE_ENV=development
PORT=3000

DB_HOST="Your DB Host"
DB_POST="Your DB Port"
DB_USER="Your DB User"
DB_PASSWORD="Your DB Password"
DB_DATABASE="Your DB Database"

SESSION_SECRET="Your secret"

OPENAI_API_KEY="Your OpenAI API Key"
```

3. Start server
```sh
npm start
```

## Technologies / 구현방법
NodeJS의 Express 서버를 활용하였고, 서버는 Amazon RDS의 MySQL을 사용하였습니다. 

## Contribution / 기여
소스 수정사항이 있다면 Pull requests 로 열어주세요.

## License / 라이센스
이 프로젝트는 MIT License 라이센스가 부여되어 있습니다.
