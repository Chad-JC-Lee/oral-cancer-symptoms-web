#!/bin/bash

echo "🚀 開始更新 GitHub 專案..."

# 重新建置專案
echo "📦 重新建置專案..."
npm run build

# 複製到 docs 資料夾
echo "📁 複製建置檔案到 docs 資料夾..."
cp -r build docs

# 添加所有變更
echo "➕ 添加變更到 Git..."
git add .

# 提交變更
echo "💾 提交變更..."
git commit -m "Update website - $(date)"

# 推送到 GitHub
echo "📤 推送到 GitHub..."
git push origin main

echo "✅ 更新完成！"
echo "🌐 您的網站會在幾分鐘內更新："
echo "   https://chad-jc-lee.github.io/oral-cancer-symptoms-web" 