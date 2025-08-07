# GitHub Pages 部署指南

## 步驟 1: 創建 GitHub 專案

1. 前往 [GitHub](https://github.com)
2. 點擊 "New repository"
3. 填寫專案資訊：
   - Repository name: `oral-cancer-symptoms-web` (或您喜歡的名稱)
   - Description: `口腔癌術後主訴表達網頁應用`
   - 選擇 Public
   - 不要勾選 "Add a README file" (我們已經有了)
4. 點擊 "Create repository"

## 步驟 2: 上傳程式碼到 GitHub

在您的本地專案資料夾中執行以下命令：

```bash
# 添加遠端倉庫（請替換 YOUR_USERNAME 和 REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送程式碼到 GitHub
git branch -M main
git push -u origin main
```

## 步驟 3: 設置 GitHub Pages

1. 在 GitHub 專案頁面中，點擊 "Settings" 標籤
2. 在左側選單中找到 "Pages"
3. 在 "Source" 部分：
   - 選擇 "Deploy from a branch"
   - Branch 選擇 "main"
   - Folder 選擇 "/docs"
4. 點擊 "Save"

## 步驟 4: 等待部署

- GitHub 會自動部署您的網站
- 通常需要 1-5 分鐘
- 部署完成後，您會看到一個綠色的勾號
- 您的網站網址會是：`https://YOUR_USERNAME.github.io/REPO_NAME`

## 步驟 5: 測試網站

1. 點擊 GitHub Pages 提供的網址
2. 測試所有功能：
   - 疼痛評估
   - 睡眠困難
   - 管路問題
   - 排泄問題
   - 主訴總結

## 更新網站

當您修改程式碼後，需要重新建置並推送：

```bash
# 重新建置
npm run build

# 複製到 docs 資料夾
cp -r build docs

# 提交變更
git add docs/
git commit -m "Update website"

# 推送到 GitHub
git push origin main
```

## 注意事項

1. **網址格式**: `https://YOUR_USERNAME.github.io/REPO_NAME`
2. **更新時間**: 推送後通常 1-5 分鐘內更新
3. **免費服務**: GitHub Pages 完全免費
4. **自訂網域**: 可以在 Settings > Pages 中設定自訂網域

## 故障排除

### 如果網站無法載入
1. 檢查 Settings > Pages 設定是否正確
2. 確認 docs 資料夾中有 index.html
3. 檢查 Actions 標籤中是否有錯誤

### 如果功能不正常
1. 檢查瀏覽器控制台是否有錯誤
2. 確認所有 JavaScript 檔案都正確載入
3. 測試本地版本是否正常

## 分享給其他人

部署完成後，您可以：
1. 分享 GitHub Pages 網址
2. 在 README.md 中添加網址
3. 創建 QR Code 方便手機掃描

---

**提示**: 建議在 README.md 中添加 "Live Demo" 連結，方便其他人直接試用。 