# nodeJs4YOHO
YOHO的后台管理

clone到本地之后，使用  
 1. npm i 命令安装包
 2. 安装nodemon----用于监视后端文件，并以app.js为入口---npm install -g nodemon
 3. npm start 启动服务
 4. 安装mongoDB（注意：路径不能为中文）   https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.6.4-signed.msi/download
 5. 在mongoDB目录下创建 data--db  文件夹
 6. 管理员身份打开命令行进入 mongoDB 下的 bin 目录
 7. 执行： mongod --dbpath ...mongoDB\data\db（刚刚新建的data和db目录） eg：F:\Program\mongoDB\bin>mongod --dbpath f:\Program\mongoDB\data\db
 8. 新建命令行同6、7在 mongoDB\bin 目录下执行 mongo.exe  eg: F:\Program\mongoDB\bin>mongo.exe
 9. 在项目根目录下执行：npm start 显示连接数据库成功。
