![](https://github.com/pinkomeo/Dig/blob/master/images/icon128.png)
# Dig - An information gathering extension
---

Dig是一款可定制化的信息搜集插件
一款让您在网页浏览时就可以轻松获取信息并前端展示的Chrome扩展

## Motivation

之前做的大量工作是在 `web` 页面寻找 `ActiveX` 控件，手动找需要点开 `Devtool` ，然后点击 `Source` ，然后再一个一个打开JS脚本，再 `Ctrl+F` 去找。但是有控件的页面一定会有js代码去调用这个控件，使用clsid去调用就变成了这类网页的特征。

同样的，前渗透过程的大部分时间不过是搜集大量的信息，进而引导下一步操作，比如**页面上是否有指向后台的链接、是否暴露了和管理员有关的邮箱，手机号码、是否有被注释掉的信息和flag😜**

所以我们可以把带有指纹特征的搜寻操作，或者说代码级别的识别操作交给扩展来做，我们在浏览这个网页的过程中，就可以实现关键信息的"Dig"。


## Installation

1. 下载项目到本地某个文件夹如 `D：/Dig-master/`
2. 进入Chrome浏览器后，点击右上角菜单里面的 `更多工具` -> `扩展程序`（或者使用地址栏，访问 `chrome://extensions/`）
3. 勾选 `开发者模式`，然后点击页面左上角的  `加载已解压的扩展程序...`，在弹出的页面，选择步骤1中保存项目的文件夹即可


## Usage

- 当插件运行时，访问某个页面，插件会将所有功能提供的结果数目显示在下角标

  ![](https://github.com/pinkomeo/Dig/blob/master/images/demo1.png)

- 下图是开启了 `匹配邮箱` 和 `查找所有clsid调用` 两个功能后，访问seebug某页面的展示界面。

<div align=center><img height="550" src="https://github.com/pinkomeo/Dig/blob/master/images/demo2.png" /></div>

- 当总个数大于20后，插件会突出显示（绿色变成黄色），大于50后会变成红色主题来提醒用户。

<div align=center><img height="550" src="https://github.com/pinkomeo/Dig/blob/master/images/demo3.png" /></div>

## Customization

现在你无须另写插件，只需要一个js函数就可以完成你自己的想法和创意。
#### demo
本节将示例如何让插件完成获取页面所有外链的新功能。
[#todo]

#### api
source
|-html
|-js


## Todo List

- [ ] 完成readme里的示例
- [ ] 自动生成core.js的python脚本
- [ ] 变量函数命名规范
- [ ] 修复 ~~影响一些页面的加载~~ 的问题
- [ ] 增加新功能如 识别电话号码 链接 识别输入框
- [ ] 识别结果 **高亮** 显示
- [ ] 代码性能优化（如果页面卡死= =...别打我我再改



## Change Log
### v1.0.0 2018/03/02
- 完成初步框架结构
- 完成查找搜集所有邮箱和查找clsid的功能
- 美化popup前端界面

## Architecture
[#todo]
test test
