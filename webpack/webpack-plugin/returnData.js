const fs = require('fs');

module.exports = async function(req, res, next) {
  const config = req.config;
  // 判断请求的接口在配置中
  if (config[req.path]) {
    // 读取对应的json文件
    const data = await fsRead(config[req.path].path);
    // 返回json文件
    res.send(JSON.parse(data));
  } else {
    // 如果接口没在配置中，返回错误信息
    res.send({ errno: -1, msg: 'No such proxy: ' + req.path });
  }
  next();
};

// 使用promise封装fs.readFile，方便使用async/await
function fsRead(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.syscall === 'open') {
          console.log('Open "' + err.path + '" fail!');
        }
        reject(err);
      }
      resolve(data.toString());
    });
  });
}
