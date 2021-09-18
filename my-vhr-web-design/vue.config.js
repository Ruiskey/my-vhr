let proxyObj = {};
//拦截请求进行转发
proxyObj['/']={
    ws: false,
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite: {
        // 拦截到的地址不进行修改
        '^/':''
    }
}
module.exports={
    devServer:{
        host:'localhost',
        port: 8080,
        proxy: proxyObj
    }
}