# 蓝色生日奇想剧场

一个苹果风格的中文生日祝福网页，以蓝色为主色系，包含长页面章节、可切换舞台、玻璃拟态界面、柔和动效、定制鼠标、点击祝福粒子和蜡烛彩蛋。

页面用符号化方式致敬这些灵感来源：

- 音乐剧 SIX：王冠、麦克风、聚光灯
- 音乐剧芝加哥：爵士灯牌、帽子、椅子舞氛围
- 老友记：沙发、咖啡、门框
- 重返未来：1999：手提箱、雨幕、复古时间
- 锈湖：方块、湖面、钥匙
- 阴阳师：符咒、阴阳纹、风铃
- 夜幕之下：夜色、迷雾、钥匙

## 使用

直接打开 `index.html` 即可查看。

也可以在项目目录运行本地服务：

```bash
python3 -m http.server 5173
```

然后访问：

```text
http://localhost:5173
```

## 后台设置

生日解锁时间在 `birthday-config.js` 里：

```js
window.BIRTHDAY_CONFIG = {
  birthdayDate: "2026-07-18",
  birthdayName: "晓彤姐姐",
  birthdayAge: 21,
  forceUnlocked: false
};
```

- `birthdayDate`：北京时间当天 `00:00` 解锁。
- `forceUnlocked`：改成 `true` 可以临时跳过倒计时，方便预览后面的页面。

## 替换舞台图片

把图片放进 `assets` 目录，例如：

```text
assets/xiaotong-stage.jpg
```

然后在 `index.html` 里把这一行：

```html
<img src="./assets/stage-photo-placeholder.svg" alt="可替换的生日照片" />
```

改成：

```html
<img src="./assets/xiaotong-stage.jpg" alt="晓彤姐姐的生日照片" />
```

## 彩蛋

- 鼠标会变成蓝色光点和光环。
- 点击任意位置会出现祝福词和蓝色纸屑。
- 点击蛋糕或「点亮祝福」会吹灭蜡烛。
- 点击各个 IP 章节会切换到对应舞台并触发彩蛋。
- 解锁后开场会出现可拖拽视角的蛋糕星云。
- 按键盘 `B` 会触发一次大祝福。
