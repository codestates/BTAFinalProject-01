# Bithumb Dagao Neo (빗썸이 다가오네오)
<img width="1119" alt="스크린샷 2022-11-14 오전 9 43 01" src="https://user-images.githubusercontent.com/104472372/201553707-80392876-a7cd-48d6-801a-14ce7467e375.png">


# 📙프로젝트 소개

빠르고 편리한 Explorer, 쉽고 다양한 기능의 Wallet이 지금 다가오 네오!!

**‘Bithumb Dagao Neo’** 는 Neo Private Node를 활용한 Exlorer, Wallet 개발 프로젝트입니다. 빗썸이 다가오네오 Explorer는 프라이빗 노드에 대한 트랜잭션, 블록, 계정들의 정보를 빠르고 쉽게 확인 가능하며, 검색창을 이용한 검색기능을 제공합니다. Wallet은 니모닉 코드를 활용한 계정 복구를 지원하며, NEP17 토큰인 네오, 가스의 전송과 멀티시그 계정의 생성 및 송금을 지원하고 디스코드 채널로의 알림기능을 제공합니다.



## Bithumb Dagao Neo 기술 스택

노드 및 API: Docker, Mongo DB, Python

Wallet : MUI, NeonJs, CSS, React, Crypto, Ethers, Chrome Extension, Axios

Explorer : Axios, AntDesign, React, NeonJs, NodeJs


## Getting Started

### Installing

<!-- * How/where to download your program
* Any modifications needed to be made to files/folders -->

1. clone this repository

```
https://github.com/codestates/BTAFinalProject-01.git
```

2. change directory
Explorer
```
cd BTAFinalProject-01/Explorer/client
```
Wallet
```
cd BTAFinalProject-01/Wallet
```

3. install dependencies

```
npm install
```

### Executing program


### Wallet
<!-- * How to run the program
* Step-by-step bullets -->

```
npm run build
```

크롬 브라우저 > 상단 우측 크롬 확장프로그램 관리 > 상단 좌측 "압축해제된 확장 프로그램을 로드합니다" 클릭 > Wallet에 build 폴더 업로드
크롬 상단 우측 크롬 확장프로그램에서 Neo Wallet 클릭

### Explorer
<!-- * How to run the program
* Step-by-step bullets -->

```
npm run start
```

## Authors

이름 | 역할 | Github 
---- | ---- | ---- 
오하영 | Explorer 구현, Wallet multisig account, transaction 구현, NEP17 token 전송 테스트 | https://github.com/Hayoung5
이종환 | NEO Blockchain Node Setup, Blokchain Daemon API, Rest API 개발, Blockchain RPC Test | https://github.com/novela77
정웅섭 | Wallet 기능 BE: 월렛 생성, 니모닉 코드 생성, 암호 재설정, 토큰 전송, Github 이슈, PR, 브랜치 등, 코드 관리 | https://github.com/woongsup123
홍유진 | NEO Wallet Extension 구현, Wallet FE 기능 | https://github.com/yu-uj
