# 디버깅 - 시작하기
- [디버깅 - 시작하기 :: 공홈](https://nodejs.org/ko/docs/guides/debugging-getting-started/)

## 디버깅 가이드
### 인스펙터 활성화
 ```--inspect```스위치로 시작하면 Node.js 프로세스가 디버깅 클라이언트에서 수신을 시작하고 기본 호스트와 포트로 ```127.0.0.1:9229```를 사용합니다. 각 프로세스는 고유한 ***UUID***도 할당받는다. 

 인스펙터 클라이언트는 호스트 주소, 포트, UUID를 알아야 접속핳 수 있다. 전체 URL은 ```ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e```와 같은 형태가 된다.

 Node.js가 ***SIGUSR1*** 신호를 받으면 디버깅 메시지도 수신하기 시작.(***SIGUSR1***은 Windows에서 사용할 수 없다.) Node.js 7이하 버전에서는 레거시 Debugger API가 활성화되고 Node.js 8이상에서는 Inspector API를 활성화한다.

 ### 보안 관련
 디버거가 Node.js 실행 환경에 완전히 액세스하기 때문에 이 포트에 연결할 수 있는 공격자가 노드 프로세스를 대신하여 임의의 코드를 실행할 수 있다. 디버거 포트를 공용 및 개인 네트워크에 노출하는 경우 보안에 미치는 영향을 이해하는 것은 중요하다.

 ***디버그 포트를 공개적으로 노출하는 것은 안전하지 않습니다.***
 
  디버거가 퍼블릭 IP주소 또는 0.0.0.0에 바인딩 될 경우 IP주소에 접근할 수 있는 어떤 클라이언트든 아무 제약 없이 디버거에 접속할 수 있고 임의의 코드를 실행할 수 있다.

   기본적으로 ```node --inspect```는 127.0.0.1에 바인딩 한다. 디버거에 외부 접속을 허용하려 할 경우 퍼블릭 IP 주소또는 0.0.0.0 등을 명시적으로 제공해야 한다. 이렇게 하면 잠재적으로 심각한 보안 위협에 노출될 수 있다. 보안 노출을 방지하기 위해 적절한 방화벽과 액세스 제어를 유지하는 것이 좋다.

   원격 디버거 클라이언트의 접근을 안전하게 허용하는 방법은 '원격 디버깅 활성화 시나리오'섹션을 참조.

   ***로컬 애플리케이션은 인스펙터에 완전히 액세스 할 수 있다***

   인스펙터 포트를 127.0.0.1(기본값)에 바인딩하더라도 시스템에서 로컬로 실행되는 애플리케이션들은 제한 없이 액세스 할 수 있다. 이것은 로컬 디버거를 편리하게 부착할 수 있도록 의도적으로 설계되었다.

   ***브라우저, 웹소켓, 동일 출처 정책***
   
   웹 브라우저에서 열리는 웹사이트는 브라우저 보안 모델에 따라 웹소켓과 HTTP 요청을 할 수 있다. 고유한 디버거 세션 ID를 얻으려면 초기 HTTP연결이 필요하다. 동일 출처 정책은 이 HTTP 연결을 만들 수 없도록 한다. ***DNS 리바인딩 공격***에 대한 추가 보안을 위해 Node.js는 연결의 'Host'헤너가 IP주소나 ```localhost``` 또는 ```localhost6``` 을 정확하게 지정하는지 검증한다.

   이러한 보안 정책은 호스트 이름을 지정하여 원격 디버그 서버에 접속할 수 없도록 한다. IP 주소를 지정하거나 아래에 설명된 것과 같이 ssh터널을 사용하여 이 제한사항을 해결할 수 있다.

 ### 인스펙터 클라이언트
   Node 인스펙터에 접속할 수 있는 여러 상용 도구와 오픈소스 도구가 있다.
   아래에 이런 도구들을 간략히 정리

   - [node-inspect](https://github.com/nodejs/node-inspect) :
       - Node.js 재단에서 지원하는 CLI 디버거로 [Inspector 프로토콜](https://chromedevtools.github.io/debugger-protocol-viewer/v8/)을 사용. 
       - Node에 포함되어 있거 ```node inspect myscript.js``로 사용할 수 있다.
       - 최신 버전을 별도로 설치할 수 있고(ex: ```npn install -g node-inspect```)```node-inspect mydcript.js```로 사용할 수 있다.
   - [Chrom DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+ :
       - 방법 1 : 크로미움에 기반을 둔 브라우저에서 ```chrome://inspect```를 연다. Confifure버튼을 눌러서 대상 호스트와 포트 목록을 확인.
       - 방법 2 : ```/json/list```(상단 참고)의 출력에서 ```devtoolsFrontendUrl```을 복사하거나 --inspect가 알려준 텍스트에서 복사해서 크롬에 붙야넣기를 한다.

    - [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+ :
        - Debug 패널에서 설정 아이콘을 클릭해서 ```.vscode/launch.json```을 연다. 초기 설정으로 "Node.js"를 선택한다.
      
    - Visual Studio 2017 : 메뉴에서 Debug > Start Debugging 선택하거나 F5 누르기

    - JetBrains WebStorm 2017.1+와 다른 JetBrains IDE 
        - 새로운 Node.js 디버그 설정을 생성하고 Debug를 눌러. Node.js 7+에서 기본적으로 ```--inspect```를 사용할 것이다. 비활성화하려면 IDE 레지스트리에서 ```js.debugger.node.use.inspect``` 의 체크를 해제해라.

    - chrome-remote-interface

    - Gitpod

    - Eclipse IDE와 Eclipse Wild Web Developer 확장 프로그램

 ### 명령행 옵션
 디버깅용 여러 런타임 플래스의 기능을 보여준다.
 - ```--inspect``` : 인스펙터 에이전트 활성화, 기본 주소와 포트에서 수신(127.0.0.1:9229)
 - ```--inspect=[host:port]``` : 인스펙터 에이전트 활성화, 주소 또는 호스트 이름 host에 바인딩(기본값:127.0.0.1), port포트에서 수신(기본값:9229)
 - ```--inspect-brk``` : 인스펙터 에이전트 활성화, 기본 주소와 포트에서 수신(127.0.0.1:9229), 사용자 코드 시작 전 멈춤
- ```--inspect-brk=[host:port]``` : 인스펙터 에이전트 활성화, 주소 또는 호스트 이름 host에 바인딩(기본값:127.0.0.1), port포트에서 수신(기본값:9229), 사용자 코드 시작 전 멈춤
- ```node inspect script.js``` : 사용자의 스크립트를 --inspect 플래스로 실행하는 자식 프로세스를 생성하고 CLI디버거 실행에 메인 프러세스를 사용한다. 
- ```node inspect--port=xxxx script.js``` : 사용자의 스크립트를 --inspect 플래스로 실행하는 자식 프로세스를 생성하고 CLI디버거 실행에 메인 프러세스를 사용한다., port포트에서 수신(기본값:9229)

### 원격 디버깅 활성화 시나리오
 디버거가 퍼블릭 IP 주소에서 수신하지 않는 것을 권장한다. 만약 원격 디버깅 연결을 허용해야 하는 경우 ssh 터널링을 대신 사용할 것을 권장한다. 설명을 위해 아래 예제를 제공한다.진행하기 전 권한을 가진 서비스에 원격 액세스를 허용할 경우 발생할 수 있은 보안 위험을 이해하시기 바람. (겁나 여러번 강조하네)

  디버깅하기를 원하는 remote.example.com원격 시스템에서 노드가 실행 중이라고 가정하겠다. 해당 시스템에서 localhost(기본값)만 수신하는 인스펙터로 노드 프로세스를 시작해야 한다.
  ```node --inspect server.js```

  이제 디버그 클라이언트 연결을 시작하려는 로컬 시스템에서 ssh터널을 설정할 수 있다.
  ```ssh -L 9221:localhost:9229 user@remote.example.com```

   그러면 로컬 시스템의 9221 포트에서 remote.example.com의 9229포트로 전달되는 ssh터널 세션이 시작된다. Chrome DevTools또는 Visual Studio Code등의 디버거로 localhost:9221에 연결할 수 있으며 Node.js 애플리케이션이 로컬에서 실행 중인 것처험 디버깅할 수 있다.

### 레거시 디버거
    Node 7.7.0 부터 폐기. --inspect와 인스펙터를 사용해라. 

## 개념 정리
- [UUID(Universally Unique Identifier) URN NameSpace](https://tools.ietf.org/html/rfc4122) : 
    인터넷 커뮤니티를 위한 인터넷 표준 추적 프로토콜을 지정하고 개선을 위한 토론 및 제안을 요청한다. 
    이 프로토콜의 표준화 상태 및 상태는 "인터넷 공식 프로토콜 표준" (STD 1)의 최신 버전을 참조하십시오. 
- [인터넷 프로토콜 킹 사이트](https://www.ietf.org/)
- [DNS 리바인딩 공격](https://en.wikipedia.org/wiki/DNS_rebinding)

## ToDo
와오옹옹 원격 디버깅 활성화 시나리오 구현해보기!