# 邮箱验证API

**简要描述：** 

- 邮箱验证接口

**请求URL：** 
- ` http://ip:port/v1/user/activate `
  
**请求方式：**
- GET 

**参数：** 

| 参数 | 说明 |
| :---: | :--- |
| `email` | 用户邮箱 | 
| `activationCode` | 激活码 | 

 **请求示例**

` http://ip:port/v1/user/activate?email=test@qq.com&activationCode=f307a09061e111e980b143dd602d7302 `

 **返回参数说明** 

> 参照用户数据字典

 **返回示例**
```json
{
    "code": 0,
    "msg": "激活成功！"
}
```