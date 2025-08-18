# はじめに

Next.js は非常に抽象化されているため、公式ドキュメントをそのまま読み進めても、理解に苦しむことが多々ありました。特に、非同期処理を伴う通信処理は、その挙動を把握するために、バックエンドの基礎的な理解が必要だと感じました。

そこで、シンプルな「Todo App」を段階的に構築し、バックエンドを含めた開発の全体像を学習しました。version:1〜7 は「技術理解の過程」としての学習記録であり、version:8 は成果物として Vercel を利用して本番環境にデプロイしています。

---
# All version

>[!WARNING]
version:1〜7は、それぞれ確認用にCodesanboxのURLを添付しています。devcontainerを活用したローカル開発環境での動作確認はできておりますが、VM Sandbox上での挙動が不安定な場合がございます。ご了承ください。

## version:1 - Only JavaScript(Array)

まずは Vanilla JavaScript のみで「Todo App」を作成。一見すると、うまく機能しているように思えるが、ブラウザを再読み込みするとデータが消失してしまう。JavaScriptの配列でデータを保持しているため、永続化することがそもそも不可能である。

### 技術選定
- Frontend: HTML, CSS, JavaScript (Array)
- Backend: -


---

## version:2 - IndexedDB(WebAPI)

version:1 の課題を踏まえ、ブラウザ内にデータを永続化するため IndexedDB を利用しました。
ただし、別のブラウザや端末ではデータが同期されないため、依然として実用性には制限があります。異なる環境からでも同一のデータソースに接続したい。

### 技術選定
- Frontend: HTML, CSS, JavaScript ,IndexedDB(WebAPI)
- Backend: -

### Previw URL (Codesanbox)
---

## version:3 - Node.js(Express)+SQLite

version:2 の課題を踏まえ、ブラウザの外部に記憶領域を置く。実用的な「Todo App」にはバックエンドが必須である。手始めに、Node.js(Express)とSQLiteを組み合わて、REST API を構築する。これにより、異なる環境からでも同一のデータソースに接続でき、基本的なCRUD操作をクライアントから通信越しに行うことができる。

### 技術選定
- Frontend (Express Static + Vite): HTML, CSS, JavaScript
- Backend: Node.js, Express, Prisma, SQLite

### version:4 - Node.js(Express+Prisma)+Vite+SQLite

version:3 によって機能要件は満たされている。ここからは、段階的に改良を重ねて、現代的なフロントエンドを主軸としたフルスタック構成に近づけていく。まずは、フロントエンドの分散化されたモジュールを、Viteでバンドルし、パフォーマンスの改善を図る。バックエンドでは、Prisma(ORM)を導入して、Database層の抽象化を図る。

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

### version:5 - NGNIX(Vite:React)+Node.js(Express+Prisma)+PostgreSQL

version:3β の構成では、Node.jsに責務が集中している。「Todo App」は小規模なため、問題は表面化しないが、プログラミングの定石としては「単一責任」の法則がある。肥大化した責務を分割し、三層構造を構築する。

- Web Server (nginx)
- API Server (Node.js)
- Database Server (PostgreSQL)

Web Server には、Viteで生成した静的ファイルの配信とAPI Server への振り分けを委任する。Database Serverの独立に伴い、ファイルベースのSQLiteからより汎用的なPostgreSQLへ移行する。分散化されたバックエンドの開発環境としてDockerを導入する。更なる改良として、フロントエンドは、より宣言的にUI構築をするためにReactを利用する。すでに導入済みのVite を基盤として React + CSS Modules で全体的に書き換える。SPA (Single Page Application)への転換を図り、モダンなフロントエンドエコシステムとの接点を持たせる。

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


### version:6 - Next.js(API Routes+Prisma)+PostgreSQL

version:5では、Reactを導入して、現代的なフロントエンド構成に

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


### version:7 - Next.js(Server Function+Prisma)+PostgreSQL

version:6では、Expressで構築した REST API を、Next.js が提供する API Routes に移行した。

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


### version:8 - Next.js+Supabase Client

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
