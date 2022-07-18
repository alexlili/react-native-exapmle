# react-native-exapmle

react-native-app 栗子

#### -------分割线-------
#### 更新于2022年7月18日
#### 坐标上海，目前在找工作。。。（好难🤣）
#### 本项目是我在上家公司空闲时间单独做的项目，本来想试图上架卷一下的，结果业务线在5月封控期间被砍，嘻嘻嘻，没机会咯。
#### 悲催经历小小说明一下。。。
#### 2016年双非院校研究生毕业，水硕一枚，专业信号与信息处理，方向医疗器械。本来不想写代码，为了生活选择了前端开发，抢计算机饭碗（我也不想。。。）
#### 2016-2019 在P2P行业，独立负责公司APP开发，H5开发，技术栈react-native（行业倒闭😵）
#### 2020-2021 在在线教育行业，做H5(PC端、公众号)、小程序，技术栈Vue（行业倒闭😵）
#### 2021-2022 在创业公司，做PC端后台管理系统，技术栈react+TS（因疫情裁员）
#### 本项目iOS和Android应该都可以运行起来，完全按照官方文档来进行开发的，借鉴了一下之前自己做的RN项目架构。

### 环境配置
#### 按照官方文档先把环境都配置好，xcode、Android studio都安装好，以及一些必要的依赖都安装好。官方文档地址：https://reactnative.cn/
##### iOS开发配置

- 推荐使用[Homebrew](https://brew.sh/index_zh-cn)进行安装，所以需要先安装homebrew，命令如下：

  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```

- 安装Node、Watchman 和 CocoaPods

  ```bash
  brew install node
  brew install watchman
  brew install cocoapods
  ```

- 安装yarn

  ```bash
  npm install -g yarn
  ```

- 安装Xcode

  到App Store中下载Xcode即可，安装完毕后打开，安装相应组件

##### Android开发配置

- 同上安装Homebrew、node、watchman

- 安装JDK（Java Development Kit）

  ```bash
  brew install adoptopenjdk/openjdk/adoptopenjdk8
  ```

  安装后使用以下命令来看是否安装成功

  ```bash
  javac -version
  ```

- 安装 Android Studio

  点击[Android develop](https://developer.android.google.cn/studio/)进行下载，有VPN的尽量开启VPN。安装界面中选择"Custom"选项，确保选中了以下几项：Android SDK、Android  SDK Platform、Android  Virtual  Device

### iOS-DEMO体验（详情请点击 [RN官网地址](https://reactnative.cn/)）

- 如果曾经安装过react-native-cli，建议uninstall
- npm install --global expo-cli
- npx react-native init AwesomeTSProject --template react-native-template-typescript
- cd AwesomeProject 运行 yarn ios
- cd AwesomeProject 运行 yarn react-native run-ios
- cd AwesomeProject 运行 yarn start启动metro，然后打开xcode，点击编译按钮

### 本项目iOS版本体验命令同上，可以在特定环境下进行开发，接口环境可以配置，自行根据公司项目更改即可
- 运行 npm run ios:dev 表示在dev环境下运行APP
- 运行 npm run ios:qa 表示在qa环境下运行APP
- 运行 npm run ios:prod 表示在prod环境下运行APP
#### 脚本里的环境配置其实就是接口环境，iOS打包ipa需要在xcode里面进行打包，无法通过命令打包，这里就不详述了，自行谷歌。

### 本项目Android体验命令如下
- 运行 npm run android:dev 表示在dev环境下运行APP，将安装到模拟器上运行
- 运行 npm run android:qa 表示在qa环境下运行APP，将安装到模拟器上运行
- 运行 npm run android:prod 表示在prod环境下运行APP，将安装到模拟器上运行
### Android的apk包可以通过命令打包
- 运行 npm run android:qa:release 表示打包出来的包为qa环境，可以直接在android->output中找到发送给安装到手机里进行测试
- 运行 npm run android:qa:release 表示打包出来的包为prod环境，可以直接在android->output中找到安装到手机里进行测试



