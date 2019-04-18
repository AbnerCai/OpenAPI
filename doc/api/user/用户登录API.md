# 用户登录

**简要描述：** 

- 用户登录接口

**请求URL：** 
- ` http://ip:port/v1/user/login `
  
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
    "msg": "登录成功！",
    "data": {
        "email": "test@qq.com",
        "token": "f1ac5340605511e98e4cd5001a601653"
    }
}
```