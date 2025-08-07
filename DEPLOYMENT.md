# 部署指南

## 快速部署選項

### 1. 直接使用（最簡單）
1. 將 `build` 資料夾中的所有檔案複製到任何網頁伺服器
2. 用瀏覽器開啟 `index.html` 即可使用

### 2. GitHub Pages（免費）
1. 將整個專案上傳到GitHub
2. 在GitHub專案設定中：
   - 進入 Settings > Pages
   - Source 選擇 "Deploy from a branch"
   - Branch 選擇 "main" 或 "master"
   - Folder 選擇 "/docs" 或 "/ (root)"
3. 將 `build` 資料夾重新命名為 `docs` 並上傳
4. 等待幾分鐘後即可透過 `https://你的用戶名.github.io/專案名稱` 訪問

### 3. Netlify（免費，推薦）
1. 註冊 [Netlify](https://netlify.com) 帳號
2. 點擊 "New site from Git" 或直接拖拽 `build` 資料夾
3. 如果使用Git：
   - 連接GitHub專案
   - Build command: `npm run build`
   - Publish directory: `build`
4. 獲得一個類似 `https://random-name.netlify.app` 的網址

### 4. Vercel（免費）
1. 註冊 [Vercel](https://vercel.com) 帳號
2. 點擊 "New Project"
3. 連接GitHub專案
4. 框架選擇 "Create React App"
5. 自動部署，獲得一個網址

### 5. Firebase Hosting（免費）
1. 安裝 Firebase CLI: `npm install -g firebase-tools`
2. 登入: `firebase login`
3. 初始化: `firebase init hosting`
4. 選擇 `build` 作為 public directory
5. 部署: `firebase deploy`

## 本地測試

### 使用 serve 套件
```bash
npm install -g serve
serve -s build
```

### 使用 Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### 使用 Node.js
```bash
npx serve build
```

## 注意事項

1. **路由問題**：如果使用 React Router，需要配置伺服器支援 SPA 路由
2. **HTTPS**：建議使用 HTTPS 以確保安全性
3. **快取**：建置後的檔案已經過優化，可以設定適當的快取策略
4. **CDN**：對於大量用戶，建議使用 CDN 加速

## 自訂網域

大多數平台都支援自訂網域：
- Netlify: 在 Domain settings 中設定
- Vercel: 在專案設定中新增自訂網域
- GitHub Pages: 在專案設定中設定 Custom domain

## 監控與分析

可以考慮添加：
- Google Analytics
- Sentry (錯誤追蹤)
- 使用者行為分析工具

## 備份策略

1. 定期備份程式碼到 Git
2. 保留多個部署版本
3. 設定自動化部署流程 