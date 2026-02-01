# Hugo Themes 提交指南

## 📋 提交前检查清单

### ✅ 必需文件（已完成）

- [x] **README.md** - 包含主题介绍、功能列表、安装说明
- [x] **theme.toml** - 包含主题元数据（名称、作者、许可证、标签等）
- [x] **LICENSE.md** - GPLv2 许可证
- [x] **exampleSite/** - 示例站点目录
- [x] **images/screenshot.png** - 主题截图（1500x1000px 推荐）
- [x] **images/tn.png** - 缩略图（900x600px 推荐）

### ✅ 在线资源（已完成）

- [x] **GitHub 仓库**: https://github.com/iron6909/clarity
- [x] **Demo 站点**: https://clarity-demo.netlify.app/ （已部署并可访问）
- [x] **文档**: https://clarity-demo.netlify.app/docs/

### 📝 主题信息

**主题名称**: Clarity
**基于**: Mainroad by Vimux
**许可证**: GPLv2
**最低 Hugo 版本**: 0.54.0

**主要特性**:
- 响应式设计
- 自动暗黑模式支持（prefers-color-scheme）
- CSS Custom Properties（CSS 变量）
- 多语言支持（15+ 语言）
- 可配置的侧边栏和小部件
- 现代浏览器兼容性

**标签**: blog, responsive, dark-mode, light, multilingual, customizable, widgets, modern, minimalist

---

## 🚀 提交步骤

### 步骤 1: Fork Hugo Themes 仓库

1. 访问 https://github.com/gohugoio/hugoThemes
2. 点击右上角的 "Fork" 按钮
3. Fork 到你的 GitHub 账号

### 步骤 2: 添加主题到 themes.txt

1. 在你 fork 的仓库中，编辑 `themes.txt` 文件
2. 在文件末尾添加一行：
   ```
   https://github.com/iron6909/clarity.git
   ```
3. 保存文件

### 步骤 3: 创建 Pull Request

1. 提交更改到你的 fork
2. 创建 Pull Request 到 `gohugoio/hugoThemes` 的 `main` 分支
3. 使用以下 PR 标题和描述：

**PR 标题**:
```
Add Clarity theme
```

**PR 描述**:
```markdown
## Theme Information

**Theme Name**: Clarity
**Repository**: https://github.com/iron6909/clarity
**Demo**: https://clarity-demo.netlify.app/
**License**: GPLv2

## Description

Clarity is a modern, responsive Hugo theme with automatic dark mode support and CSS Custom Properties. It's based on the popular Mainroad theme by Vimux, with significant enhancements for 2026+.

## Key Features

- ✨ Automatic dark mode via `prefers-color-scheme`
- 🎨 CSS Custom Properties for runtime theme customization
- 📱 Fully responsive design
- 🌍 Multilingual support (15+ languages)
- 🔧 Highly customizable via config.toml
- 🚀 Modern browser compatibility (Chrome 88+, Firefox 78+, Safari 14+)

## Checklist

- [x] README.md with installation instructions
- [x] theme.toml with complete metadata
- [x] LICENSE.md (GPLv2)
- [x] exampleSite/ directory
- [x] images/screenshot.png and images/tn.png
- [x] Live demo site deployed
- [x] Theme is publicly accessible on GitHub

## Attribution

This theme is based on [Mainroad](https://github.com/Vimux/Mainroad) by Vimux. Full attribution is provided in the NOTICE.md file and theme.toml.
```

### 步骤 4: 等待审核

Hugo Themes 团队会审核你的提交。审核过程可能需要几天到几周时间。他们可能会：
- 要求修改某些内容
- 测试主题的兼容性
- 检查是否符合 Hugo Themes 的标准

---

## 📌 注意事项

1. **保持仓库公开**: 确保 https://github.com/iron6909/clarity 始终是公开的
2. **维护 demo 站点**: 确保 https://clarity-demo.netlify.app/ 始终可访问
3. **及时响应反馈**: 如果审核团队提出问题，及时回复和修改
4. **遵循许可证**: 确保正确标注基于 Mainroad 主题的信息

---

## 🔗 相关链接

- **Hugo Themes 仓库**: https://github.com/gohugoio/hugoThemes
- **Hugo Themes 网站**: https://themes.gohugo.io/
- **提交指南**: https://github.com/gohugoio/hugoThemes#adding-a-theme-to-the-list

---

## ✅ 当前状态

- [x] 所有必需文件已准备完毕
- [x] Demo 站点已部署并可访问
- [x] README.md 截图链接已更新
- [ ] Fork Hugo Themes 仓库
- [ ] 添加主题到 themes.txt
- [ ] 创建 Pull Request
- [ ] 等待审核通过

---

**准备完成！你现在可以开始提交流程了。**
