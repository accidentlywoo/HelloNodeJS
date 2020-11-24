# HelloNodeJS
- [시작하기 :: Home :: 공홈](https://nodejs.org/ko/docs/guides/)

## Node.js Documents
### 기본 모듈 http

## ES6와 Next
Node.js는 [V8](https://v8.dev/)의 최신 버전으로 만들었습니다. V8을 최신 릴리스로 유지하기 때문에 Node.js 개발자에게 [JavaScript ECMA-262 명세](http://www.ecma-international.org/publications/standards/Ecma-262.htm)의 새로운 기능을 제때에 지원하면서 성능과 안정성 개선도 할 수 있다.

 모든 ES6기능은 shipping, staged, in progress라는 세 가지 그룹으로 나뉜다.
  - 모든 shipping 기능은 V8이 안정적이라고 간주한 것으로 Node.js에서 기본적으로 적용되있으므로 런타임 플래그가 전혀 필요없다.
  - Staged 기능은 거의 완성되었지만, V8 팀이 안정적이라고 간주하지 않은 기능으로 ***--harmony*** 런타임 플래그가 필요하다.
  - In porgress 기능은 각 하모니 플래그로 개별적으로 활성화할 수 있다. 테스트 목적이 아니라면 활성화하지 않기를 강력하게 권장한다. : 이 플래그는 V8에서 제공한 것으로 폐기 공지 없이 변경될 수 있다.

### Node.js 버전에 어떤 기능이 기본적으로 포함되어있나?
[node.green](https://node.green/) 웹사이트에서 어떤 Node.js가 어떤 ES 기능을 지원하는지 파악할 수 있다. 이는 Kangax의 호환성 표를 기반으로 만들어졌다.

V8엔진에 계속해서 새로운 기능이 추가되고 있다. 시기는 정확하지 않지만 Node.js에는 V8에 추가된 새 기능이 대체로 포함될 것이다.

***v8-options*** 인자로 각 Node.js 릴리스에서 모든 in progress 기능의 리스트를 볼 수 있다. 이 기능들을 완성되지 않았고 V8에서 제대로 돌아가지 않을 수도 있으므로 이 기능을 사용할 때는 위험을 감수해야 함을 명심.
```node --v8-options | grep "in progress"```

### --harmony 플래그를 사용하는 환경이 있으면 제거해야하나?
Node.js에서 ***--harmony*** 플래그의 현재 동작은 staged 기능만 활성화하는 것이다. 결국, 이는 ***--es-staging***과 같은 의미이다. 아직 안정적이라고 볼 수 없다.
프로덕션 환경 등에서 안전하게 운영하고 싶다면 V8과 Node.js에서 기본적으로 제공할 때까지 이 런타임 플래그를 제거하는 것을 고려해 보자. 
Node.js를 업그레이드 할 때 V8이 이 기능의 의미를 표준에 더 가깝게 변경한 경우 코드가 깨질 수 있으므로 대비해야 한다.

### Node.js의 특정 버전에 포함된 V8의 버전을 어떻게 알 수 있나용?
Node.js에서는 ***process*** 전역 객체를 통해 특정 바이너리에 포함된 모든 의존성과 각 버전의 목록을 쉽게 볼 수 있다. V8 엔진의 경우 터미널에서 다음 명령어를 실행해서 V8 버전을 볼 수 있다.
```node -p process.versions.v8```
