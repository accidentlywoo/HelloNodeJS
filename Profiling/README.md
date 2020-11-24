# Node.js 애플리케이션의 간단한 프로파일링
- [Node.js 애플리케이션의 간단한 프로파일링 :: 공홈](https://nodejs.org/ko/docs/guides/simple-profiling/) 
  
## Node.js 애플리케이션의 간단한 프로파일링
Node.js 애플리케이션을 프로파일링하는 서드파티 도구들이 많이 있지만, 대부분은 Node.js에 내장된 프로파일러를 사용하는 것이 가장 쉬운 방법
내장된 프로파일러는 프로그램을 실행하는 동안 주기적으로 스택을 샘플링하는 [V8 내의 프로파일러](https://v8.dev/docs/profile)를 사용.
이 샘플링 결과를 기록하면서 jit 컴파일이나 tick 시리즈처럼 중요한 최적화 작업을 기록한다.

```
code-creation,LazyCompile,0,0x2d5000a337a0,396,"bp native array.js:1153:16",0x289f644df68,~
code-creation,LazyCompile,0,0x2d5000a33940,716,"hasOwnProperty native v8natives.js:198:30",0x289f64438d0,~
code-creation,LazyCompile,0,0x2d5000a33c20,284,"ToName native runtime.js:549:16",0x289f643bb28,~
code-creation,Stub,2,0x2d5000a33d40,182,"DoubleToIStub"
code-creation,Stub,2,0x2d5000a33e00,507,"NumberToStringStub"
```
tick은 Node.js 4.4.0부터 소스에서 빌드를 따로 하지 않고 이 정보를 사용할 수 있는 도구가 도입되었다. 

### tick
tick 프로파일러의 사용방법을 설명하기 위해 간단한 Express 애플리케이션을 만들어보자.
``` tick-profile.js ```앱은 2개의 핸들러를 가지고 있고 하나는 새로운 사용자를 시스템에 추가할 것이다.