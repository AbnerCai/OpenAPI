# 用户体系 API

## 用户注册

**简要描述：** 

- 用户注册接口

**请求URL：** 
- ` http://ip:port/v1/user/register `
  
**请求方式：**
- POST 

**参数：** 

> 参照文章数据字典

 **请求示例**

```json
{
	"email": "test@qq.com",
	"passworld": "md5"
}
```

 **返回参数说明** 

> 参照文章数据字典

 **返回示例**
```json
{
    "code": 0,
    "data": {
        "_id": "5cb1dfa7b4d7fd434483d17d",
        "email": "test@qq.com"
    }
}
```

## 邮箱验证

## 用户登录

## 更新 token