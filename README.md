# 生日奇想剧场

一个可直接定制和部署的中文生日祝福网页。它包含生日倒计时、长按点亮蛋糕、回忆相册、兴趣宇宙、画符抽祝福、逐行来信、点击粒子，以及可拖动的 3D 星云终章。

仓库内只保留虚构示例文案和原创 SVG 插画，不包含真人照片或私人经历。

## 快速开始

项目没有构建步骤。由于页面包含 iframe 和摄像头权限功能，请通过本地 HTTP 服务预览，不要直接双击 HTML：

```bash
python3 -m http.server 5173
```

然后访问 `http://localhost:5173`。

## 定制内容

日常修改只需要编辑 [`config/site.js`](./config/site.js)：

| 字段 | 用途 |
| --- | --- |
| `recipient` | 收件人名字、年龄和生日日期 |
| `previewMode` | `true` 时跳过日期锁，发布定时惊喜前改为 `false` |
| `hero` | 蛋糕文字和漂浮祝福 |
| `photos` | 相册图片、日期、地点和照片说明 |
| `interests` | 兴趣行星、弹窗标题、插图和祝福 |
| `gachaBlessings` | 好运抽卡的卡面内容 |
| `letter` | 来信标题和逐行文案 |
| `finale` | 终章和星云中显示的文字 |

生日日期使用 `YYYY-MM-DD` 格式，并按北京时间当天 `00:00` 解锁。

### 替换相册

1. 把自己的图片放到 `assets/photos/`，推荐使用经过压缩的 WebP 或 JPEG。
2. 在 `config/site.js` 的 `photos` 数组里修改 `image`、`alt`、日期和说明。
3. 不需要四张照片；增删数组项后页面会自动重新排版。

例如：

```js
{
  date: "2026.08.08",
  location: "海边",
  title: "一起看过的日落",
  note: "这里写照片背后的故事。",
  image: "./assets/photos/sunset.webp",
  alt: "两个人在海边看日落",
  cardClass: "tilt-left",
  tapeClass: "tape-left",
  sticker: "✦",
}
```

公开部署前，请确认照片中的人同意公开，并清除不必要的 EXIF 位置数据。

## 项目结构

```text
.
├── assets/
│   └── illustrations/   # 可公开的示例插画
├── config/
│   └── site.js          # 集中管理所有可定制内容
├── experiences/
│   └── saturn.html      # 独立的 3D 星云体验
├── scripts/
│   └── app.js           # 页面渲染与交互逻辑
├── styles/
│   └── site.css         # 页面样式与响应式规则
├── index.html           # 页面结构
├── LICENSE
└── README.md
```

`config/` 是内容层，`scripts/` 是行为层，`styles/` 是视觉层。新增祝福或更换照片时，不需要修改交互逻辑。

## 摄像头与第三方依赖

页面默认不会申请摄像头权限。只有点击“开启手势互动”后，浏览器才会请求权限；视频帧只在当前页面中交给 MediaPipe Hands 处理，不会由本项目上传或保存。拒绝权限不影响拖动浏览星云。

Three.js、OrbitControls 和 MediaPipe Hands 通过 CDN 加载，因此首次访问需要网络连接。本项目未内置统计、广告或用户追踪。

## 部署

这是纯静态项目，可以部署到 GitHub Pages、Cloudflare Pages、Netlify 或任意静态文件服务器。GitHub Pages 可将发布源设置为 `main` 分支根目录。

部署前建议：

```bash
rg '小星|示例|assets/illustrations' config index.html
```

用它检查是否还有未替换的示例内容。若仓库历史曾提交过私人照片，仅删除当前文件并不够；公开前还应重写 Git 历史或从当前干净版本创建新的仓库。

## 许可证

代码和仓库内的原创示例 SVG 使用 [MIT License](./LICENSE)。你自行加入的照片、字体、音视频及第三方素材不自动获得 MIT 授权，请分别确认使用许可。
