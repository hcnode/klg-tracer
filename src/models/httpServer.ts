export default {
    httpTags: {
        httpMethod: { type: String },
        hostname: { type: String },
        port: { type: Number },           // http 端口
        response_size: { type: Number },
        status_code: { type: String },              // http 状态码
        url: { type: String },              // 请求 url
        query: { type: Object },             // 请求参数 get 请求参数
        body: { type: Object },             //  请求参数 post 请求参数
        response: { type: Object }         // 返回结果
    }
}