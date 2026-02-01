# GitHub Pages 部署指南

## ✅ 已完成的工作

1. **创建 GitHub Actions workflow** - `.github/workflows/deploy-demo.yml`
2. **更新配置** - exampleSite/config.toml 主题名称已更新
3. **推送到 GitHub** - 所有更改已提交并推送

## 🚀 启用 GitHub Pages（需要手动操作）

### 步骤 1: 访问仓库设置

1. 打开浏览器，访问：https://github.com/iron6909/clarity
2. 点击顶部的 **Settings** 标签
3. 在左侧菜单中找到 **Pages**

### 步骤 2: 配置 Pages

在 Pages 设置页面：

1. **Source** 部分：
   - 选择 **GitHub Actions** （不是 Deploy from a branch）

2. 点击 **Save**（如果有的话）

### 步骤 3: 触发部署

配置完成后，GitHub Actions 会自动运行：

1. 访问 **Actions** 标签：https://github.com/iron6909/clarity/actions
2. 你应该会看到 "Deploy Demo Site to GitHub Pages" workflow 正在运行
3. 等待几分钟，直到部署完成（绿色勾号）

### 步骤 4: 访问你的 Demo 站点

部署完成后，你的 demo 站点将可以通过以下 URL 访问：

**https://iron6909.github.io/clarity/**

---

## 📝 更新 theme.toml

部署完成后，记得更新 `theme.toml` 中的 demosite URL：

```toml
demosite = "https://iron6909.github.io/clarity/"
```

---

## 🔄 自动部署

从现在开始，每次你推送到 main 分支时，demo 站点都会自动更新。

---

## ⚠️ 注意事项

1. **首次部署** 可能需要 5-10 分钟
2. **后续部署** 通常只需要 2-3 分钟
3. 如果遇到问题，检查 Actions 标签中的构建日志

---

## 🎯 下一步

1. 启用 GitHub Pages（按照上面的步骤）
2. 等待部署完成
3. 访问 https://iron6909.github.io/clarity/ 确认站点正常
4. 更新 theme.toml 中的 demosite URL
5. 提交到 Hugo Themes

---

**需要帮助？** 如果遇到任何问题，请告诉我！
