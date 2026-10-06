# Colorful 官网（GitHub Pages）

首页介绍 Colorful 语言与快捷安装；`docs.html` 是「从零开始」的完整教程，
包含插件下载与工具链、环境下载链接。

站点是**纯静态文件**：没有构建步骤，也没有任何外部请求（字体用系统字体栈、
图标是内联 SVG、样式与脚本都在 `assets/` 下）。把文件传上去即可访问。

---

## 一、需要创建什么名字的仓库

| 方案 | 仓库名 | 最终地址 | 说明 |
| --- | --- | --- | --- |
| **组织站点（推荐）** | `colorful-lang.github.io` | `https://colorful-lang.github.io/` | 仓库名必须**完全等于** `<组织名>.github.io`，地址最干净 |
| 项目站点 | 例如 `website` | `https://colorful-lang.github.io/website/` | 仓库名随意，地址会多一层路径 |
| 个人站点 | `<你的用户名>.github.io` | `https://<你的用户名>.github.io/` | 用个人账号时同理 |

仓库必须是 **public** —— GitHub Pages 对免费账号只在公开仓库上提供服务。

> 如果仓库名不是 `<组织名>.github.io`，它会被当作**项目站点**，
> 此时页面里的相对链接（`assets/...`、`docs.html`）依然正常工作，
> 因为本站所有路径都是相对路径。

---

## 二、需要上传什么文件

把 `website/` 目录里的**全部内容**上传到仓库**根目录**（不要多套一层 `website/`）：

```text
<仓库根>/
  index.html                 首页：语言介绍 + 快捷安装
  docs.html                  文档：从零开始教程 + 下载链接
  404.html                   找不到页面时的提示
  .nojekyll                  空文件，关闭 Jekyll 处理
  README.md                  本文件（可选）
  assets/
    css/style.css            全部样式（含深色/浅色）
    js/app.js                主题、菜单、复制、目录高亮
    img/colorful.svg         站点图标
    img/colorful.png         Apple touch icon
```

共 **9 个文件**。

`.nojekyll` 必须是**空文件**。它的作用是让 GitHub Pages 跳过 Jekyll 处理，
否则以 `_` 开头的文件/目录会被忽略。

---

## 三、启用 GitHub Pages

1. 打开仓库 → **Settings** → 左侧 **Pages**；
2. **Source** 选择 `Deploy from a branch`；
3. **Branch** 选 `main`，目录选 `/ (root)`，点 **Save**；
4. 等 1～2 分钟，Pages 页面顶部会显示可访问地址。

改动推送后会自动重新发布，通常几十秒生效。

---

## 四、上传方式

### 网页上传

仓库页面 → **Add file** → **Upload files** → 把 `website/` 里的内容拖进去 → **Commit**。

注意：网页上传无法创建空文件 `.nojekyll`。可以在仓库里用
**Add file → Create new file**，文件名填 `.nojekyll`，内容留空，提交即可。

### 命令行推送

```bash
cd website
git init -b main
git add .
git commit -m "Add Colorful website"
git remote add origin https://github.com/colorful-lang/colorful-lang.github.io.git
git push -u origin main
```

---

## 五、本地预览

直接双击 `index.html` 就能看。若想验证 404 页面与相对路径，起一个本地服务器：

```bash
python -m http.server 8000
# 访问 http://localhost:8000/
```

---

## 六、把链接换成你自己的

站点里的链接默认指向 `colorful-lang` 这个组织。若你的账号或组织名不同，
全局替换这三处即可：

- `https://github.com/colorful-lang/colorful` —— 语言仓库
- `https://github.com/colorful-lang/colorful-vscode` —— 插件仓库
- `https://github.com/colorful-lang/colorful-lang.github.io` —— 本站仓库

**建议**：在插件仓库发一个 Release，把构建好的 `colorful-lang-0.1.0.vsix`
作为附件上传。这样首页与文档页的「下载插件」按钮（指向
`.../releases/latest`）就能落到真实文件上。

---

## 七、绑定自定义域名（可选）

1. 仓库根目录新增 `CNAME` 文件，内容为你的域名，例如 `colorful.example.com`；
2. 在域名服务商添加 CNAME 记录指向 `<组织名>.github.io`；
3. 回到 Settings → Pages，勾选 **Enforce HTTPS**。

---

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `index.html` | 首页：Hero、六大特性、三条快捷安装路线、工具链表、跳转文档的入口 |
| `docs.html` | 从零开始（环境准备 / 三条安装路线 / 第一个程序 / 编译运行）、语言速览（类型、函数、控制流、record 与 protocol、异常、集合、模块）、21 个标准库模块、GUI 编程、测试、包管理、工具链参数、下载与链接、常见问题 |
| `404.html` | 页面不存在时的提示与出口 |
| `.nojekyll` | 空文件，关闭 Jekyll |
| `assets/css/style.css` | 全部样式，含 `data-theme` 驱动的深色/浅色配色与响应式断点 |
| `assets/js/app.js` | 主题切换（持久化）、移动端菜单、代码块复制、文档目录滚动高亮 |
| `assets/img/colorful.svg` | 官方 `.cf` 图标，用作 favicon 与页面标识 |
| `assets/img/colorful.png` | 同一图标的光栅版本，用于 Apple touch icon |

---

## 维护提示

- 站点内容与语言实现是同步的：文中出现的语法、标准库模块名、工具参数都取自实际实现。
  语言有变化时，请同步更新 `docs.html` 里对应的章节。
- 新增标准库模块时，记得更新 `docs.html#stdlib` 的表格与首页的模块数量文案。
- 主题色与图标配色一致（`#0b2a6f` → `#2f9bff`），改动配色时两处一起改。
