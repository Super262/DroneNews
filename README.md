# DroneNews
The [drone_news](https://github.com/Super262/drone_news) is both the web server and the administration site for DroneNews. 
## 软件和硬件环境：

微信开发者工具1.02，IntelliJ IDEA 2019

## 原理和方法：

设计一个微信小程序；开发后端程序以接受小程序的请求；设计数据库，用于保存新闻、视频路径等内容；小程序和后台网站向后台发出请求，后台做出反馈。

## 步骤：

### 一、 需求分析

小程序要实现无人机行业新闻、视频浏览等功能，因此小程序至少有新闻页面和视频页面来展示相应的内容。小程序中的新闻数据和视频数据都应该来自数据库；后台网站显示来自数据库中的信息，并可以对新闻、视频、直播等进行增删改查。

### 二、 概要设计

小程序包括三个模块，分别是资讯模块、视频模块和个人信息模块。小程序的资讯模块的功能包括展示所有资讯的简介和展示当前资讯的全部内容。小程序的视频模块的功能包括展示所有视频的简介、播放当前视频、发表评论、收藏视频、关注作者、举报视频和视频上传。小程序的个人信息模块的功能包括用户注册、用户登录、头像上传、显示已收藏的视频、显示获收藏的视频的数量、显示关注的人发送的视频、显示获关注的数量。网站包括三个模块，分别是资讯模块、视频模块和用户信息模块。网站的资讯模块的功能包括展示所有资讯的重要信息（ID、标题、来源和创建时间）、添加新的资讯和删除资讯。网站的视频模块的功能包括展示所有视频的重要信息（ID、作者ID、描述、时长、宽、高、获赞数量和创建时间）和删除视频。网站的用户模块的功能是展示所有用户的重要信息（ID、头像、用户名、昵称、粉丝数关注数和获赞数）。

### 三、 设计微信小程序的界面和功能逻辑

#### a) 注册界面

用户注册完成后，小程序自动跳转到登录页面。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00001.png)

#### b) 登录界面

用户登录后，小程序跳转到主界面。主界面包括资讯页、视频页和用户信息页。小程序默认加载资讯页。主界面设有底部选择栏，用户可以选择跳转到其它的页面。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00002.png)

#### c) 资讯页

此页面包括所有的资讯简介。单击图片，可以跳转到详情页；单击搜索框，可以跳转到搜索页。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00003.png)

##### 1) 详情页
此页面包括了新闻的详细内容（图片和文字），排版格式与原始的HTML页面保持一致。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00004.png)

##### 2) 搜索页

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00005.png)

搜索页面可以显示搜索记录（本地存储，可以清空）和热搜词（从后台查询得来）。单机热搜词或输入搜索内容后点击“搜索”，小程序会跳转到查询结果页；点击搜索结果中的图片，可以跳转到相应新闻的详情页。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00006.png)


#### d) 视频页
此页面包括所有的视频简介。单击图片，可以跳转到详情页；单击搜索框，可以跳转到搜索页。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00007.png)

##### 1) 详情页

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00008.png)

向下滑动，可以看到底栏和评论信息。底栏的四个按钮分别为“收藏”、“评论”、“下载或举报”和“作者详情”。下图展示了分别单击这四个按钮后的效果。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00009.png)

点击“举报用户”后，小程序跳转至举报页。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00010.png)

##### 2) 搜索页

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00011.png)

搜索页面可以显示搜索记录（本地存储，可以清空）和热搜词（从后台查询得来）。单机热搜词或输入搜索内容后点击“搜索”，小程序会跳转到查询结果页；点击搜索结果中的图片，可以跳转到相应视频的详情页。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00012.png)

#### e) 用户信息页
用户信息页展示了当前用户的用户名、粉丝数、关注数和获赞数。单击头像后，可以上传新的头像。头像下方的区域依次展示了当前用户上传的视频（封面）、当前用户收藏的视频、当前用户所关注的人上传的视频。单击上传视频后，用户可以从手机中选择视频并上传。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00013.png)

### 四、 设计后台接口

针对之前所设计的功能，设计如下的后台接口：

### 1) 登录相关

```
a) regist：用户注册（参数：包含用户信息的封装类）
b) login：用户登录（参数：包含用户信息的封装类）
c) logout：用户退出登录（参数：用户ID）
```
### 2) 新闻相关

```
a) addMsg：添加新闻（参数：标题、来源和包含新闻内容的文件）
b) showAll：返回所有新闻
c) getHTML：返回新闻内容（参数：新闻ID）
```
### d) hot：返回热搜词

### 3) 视频相关

```
a) upload：上传视频（参数：用户ID、标题和视频文件）
b) showMyFollow：返回我关注的人上传的视频（参数：用户ID）
c) showMyLike：返回我收藏的视频（参数：用户ID）
d) hot：返回热搜词
e) userLike：接收用户的收藏请求（参数：用户ID、视频ID和视频作者的ID）
f) userUnLike：接收用户的取消收藏请求（参数：用户ID、视频ID和视频作者
的ID）
g) saveComment：接收用户的评论（参数：评论内容、父评论的ID和当前用户的
ID）
h) getVideoComments：获取某视频的所有评论（参数：视频ID）
```
### 4) 用户相关

