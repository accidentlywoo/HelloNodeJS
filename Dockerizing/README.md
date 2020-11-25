# Node.js 웹앱의 Dockerizing
- [Node.js 웹 앱의 도커라이징 :: 공홈](https://nodejs.org/ko/docs/guides/nodejs-docker-webapp/)

이 예제에서 Node.js 애플리케이션을 Docker 컨테이너에 넣는 방법을 보여준다.
이 파트는 Docker가 설치되어 있고 Node.js애플리케이션의 구조에 대한 기본적인 지식이있어야한다. (설치만 되어있는 나,...)

## 1. Node.js 앱생성
애플리케이션과 의존성을 알려주는 ```package.json`` 파일을 생성한다.
```
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "description": "Node.js on Docker",
  "author": "First Last <first.last@example.com>",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.1"
  }
}
```
```package.json``` 파일을 만든 후, ```npm install```을 실행하세요. 
버전 5 이상의 npm을 사용한다면 Docker 이미지에 복사할 ```package-lock.json`` 파일을 npm에서 생성할 것이다.

이제 Express.js프레임워크로 웹앱을 정의하는 ```server.js``를 만든다.

다음 단계에서 공식 Docker 이미지를 사용해서 Docker 컨테이너 안에서 이 앱을 실행하는 방법을 보자!

먼저 Docker 이미지를 만든다.

### Dockerfile 생성
Dockerfile이라는 빈 파일 생성
```
touch Dockerfile
```
선호하는 텍스트 에디터로 Dockerfile을 연다.

가장 먼저 해야 할 것은 어떤 이미지를 사용해서 빌드할 것인지를 정의하는 것이다.
여기서 Docker Hub에 있는 node의 최신 LTS(장기 지원)버전인 12을 사용할 것이다.
```
FROM node:12
```

다음으로 이미지 안에 애플리케이션 코드를 넣기 위해 디렉터리를 생성할 것.
이 디렉터리가 애플리케이션의 작업 디렉터리가 된다.
```
WORKDIR /usr/src/app
```
이 이미지에는 이므 Node.js와 NPM이 설치되어 있다 npm 바이너리로 앱의 의존성을 설치하기만 하면 된다
npm 버전이 4이하이면 ```package-lock.json`` 파일을 생성하지 않을 것.

```
# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production
```
작업 디렉터리 전체가 아닌 ```package.json```파일만을 복사하고 있는데, 이는 캐시된 Docker 레이어의 장점을 활용하기 위함이다.
 -> 무슨소린지 모르겠다. [bitJudo](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)가 이에 대해 잘 설명해두었다고 한다...

추가로 주석에 추가된 주석(```# RUN npm ci --only=production```) npm ci 커맨드는 프로덕션 환경을 위한 더 빠르고, 신회할 수 있고, 재현 가능한 빌드를 제공한다.
 -> [관련 자료](https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable)


 ---

 - [캐시 Docker 레이어 bitJudo](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)
- [npm ci 관련 자료](https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable)