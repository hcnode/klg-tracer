export default {
    userId: { type: String, index: true },         // 需要查询用户的所有请求，该字段要索引
    traceId: { type: String, index: true },      // 用于串联业务的 唯一id
    name: { type: String, required: true, index: true },
    timestamp: { type: Number },  // 开始时间
    duration: { type: Number },  // 请求耗时 ms
}