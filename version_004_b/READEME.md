# TODO App

JavaScript (EcamaScript) の言語機能に限定して実装する。Databse としては、JavaScript の配列とオブジェクトを活用する。

- データの永続性が、そもそも確保されないため、全く実用的ではない。

Client (Web Browser) のみ技術スタックで実装する。Databse には、IndexDB (Web API) を活用する。IndexDB を、現代的なPromiseによる非同期として扱える idb を利用する。

- データの永続性は、ユーザーが使用するブラウザに限定される。そのため、外部から参照できない。つまり、多様な利用環境への配慮が全くない。

Client (Web Browser) Node.js技術スタックで実装する。Databse には、IndexDB (Web API) を活用する。制約として、データの永続性は、ユーザーが使用するブラウザー内に閉じる。

- データの永続性が、ブラウザの中では確保される。



Client (Web Browser) Node.js技術スタックで実装する。Databse には、IndexDB (Web API) を活用する。制約として、データの永続性は、ユーザーが使用するブラウザー内に閉じる。

- データの永続性が、ブラウザの中では確保される。
- 
# Portfolio
## About me
フロントエンドエンジニアを目指して、独学で一年半ほどの未経験者です。就職を目指して以下のポートフォリオを作成中です。

## TODO APP

基本的なCURD操作を備えた、非常にシンプルな TODO APP をポートフォリオとして作成中です。機能や見た目は簡素ですが、段階的な学習の軌跡として複数のバージョンで作成しています。原則として外観は全て同じです。実際にデプロイを予定しているのは、version:2 と version:6 の二つです。

## All version

### version:1

- Frontend
  - HTML
  - CSS
  - JavaScript
    - Array

### version:2 (Github Page Deploy)

- Frontend
  - HTML
  - CSS
  - JavaScript
    - indexedDB

### version:3

- Frontend
  - HTML
  - CSS
  - JavaScript
- Backend
  - Node.js
    - Express
    - SQLite

### version:4 (Docker Dev)

- Frontend
  - NGINX
    - Vite(dist)
      - HTML
      - CSS
      - JavaScript
- Backend
  - Node.js
    - Express
    - Prisma
  - PostgreSQL

### version:5 (Docker Dev)

- Frontend
  - NGINX
    - Vite×React SPA(dist)
      - TSX
      - TailwindCSS
      - TypeScript
- Backend
  - Node.js
    - Express
    - Prisma
  - PostgreSQL


### version:6 (Vercel Deploy)

- Frontend
  - Vercel CDN
    - Next.js App Router (Static)
      - TSX
      - TailwindCSS
      - TypeScript
- Backend
  - Vercel Function (AWS Lambda)
    - Prisma
  - Supabase (PostgreSQL)
