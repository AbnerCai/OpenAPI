# REST

## RetMsg
```json
{
    "code": 200,
    "msg": "请求成功",
    "data": null
}
```

### code

code | 描述 | 说明
---|---|---
200 | OK | 请求成功
201 | CREATED | 创建成功
202 | accepted | 更新成功
400 | bad request | 请求地址不存在或参数错误
401 | unauthorized | 未授权
403 | forbidden | 被禁止访问
404 | not fount | 请求资源不存在
500 | internal server error | 内部错误