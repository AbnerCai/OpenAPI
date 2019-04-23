# 查询文摘API

**简要描述：** 

- 查询文摘接口

**请求URL：** 
- ` http://ip:port/v1/digests?token=83f9e624dc4148ecb735f4be4e9553fe `
  
**请求方式：**
- GET 


 **返回参数说明** 

> 参照文摘数据字典

 **返回示例**
```json
{
    "code": 0,
    "msg": "查询成功！",
    "data": [
        {
            "_id": "5cbf28e324690e541853eebe",
            "content": "昨日种种昨日死，今日种种今日生。",
            "createTime": "2019-04-23T15:01:55.504Z",
            "__v": 0
        },
        {
            "_id": "5cbf2b2e9d26a01a48049ebc",
            "content": "生之有崖，学而无涯。",
            "createTime": "2019-04-23T15:11:42.754Z",
            "__v": 0
        }
    ]
}
```