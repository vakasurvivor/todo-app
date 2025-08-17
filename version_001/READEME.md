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
## Frontend
   - HTML
   - CSS
   - JavaScript (Database)
     - Array & Object

==============================

## Frontend
   - HTML
   - CSS
   - JavaScript (Database)
     - IndexDB (Web API)

==============================

## Frontend
   - HTML
   - CSS
   - JavaScript

## Backend
   - Node.js
     - Express
     - SQLite (Database)

==============================

## Frontend
   - HTML
     - JSX
   - CSS
     - CSSModule
   - JavaScript
     - React

## Backend
   - Web Server
     - NINGX (Static File from Vite×React)
   - API (App) Server
     - Node.js (Express + Priama)
   - DataBase Server
     - PostgreSQL

==============================

## Frontend
   - HTML
     - TSX
   - CSS
     - TailwindCSS
   - TypeScript
     - React

## Backend
   - CDN
     - Vercel CDN (Static File from Next.js)
   - API (App) Server
     - Vecel Function (AWS Lambda)
   - DataBase Server
     - Supabase (PostgreSQL)
