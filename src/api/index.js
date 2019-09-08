// 配置API接口地址
var root = '/api' // http://localhost:8080
// 引用axios
var axios = require('axios')
// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}

function apiAxios(method, url, params, contentType, success) {
    if (params) {
        params = filterNull(params)
    }
    axios({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? (contentType ? params : JSON.stringify(params)) : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            baseURL: root,
            withCredentials: true,
            headers: {
                'Content-Type': contentType || 'application/json;charset=utf-8'
            }

        })
        .then(function (res) {
            if (res.data) {
                success(res.data)
            } else {
                this.$message({
                    message: '请求失败',
                    type: 'error'
                });
            }
        })
        .catch(function (err) {
            let res = err.response
            this.$message({
                message: '请求失败：' + err.response,
                type: 'error'
            });
        })
}

// 返回在vue模板中的调用接口
export default {
    get: function (url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
        return apiAxios('POST', url, params, success, failure)
    },
    put: function (url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    }
}