```
a) uploadFace：上传头像（参数：用户ID和头像文件）
b) query：查询用户信息（参数：用户ID）
```

```
c) queryPublisher：查询视频发布者的信息（参数：当前用户ID、视频ID和视频
作者的ID）
d) beyourfans：接收关注请求（参数：用户ID,视频作者ID）
e) dontbeyourfans：接收取消关注的请求（参数：用户ID,视频作者ID）
f) reportUser：举报用户（参数：包括举报内容的封装类）
```

### 五、 设计数据库
数据库drone_news一共包含 9 张表，分别为用户信息（users），用户关注关系（users_fans），新闻（messages）， 视 频 （videos）， 视 频 收 藏 关 系 （videos_users_like）,视频评论（videos_comments）,视频举报（videos_users_report）， 视频搜索记录（search_records）， 新闻搜索记录（msg_search_records）。数据库的ER图如下。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00014.png)

### 六、 小程序的界面和关键代码

#### 1. 所有界面

##### a) 注册界面

用户注册完成后，小程序自动跳转到登录页面。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00015.png)

##### b) 登录界面

用户登录后，小程序跳转到主界面。主界面包括资讯页、视频页和用户信息页。小程序默认加载资讯页。主界面设有底部选择栏，用户可以选择跳转到其它的页面。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00016.png)

##### c) 资讯页
此页面包括所有的资讯简介。单击图片，可以跳转到详情页；单击搜索框，可以跳转到搜索页。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00017.png)

###### 1) 详情页
此页面包括了新闻的详细内容（图片和文字），排版格式与原始的HTML页面保持一致。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00018.png)

###### 2) 搜索页

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00019.png)

搜索页面可以显示搜索记录（本地存储，可以清空）和热搜词（从后台查询得来）。单机热搜词或输入搜索内容后点击“搜索”，小程序会跳转到查询结果页；点击搜索结果中的图片，可以跳转到相应新闻的详情页。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00020.png)

##### d) 视频页

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00021.png)

此页面包括所有的视频简介。单击图片，可以跳转到详情页；单击搜索框，可以跳转到搜页。


###### 1) 详情页

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00022.png)

向下滑动，可以看到底栏和评论信息。底栏的四个按钮分别为“收藏”、“评论”、“下载或举报”和“作者详情”。下图展示了分别单击这四个按钮后的效果。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00023.png)

点击“举报用户”后，小程序跳转至举报页。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00024.png)

###### 2) 搜索页

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00025.png)

搜索页面可以显示搜索记录（本地存储，可以清空）和热搜词（从后台查询得来）。单机热搜词或输入搜索内容后点击“搜索”，小程序会跳转到查询结果页；点击搜索结果中的图片，可以跳转到相应视频的详情页。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00026.png)

###### e) 用户信息页
用户信息页展示了当前用户的用户名、粉丝数、关注数和获赞数。单击头像后，可以上传新的头像。头像下方的区域依次展示了当前用户上传的视频（封面）、当前用户收藏的视频、当前用户所关注的人上传的视频。单击上传视频后，用户可以从手机中选择视频并上传。

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00027.png)

#### 2. 关键代码

1. 视频上传工具videoUtil.js
2. 视频页面videos.js
3. 新闻页面index.js
4. 个人信息页面mine.js
### 七、 后台接口的关键代码
1. 拦截器MiniInterceptor.java，防止多重登录并在token失效后退出当前账号
2. WebMvcConfig.java，保存SpringBoot的有关配置
3. BasicController.java，所有controller的基类
4. RegistLoginController.java
5. MessageController.java
6. UserController.java
7. VideoController.java






### 八、 管理网站的界面和关键代码

#### 1. 界面

##### 1) 登录界面

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00028.png)

##### 2) 首页

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00029.png)

##### 3) 用户列表

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00030.png)

##### 4) 举报列表

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00031.png)

##### 5) 视频列表

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00032.png)

##### 6) 资讯列表

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00033.png)

##### 7) 添加资讯

![image](https://github.com/Super262/DroneNews/blob/master/screenshots/pic00034.png)

#### 2. 关键代码
1) VideoController.java
2) MessageController.java
3) LoginInterceptor.java


### 九、 测试

小程序的视频浏览、新闻浏览功能没有问题，视频上传速度较慢（受服务器带宽限制）。视频评论、点赞、收藏、关注作者功能也没有问题。小程序没有实现视频直播。管理网站的视频查看、视频删除、资讯查看、资讯删除功能没有问题，没有实现修改视频、资讯的功能。

### 十、 体会
在本次项目实战中，我第一次接触了基于JavaScript的程序设计，体会到这种语言的便利性和简洁性。在设计数据库时，我学着设计合理且完备的表，不足的是我没有让多个实体间建立有效的联系，数据库的可靠性是很低的。在开发的过程中，尽管我遇到了很多问题，但解决问题的过程帮助我更深刻地体会程序设计的要点。
