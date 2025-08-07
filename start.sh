#!/bin/bash

echo "🚀 啟動口腔癌術後主訴表達網頁應用..."

# 檢查是否已安裝依賴項目
if [ ! -d "node_modules" ]; then
    echo "📦 安裝依賴項目..."
    npm install
fi

# 啟動開發伺服器
echo "🔥 啟動開發伺服器..."
echo "📱 請在瀏覽器中訪問 http://localhost:3000"
npm start 