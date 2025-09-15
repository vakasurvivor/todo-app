# はじめに

`Next.js`は非常に抽象化されているため、公式ドキュメントをそのまま読み進めても、困惑することが多々ありました。とくに`API Routes`や`Server Function`など、通信処理を伴う非同期処理の挙動を把握するためには、基礎的なサーバーサイドの前提知識が不可欠だと感じました。

そこで`CURD`操作を含むシンプルな「Todo」アプリケーションを牧歌的な技術構成から段階的に作成し、バックエンドを含めた全体像を学習しました。`version_001`〜`007`は「技術理解」としての学習記録であり、`version:_008`は成果物として本番環境（Vercel）にデプロイしています。

---

>[!WARNING]
version:1〜7は、それぞれ確認用に Codesanbox のURLを添付しています。Dev Container を利用したローカル環境での動作確認はできておりますが、VM Sandbox 上での挙動が不安定な場合がございます。ご了承ください。

## version_001 - Only JavaScript (Array)

まずは`Vanilla JavaScript`のみで作成。一見すると、うまく機能しているように思えるが、ブラウザを再読み込みするとデータが消失してしまう。配列でデータを保持しているため、揮発性を克服することができない。言語仕様のみでの永続化は、そもそも不可能なことを再確認。

> [!NOTE]Codesanbox Preview
> 確認用URL ➜ [version_001](https://giscus.app)

### 技術選定
|          | Tech Stack                                          |
| :------: | --------------------------------------------------- |
| Frontend | HTML</br>CSS</br>JavaScript <ul><li>Array</li></ul> |
| Backend  | -                                                   |

---

## version_002 - IndexedDB (Web API)

`version_001`の課題を踏まえ、ブラウザ内にデータを永続化するため`IndexedDB (Web API)`を選択。ブラウザを再読み込みしても、データが揮発せず、うまく機能しているように思える。しかし、別のブラウザや端末ではデータが同期されないため、依然として実用性には難がある。異なる環境からでも同一データソースへの接続を実現するべきである。

> [!NOTE]Codesanbox Preview
> 確認用URL ➜ [version_002](https://giscus.app)

### 技術選定
|          | Tech Stack                                                      |
| :------: | --------------------------------------------------------------- |
| Frontend | HTML</br>CSS</br>JavaScript<ul><li>IndexedDB (WebAPI)</li></ul> |
| Backend  | -                                                               |

---

## version_003 - Node.js (Express/SQLite)

`version_002`の課題を踏まえると、ブラウザの外部に独立した記憶領域を置く必要がある。つまり、実用的なアプリケーションにはバックエンドが不可欠である。まずは、`Node.js(Express)`と`SQLite`を組み合わて、`REST API`サーバーを構築する。これにより、異なる環境からでも同一のデータソースに接続でき、永続化が保証された状態で、クライアントから通信越しに`CRUD`操作を行うことができる。

> [!NOTE]Codesanbox Preview
> 確認用URL ➜ [version_003](https://giscus.app)

### 技術選定

|          | Tech Stack                                      |
| :------: | ----------------------------------------------- |
| Frontend | HTML</br>CSS</br>JavaScript                     |
| Backend  | Node.js<ul><li>Express</li><li>SQLite</li></ul> |

---

## version:4 - Node.js (Express/Vite/Prisma/SQLite)

`version_003`によって、データの永続化という絶対条件は満たされている。ここからは、段階的に改良を重ねて、現代的なフロントエンドを主軸としたフルスタック構成に近づけていく。まずは、フロントエンドの分散化されたモジュールを、Viteでバンドルし、パフォーマンスの改善を図る。バックエンドでは、Prisma(ORM)を導入して、Database層の抽象化を図る。

> [!NOTE]Codesanbox Preview
> 確認用URL ➜ [version_004](https://giscus.app)

### 技術選定
|          | Tech Stack                                                     |
| :------: | -------------------------------------------------------------- |
| Frontend | HTML</br>CSS</br>JavaScript                                    |
| Backend  | Node.js<ul><li>Express</li><li>Prisma</li><li>SQLite</li></ul> |

---

## version:5 - nginx (Vite/React) + Node.js (Express/Prisma) + PostgreSQL

`version_004`の構成では、`Node.js`に責務が集中している。ここでは、肥大化した`Node.js`の責務を分割し、サーバーサイドを以下のような三層構造に移行する。

`Web Server`には、`Vite`で生成した静的ファイルの配信と`API Server`へのプロキシを委任する。`Database Server`の独立に伴い、ファイルベースの`SQLite`からより汎用的な`PostgreSQL`へ移行する。分散化されたバックエンドの開発環境として`Docker`を導入する。

|   Server Type   | Tech Stack               |
| :-------------: | ------------------------ |
|   Web Server    | nginx (Vite/React)       |
|   API Server    | Node.js (Express/Prisma) |
| Database Server | PostgreSQL               |



フロントエンドは、より宣言的に記述するために`React`を利用する。すでに導入済みの`Vite`を基盤として`JSX` + `CSS Modules`で全体的に書き換える。`SPA (Single Page Application)`への転換を図り、モダンなフロントエンドエコシステムとの接点を持たせる。

> [!NOTE]Codesanbox Preview
> 確認用URL ➜ [version_005](https://giscus.app)

### 技術選定

|          | 使用技術                                                                                                                          |
| -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | <ul><li>JSX</li><li>CSS Modules</li><li>Javacript</li></ul>                                                                       |
| Backend  | nginx (Docker)<ul><li>Vite × React SPA(dist)</li></ul>Node.js (Docker)<ul><li>Express</li><li>Prisma</li></ul> PostgreSQL(Docker) |

---

## version:6 - Next.js (API Routes/Prisma) + PostgreSQL

`version_005`では、フロントエンドは`Vite`を基盤とした`React`の導入によって`SPA`に移行した。`version_005`構成では、原則的に`CSR(Client Side Rendering)`になる。`CSR`の代表的な短所として、toCを考慮する場合に、初期表示の遅延やSEOなどの懸念点が挙げられる。

そうした課題を克服するために`SSR(Server Side Rendering)`が存在する。`SSR`を実現するために、`React`に準拠したフルスタックフレームワークが必要である。ここでは`Next.js(App Router)`を利用する。`Vercel`にデプロイすることを前提とすると、`Web Server`と`API Server`を統合できる。

`express`で実現していた`REST API`を、`API Routes`として書き換える。`JavaScript`から`TypeScript`に,`CSS Module`から`Tailwind CSS`に書き換える。


ハイブリッド構成で、フロントエンドとバックエンドの境界が曖昧になる。

> [!NOTE]Codesanbox Preview
> 確認用URL ➜ [version_006](https://giscus.app)

### 技術選定


| -        | 使用技術                                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| Frontend | Vercel CDN (Static from Next.js)</br>Next.js App Router<ul><li>TSX</li><li>TailwindCSS</li><li>TypeScript</li></ul> |
| Backend  | Vercel Function (AWS Lambda)<ul><li>API routes (REST API)</li><li>Prisma</li></ul> PostgreSQL(Docker)               |
---

## version:7 - Next.js(Server Function+Prisma)+PostgreSQL

`version_006`では、Expressで構築した REST API を、Next.js が提供する API Routes に移行した。

`Server Function`

`RPC（Remote Procedure Call)`のように`API Routes`を挟まずに、直接サーバー関数を

> [!NOTE]Codesanbox Preview
> 確認用URL ➜ [version_007](https://giscus.app)

### 技術選定

|          | 使用技術                                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| Frontend | Vercel CDN (Static from Next.js)</br>Next.js App Router<ul><li>TSX</li><li>TailwindCSS</li><li>TypeScript</li></ul> |
| Backend  | Vercel Function (AWS Lambda)<ul><li>Server Function (RPC)</li><li>Prisma</li></ul> PostgreSQL (Docker)              |

---

## version:8 - Next.js+Supabase(PostgreSQL)

本番環境へ移行するために、PostgreSQLを基盤としたSupabase(Bass)を利用する。Pass(Vercel) + Bass(Supabase) の組み合わせによって、サーバーの技術的な詳細に立ち入らず、フロントエンドエンジニアでも本番環境へ介入できる。

ここでは、Supabaseが提供する REST API をクライアントから直接利用し、Next.jsでのバックエンドロジックを排除する。開発段階においても、Docker等の仮想環境に依存しないため、「Todo App」を構築するうえで、もっとも簡単な方法のひとつである。

> [!NOTE]Codesanbox Preview
> 確認用URL ➜ [version_008](https://giscus.app)

### 技術選定

|    -     | Tech Stack                                                                          |
| :------: | ----------------------------------------------------------------------------------- |
| Frontend | Next.js App Router<ul><li>TSX</li><li>TailwindCSS</li><li>TypeScript</li></ul>      |
| Backend  | Vercel CDN (Static from Next.js)</br>Server Function(RPC)</br>Supabase (PostgreSQL) |
