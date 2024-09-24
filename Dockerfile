# Node.js公式イメージをベースに使用
FROM node:14

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# React開発サーバーを起動
CMD ["npm", "start"]
