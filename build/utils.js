const path = require('path')

// 路由定位
exports.resolve = (...arg) => path.join(__dirname, '..', ...arg)