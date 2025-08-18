## All version

Next.jsは、非常に抽象化されているため、公式の仕様書を読み進めても、暗黙的に多くの前提知識を要求されるため理解が難しい。「Todo App」を牧歌的な技術から段階的に構築し、基礎的な概念を確認した学習記録兼ポートフォリオです。

### version:1

まずは Vanilla Language のみで「Todo App」を構築する。一見すると、うまく機能しているように思えるが、ブラウザを再読み込みするとデータが消失してしまう。JavaScriptの配列でデータを保持しているため、永続化することがそもそも不可能である。

#### 技術選定
- Frontend
  - HTML
  - CSS
  - JavaScript
    - Array

### version:2 (Github Page Deploy)

version:1 の反省を経て、ブラウザに組み込まれている indexedDB (Web API) を利用する。これも一見すると、うまく機能しているように思えるが、ブラウザを別のアプリケーションに切り替えるとデータが消失してしまう。つまり、indexedDB を利用してもデータの永続化は、今現在使用してるブラウザに限定される。「Todo App」の実用性を考慮すると、異なる環境からでも同一のデータソースに接続したい。

#### 技術選定
- Frontend
  - HTML
  - CSS
  - JavaScript
    - indexedDB

### version:3α

version:2 の反省を経て、ブラウザの外部に記憶領域を置く。実用的な「Todo App」にはバックエンドが必須である。手始めに、Node.js(Express)とSQLiteを組み合わて、REST API を構築する。これにより、異なる環境からでも同一のデータソースに接続でき、基本的なCRUD操作をクライアントから通信越しに行うことができる。

#### 技術選定
- Frontend (Express Static)
  - HTML
  - CSS
  - JavaScript
- Backend
  - Node.js
    - Express
    - SQLite

- ### version:3β

version:3α によって機能要件は満たされている。ここからは、段階的に改良を重ねて、現代的なフロントエンドを主軸としたフルスタック構成に近づけていく。まずは、フロントエンドの分散化されたモジュールを、Viteでバンドルし、パフォーマンスの改善を図る。バックエンドでは、Prisma(ORM)を導入して、Database層の抽象化を図る。

#### 技術選定
- Frontend (Express Static)
  - Vite(dist)
    - HTML
    - CSS
    - JavaScript
- Backend
  - Node.js
    - Express
    - Prisma
    - SQLite

### version:4α

version:3β の構成では、Node.jsに責務が集中している。「Todo App」は小規模なため、問題は表面化しないが、プログラミングの定石としては「単一責任」の法則がある。肥大化した責務を分割し、三層構造を構築する。

- Web Server (nginx)
- API Server (Node.js)
- Database Server (PostgreSQL)

Web Server には、Viteで生成した静的ファイルの配信とAPI Server への振り分けを委任する。Database Serverの独立に伴い、ファイルベースのSQLiteからより汎用的なPostgreSQLへ移行する。分散化されたバックエンドの開発環境としてDockerを導入する。


#### 技術選定
- Frontend
  - NGINX (Docker)
    - Vite(dist)
      - HTML
      - CSS
      - JavaScript
- Backend
  - Node.js (Docker)
    - Express
    - Prisma
  - PostgreSQL (Docker)

### version:4β

version:4αでは、Node.jsに集中した責務を分割し、三層構造へ移行した。更なる改良として、フロントエンドは、より宣言的にUI構築をするためにReactを利用する。すでに導入済みのVite を基盤として React + CSS Modules で全体的に書き換える。SPA (Single Page Application)への転換を図り、モダンなフロントエンドエコシステムとの接点を持たせる。

#### 技術選定
- Frontend
  - NGINX (Docker)
    - Vite × React SPA(dist)
      - JSX
      - CSS Modules
      - Javacript
- Backend
  - Node.js (Docker)
    - Express
    - Prisma
  - PostgreSQL (Docker)


### version:5α

version:4βでは、Reactを導入して、現代的なフロントエンド構成に

#### 技術選定
- Frontend
  - Vercel CDN (Static from Next.js)
    - Next.js App Router
      - TSX
      - TailwindCSS
      - TypeScript
- Backend
  - Vercel Function (AWS Lambda)
    - API routes (REST API)
  - PostgreSQL (Docker)


### version:5β

version:5αでは、Expressで構築した REST API を、Next.js が提供する API Routes に移行した。

RPC（Remote Procedure Call）のように API Routes層を挟まずに、直接サーバー関数を

#### 技術選定
- Frontend
  - Vercel CDN (Static from Next.js)
    - Next.js App Router
      - TSX
      - TailwindCSS
      - TypeScript
- Backend
  - Vercel Function (AWS Lambda)
    - Server Function (RPC)
  - PostgreSQL (Docker)


### version:6 (Vercel Deploy)

最終版として、本番環境へ簡易的に移行するために、PostgreSQLを基盤としたSupabase(Bass)を利用する。
Pass(Vercel) + Bass(Supabase) の組み合わせによって、サーバーの技術的な詳細に立ち入らず、フロントエンドエンジニアでも本番環境へ介入できる。
ここでは、Supabaseが提供する REST API をクライアントから直接利用し、Next.jsでのバックエンドロジックを排除する。

開発環境においてDockerを必ずしも必要としないため、「Todo App」を構築する上で、おそらく最も簡単な方法のひとつである。イメージとしては、SupabaseをMicroCMSに変更すると、現代的なフロントエンド技術を活用したコーポレートサイトが開発できる。

#### 技術選定
- Frontend
  - Vercel CDN (Static from Next.js)
    - Next.js App Router
      - TSX
      - TailwindCSS
      - TypeScript
- Backend
  - Supabase (PostgreSQL)
