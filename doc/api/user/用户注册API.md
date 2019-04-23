# 用户注册API

**简要描述：** 

- 用户注册接口

**请求URL：** 
- ` http://ip:port/v1/user/register `
  
**请求方式：**
- POST 

**参数：** 

> 参照用户数据字典

 **请求示例**

```json
{
    "email": "test@qq.com",
    "passworld": "md5"
}
```

 **返回参数说明** 

> 参照用户数据字典

 **返回示例**
```json
{
    "code": 0,
    "msg": "注册成功！",
    "data": {
        "email": "test@qq.com",
        "registerTime": "2019-04-14T12:01:13.236Z"
    }
}
```