## 球迷联盟接口文档


### 目录
- [球迷联盟接口文档](#)
    - [用户接口列表](#)
        - [[post] /user/v1/register 用户注册]
        - [[post] /user/v1/login 用户登录]
        - [[delete] /user/v1/login 用户退出登录]
        - [[get] /user/v1/typeList 获取比赛类型列表]
        - [[get] /user/v1/placeList 获取场地列表]
        - [[get] /user/v1/userGame 获取用户参加的比赛列表]
        - [[get] /user/v1/authorGame 获取用户发布的比赛列表]
    - 
    - [比赛接口列表](#)
        - [[post] /game/v1/list 获取比赛列表]
        - [[post] /game/v1/search 按类型查询比赛]
        - [[post] /game/v1/add 用户发布比赛]
        - [[post] /game/v1/join 用户加入比赛]
        - [[post] /game/v1/quit 用户退出比赛]
        - [[post] /game/v1/end 发布者完成退出/取消比赛]
    -
    - [论坛接口列表](#)
       - [[post] /forum/v1/list 获取帖子列表]
       - [[post] /forum/v1/detail/{postId} 获取帖子列表]
       - [[post] /forum/v1/add 用户发帖]
       - [[delete] /forum/v1/del/{postId} 用户删帖]
       - [[post] /forum/v1/reply/{postId} 用户回帖]
       - [[delete] /forum/v1/reply/{answerId} 用户删除自己的回帖]
       - [[post] /forum/v1/doHand/{answerId} 用户点赞]
       - [[post] /forum/v1/doFoot/{answerId} 用户点踩]
    -
-

## 用户接口列表

#### [post] /user/v1/register
【用户注册】

 前置条件：

 * 无

 输入参数：

 名称 | 类型 | 是否必须 | 参数限制 | 描述
 --------- | ----------- | -------- | ---------- | ----------
 username | String | 是 | 仅支持数字和字母，长度小于32位 | 用户名称
 password | String | 是 | 仅支持数字和字母，长度大于等于6位，小于32位 | 登录密码
 picture |MultipartFile | 是 | 无 | 用户头像

 输出参数:

 名称 | 类型 | 描述
 --------- | ----------- | ----------
 statusCode | int | 状态码
 message | string | 描述
 data | object | 用户信息


 输出样例:

 ```
 {
     "message": "注册成功",
     "data": {
         "id": 232112284,
         "uid": "bf2b7b5639224a839ca8bcaf07afe240",
         "name": "wzkobejjo",
         "password": "FDB619ECAD9B82E88409BB06979BFEC4",
         "picture": "f:\\task\\用户头像\\wzkobejjo.jpg",
         "deleted": false,
         "createTime": 1522459058000,
         "updateTime": 1522459058000
     },
     "statusCode": 200
 }
 }
```

#### [post] /user/v1/login


 前置条件：

 * 无

 输入参数：

 名称 | 类型 | 是否必须 | 参数限制 | 描述
 --------- | ----------- | -------- | ---------- | ----------
 username | String | 是 | 仅支持数字和字母，长度小于等于32位 | 用户名称
 password | String | 是 | 仅支持数字和字母，长度大于等于6位，小于等于32位 | 登录密码

 输出参数:

 名称 | 类型 | 描述
 --------- | ----------- | ----------
 statusCode | int | 状态码
 message | string | 描述
 data | object | 用户信息




 输出样例:

 ```
{
    "message": "请去首页进行选购",
    "data": {
        "id": 232112284,
        "uid": "bf2b7b5639224a839ca8bcaf07afe240",
        "name": "wzkobejjo",
        "password": "FDB619ECAD9B82E88409BB06979BFEC4",
        "picture": "f:\\task\\用户头像\\wzkobejjo.jpg",
        "deleted": false,
        "createTime": 1522459058000,
        "updateTime": 1522459058000
    },
    "statusCode": 200
}
```

#### [delete] /user/v1/login


 前置条件：

 * 用户必须已经登录

 输入参数：

 名称 | 类型 | 是否必须 | 参数限制 | 描述
 --------- | ----------- | -------- | ---------- | ----------


 输出参数:

 名称 | 类型 | 描述
 --------- | ----------- | ----------
 statusCode | int | 状态码
 message | string | 描述

 输出样例:

 ```
{
    "message": "注销成功",
    "statusCode": 200
}
```

 未登录输出样例:

 ```
{
    "code": 401,
    "message": "[Please Login in first]请先登录",
    "data": null
}
```

#### [get] /user/v1/typeList


 前置条件：

 * 无

 输入参数：

 名称 | 类型 | 是否必须 | 参数限制 | 描述
 --------- | ----------- | -------- | ---------- | ----------

 输出参数:

 名称 | 类型 | 描述
 --------- | ----------- | ----------
 statusCode | int | 状态码
 data | Object | 数据列表
 
 输出样例
 
 ```
{
    {
        "data": [
            {
                "id": 1,
                "type": "篮球",
                "deleted": false,
                "createTime": 1522721958000,
                "updateTime": 1522721954000
            },
            {
                "id": 2,
                "type": "足球",
                "deleted": false,
                "createTime": 1522722009000,
                "updateTime": 1522722007000
            },
            {
                "id": 3,
                "type": "其他",
                "deleted": false,
                "createTime": 1522722110000,
                "updateTime": 1522722107000
            }
        ],
        "statusCode": 200
    }
}
```

#### [get] /user/v1/placeList


 前置条件：

 * 无

 输入参数：

 名称 | 类型 | 是否必须 | 参数限制 | 描述
 --------- | ----------- | -------- | ---------- | ----------

 输出参数:

 名称 | 类型 | 描述
 --------- | ----------- | ----------
 statusCode | int | 状态码
 data | Object | 数据列表

 输出样例:

 ```
{
    "data": [
        {
            "id": 1,
            "type": "篮球",
            "identifier": "1",
            "startTime": null,
            "endTime": null,
            "deleted": false,
            "createTime": 1522814183000,
            "updateTime": 1522814189000
        },
        {
            "id": 2,
            "type": "足球",
            "identifier": "1",
            "startTime": 1495602901000,
            "endTime": 1495602901000,
            "deleted": false,
            "createTime": 1522814213000,
            "updateTime": 1522814217000
        },
        {
            "id": 3,
            "type": "其他",
            "identifier": "1",
            "startTime": null,
            "endTime": null,
            "deleted": false,
            "createTime": 1522814318000,
            "updateTime": 1522814321000
        }
    ],
    "statusCode": 200
}
```

#### [get] /user/v1/userGame

 前置条件：

 * 用户已登录

 输入参数：

 名称 | 类型 | 是否必须 | 参数限制 | 描述
 --------- | ----------- | -------- | ---------- | ----------

 输出参数:

 名称 | 类型 | 描述
 --------- | ----------- | ----------
 statusCode | int | 状态码
 data | Object | 数据列表

 输出样例:

 ```
{
    "data": [
        {
            "id": 21,
            "uid": "92273413ffd842ac960ce26b7bd89fc8",
            "userUid": "92273413ffd842ac960ce26b7bd89fc8",
            "type": "足球",
            "startTime": 1523431564000,
            "endTime": 1053929701000,
            "place": "足球1号",
            "peopleNum": 9,
            "description": "测试数据",
            "deleted": false,
            "createTime": 1523431564000,
            "updateTime": 1523431564000
        },
        {
            "id": 26,
            "uid": "818dca56fb214cadad11562c334a0deb",
            "userUid": "818dca56fb214cadad11562c334a0deb",
            "type": "篮球",
            "startTime": 1524114901000,
            "endTime": 1524118501000,
            "place": "篮球-2号",
            "peopleNum": 3,
            "description": "正在测试的数据",
            "deleted": false,
            "createTime": 1524142051000,
            "updateTime": 1524142051000
        }
    ],
    "statusCode": 200
}
```

#### [get] /user/v1/authorGame

 前置条件：

 * 用户已登录

 输入参数：

 名称 | 类型 | 是否必须 | 参数限制 | 描述
 --------- | ----------- | -------- | ---------- | ----------

 输出参数:

 名称 | 类型 | 描述
 --------- | ----------- | ----------
 statusCode | int | 状态码
 data | Object | 数据列表

 输出样例:

 ```
{
    "data": [
        {
            "id": 21,
            "uid": "92273413ffd842ac960ce26b7bd89fc8",
            "userUid": "92273413ffd842ac960ce26b7bd89fc8",
            "type": "足球",
            "startTime": 1523431564000,
            "endTime": 1053929701000,
            "place": "足球1号",
            "peopleNum": 9,
            "description": "测试数据",
            "deleted": false,
            "createTime": 1523431564000,
            "updateTime": 1523431564000
        },
        {
            "id": 26,
            "uid": "818dca56fb214cadad11562c334a0deb",
            "userUid": "818dca56fb214cadad11562c334a0deb",
            "type": "篮球",
            "startTime": 1524114901000,
            "endTime": 1524118501000,
            "place": "篮球-2号",
            "peopleNum": 3,
            "description": "正在测试的数据",
            "deleted": false,
            "createTime": 1524142051000,
            "updateTime": 1524142051000
        }
    ],
    "statusCode": 200
}
```



## 赛事接口列表

#### [post] /game/v1/list

 前置条件：

 * 无

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
  pn | Integer | 否 | 无 | 页码
  pageSize  | Integer| 否 | 无 | 页大小
  navigatePages  | Integer| 否 | 无 | 分页数量

  输出参数:

  名称 | 类型 | 描述
  ----------- | ----------- | ----------
  statusCode | int | 状态码
  data | object | 无

  输出样例:

  ```
{
    "data": {
        "pageNum": 1,
        "pageSize": 7,
        "size": 7,
        "orderBy": null,
        "startRow": 1,
        "endRow": 7,
        "total": 16,
        "pages": 3,
        "list": [
            {
                "id": 2,
                "uid": "82dd31c7b30243c9b6b55114d6674d14",
                "userUid": "82dd31c7b30243c9b6b55114d6674d14",
                "type": "篮球",
                "startTime": 1522725484000,
                "endTime": 1522725484000,
                "place": "理工大",
                "peopleNum": 10,
                "description": "测试数据",
                "deleted": false,
                "createTime": 1522725484000,
                "updateTime": 1522725484000
            },
            {
                "id": 3,
                "uid": "2d8c2d95a9754af1a53d9125d3c570c2",
                "userUid": "2d8c2d95a9754af1a53d9125d3c570c2",
                "type": "篮球",
                "startTime": 1522725486000,
                "endTime": 1522725486000,
                "place": "理工大",
                "peopleNum": 10,
                "description": "测试数据",
                "deleted": false,
                "createTime": 1522725486000,
                "updateTime": 1522725486000
            },
            {
                "id": 4,
                "uid": "833047b989dd455fbd26fbf1928f472e",
                "userUid": "833047b989dd455fbd26fbf1928f472e",
                "type": "篮球",
                "startTime": 1522725487000,
                "endTime": 1522725487000,
                "place": "理工大",
                "peopleNum": 10,
                "description": "测试数据",
                "deleted": false,
                "createTime": 1522725487000,
                "updateTime": 1522725487000
            },
            {
                "id": 5,
                "uid": "0044bbb189684071a5ab665f63d51748",
                "userUid": "0044bbb189684071a5ab665f63d51748",
                "type": "篮球",
                "startTime": 1522725487000,
                "endTime": 1522725487000,
                "place": "理工大",
                "peopleNum": 10,
                "description": "测试数据",
                "deleted": false,
                "createTime": 1522725487000,
                "updateTime": 1522725487000
            },
            {
                "id": 6,
                "uid": "3da31305dabe410ebeb4801e4ccf8e0d",
                "userUid": "3da31305dabe410ebeb4801e4ccf8e0d",
                "type": "篮球",
                "startTime": 1522725488000,
                "endTime": 1522725488000,
                "place": "理工大",
                "peopleNum": 10,
                "description": "测试数据",
                "deleted": false,
                "createTime": 1522725488000,
                "updateTime": 1522725488000
            },
            {
                "id": 7,
                "uid": "30402187cbc64ef696439982f1b78694",
                "userUid": "30402187cbc64ef696439982f1b78694",
                "type": "篮球",
                "startTime": 1522725489000,
                "endTime": 1522725489000,
                "place": "理工大",
                "peopleNum": 10,
                "description": "测试数据",
                "deleted": false,
                "createTime": 1522725489000,
                "updateTime": 1522725489000
            },
            {
                "id": 8,
                "uid": "cd03cbcfee274fe881469920b3347bcc",
                "userUid": "cd03cbcfee274fe881469920b3347bcc",
                "type": "篮球",
                "startTime": 1522725489000,
                "endTime": 1522725489000,
                "place": "理工大",
                "peopleNum": 10,
                "description": "测试数据",
                "deleted": false,
                "createTime": 1522725489000,
                "updateTime": 1522725489000
            }
        ],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 2,
        "lastPage": 3,
        "isFirstPage": true,
        "isLastPage": false,
        "hasPreviousPage": false,
        "hasNextPage": true,
        "navigatePages": 5,
        "navigatepageNums": [
            1,
            2,
            3
        ]
    },
    "statusCode": 200
}
 ```

#### [post] /game/v1/search

 前置条件：

 * 无

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
  type  | String| 否 | 无 | 比赛类型

  输出参数:

  名称 | 类型 | 描述
  ----------- | ----------- | ----------
  statusCode | int | 状态码
  data | object | 符合条件比赛列表

  输出样例:

  ```
{
    "data": [
        {
            "id": 19,
            "uid": "cc12c08993824b59bde8e00c592acac7",
            "userUid": "cc12c08993824b59bde8e00c592acac7",
            "type": "篮球",
            "startTime": 1523329157000,
            "endTime": 1053929701000,
            "place": "篮球1",
            "peopleNum": 9,
            "description": "测试数据",
            "deleted": false,
            "createTime": 1523329157000,
            "updateTime": 1523329157000
        },
        {
            "id": 20,
            "uid": "8515600da8c24804afe6e3285fa6549a",
            "userUid": "8515600da8c24804afe6e3285fa6549a",
            "type": "篮球",
            "startTime": 1523429993000,
            "endTime": 1053929701000,
            "place": "篮球1号",
            "peopleNum": 9,
            "description": "测试数据",
            "deleted": false,
            "createTime": 1523429993000,
            "updateTime": 1523429993000
        },
        {
            "id": 22,
            "uid": "96eb2e73051e4873b4202e7ee8f619c9",
            "userUid": "96eb2e73051e4873b4202e7ee8f619c9",
            "type": "篮球",
            "startTime": 1523431889000,
            "endTime": 1085552101000,
            "place": "篮球2号",
            "peopleNum": 9,
            "description": "测试数据",
            "deleted": false,
            "createTime": 1523431889000,
            "updateTime": 1523431889000
        },
        {
            "id": 23,
            "uid": "382582d455f04e9ebecfd3d67d455b3c",
            "userUid": "382582d455f04e9ebecfd3d67d455b3c",
            "type": "篮球",
            "startTime": 1523432166000,
            "endTime": 1243318501000,
            "place": "篮球2号",
            "peopleNum": 9,
            "description": "测试数据",
            "deleted": false,
            "createTime": 1523432166000,
            "updateTime": 1523432166000
        },
        {
            "id": 24,
            "uid": "ab1959b303244f438d99a57bc3d1007f",
            "userUid": "ab1959b303244f438d99a57bc3d1007f",
            "type": "篮球",
            "startTime": 1523439920000,
            "endTime": 990857701000,
            "place": "篮球-2号",
            "peopleNum": 9,
            "description": "测试数据",
            "deleted": false,
            "createTime": 1523439920000,
            "updateTime": 1523439920000
        }
    ],
    "statusCode": 200
}
 ```

#### [post] /game/v1/add

 前置条件：

 * 用户必须已登录

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
  type | String | 是 | 无 | 比赛类型
  placeId  | Integer| 是 | 无 | 场地ID
  peopleNum  | Integer| 是 | 无 | 比赛人数
  startTime  | String| 是 | yyyy-MM-dd HH:mm:ss | 比赛开始时间
  endTime  | String| 是 | yyyy-MM-dd HH:mm:ss | 比赛结束时间
  description|String|是|无|添加描述

  输出参数:

  名称 | 类型 | 描述
  --------- | ----------- | ----------
  statusCode | int | 状态码
  data | object | 无




  输出样例:

  ```
{
    "message": "比赛发布成功",
    "statusCode": 200
}
 ```

  场地类型与比赛类型输出样例:

  ```
{
    "statusCode": 20011,
    "message": "您的比赛类型与场地类型不否"
}

 ```
   场地时间冲突输出样例:
 
   ```
     {
         "statusCode": 20012,
         "message": "该时间段场地已经被占用"
     }
  ```
  
  #### [post] /game/v1/join
  
   前置条件：
  
   * 用户必须已登录
  
   输入参数：
  
    名称 | 类型 | 是否必须 | 参数限制 | 描述
    --------- | ----------- | -------- | ---------- | ----------
    gameUid|String|是|无|比赛Uid
  
   输出参数:
  
    名称 | 类型 | 描述
    --------- | ----------- | ----------
    statusCode | int | 状态码
    message | String | 消息

  输出样例:

  ```
{
    "message": "成功加入比赛",
    "statusCode": 200
}
 ```
 
 #### [post] /game/v1/quit
   
    前置条件：
   
    * 用户必须已登录
   
    输入参数：
   
     名称 | 类型 | 是否必须 | 参数限制 | 描述
     --------- | ----------- | -------- | ---------- | ----------
     gameUid|String|是|无|比赛Uid
   
    输出参数:
   
     名称 | 类型 | 描述
     --------- | ----------- | ----------
     statusCode | int | 状态码
     message | String | 消息
 
   输出样例:
 
   ```
{
    "message": "成功退出比赛",
    "statusCode": 200
}
  ```
  
  #### [post] /game/v1/end
     
      前置条件：
     
      * 用户必须已登录
     
      输入参数：
     
       名称 | 类型 | 是否必须 | 参数限制 | 描述
       --------- | ----------- | -------- | ---------- | ----------
       gameUid|String|是|无|比赛Uid
     
      输出参数:
     
       名称 | 类型 | 描述
       --------- | ----------- | ----------
       statusCode | int | 状态码
       message | String | 消息
   
     输出样例:
   
     ```
  {
      "message": "成功取消比赛",
      "statusCode": 200
  }
    ```
  
## 论坛接口列表

#### [post] /forum/v1/list

 前置条件：

 * 无

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
   pn | Integer | 否 | 无 | 页码
   pageSize  | Integer| 否 | 无 | 页大小
   navigatePages  | Integer| 否 | 无 | 分页数量

  输出参数:

  名称 | 类型 | 描述
  --------- | ----------- | ----------
  statusCode | int | 状态码
  data | object | 帖子列表

  输出样例:

  ```
 {
     "userInfoList": [
         {
             "id": 232112253,
             "uid": "712925eb3271432f81bccc7ca1db0296",
             "name": "mp",
             "password": "4397E048B268E6B977FB4F015483EAB5",
             "picture": "",
             "deleted": false,
             "createTime": 1495606357000,
             "updateTime": 1495606357000
         },
         {
             "id": 232112255,
             "uid": "aabecaad75134f9cbdcefdc6af502e30",
             "name": "wade",
             "password": "67BB94B748FF4C69506BB9EC5AA84FB7",
             "picture": "",
             "deleted": false,
             "createTime": 1495623700000,
             "updateTime": 1495623700000
         },
         null
     ],
     "pagePost": {
         "pageNum": 1,
         "pageSize": 3,
         "size": 3,
         "orderBy": null,
         "startRow": 1,
         "endRow": 3,
         "total": 3,
         "pages": 1,
         "list": [
             {
                 "id": 3,
                 "userUid": "712925eb3271432f81bccc7ca1db0296",
                 "title": "热火",
                 "num": 1,
                 "deleted": false,
                 "createTime": 1523239743000,
                 "updateTime": 1523239746000,
                 "content": "三巨头"
             },
             {
                 "id": 4,
                 "userUid": "aabecaad75134f9cbdcefdc6af502e30",
                 "title": "勇士",
                 "num": 1,
                 "deleted": false,
                 "createTime": 1523239786000,
                 "updateTime": 1523239789000,
                 "content": "卫冕冠军"
             },
             {
                 "id": 7,
                 "userUid": "111111111111",
                 "title": "骑士",
                 "num": 0,
                 "deleted": false,
                 "createTime": 1523243344000,
                 "updateTime": 1523243344000,
                 "content": "詹姆斯厉害的很"
             }
         ],
         "firstPage": 1,
         "prePage": 0,
         "nextPage": 0,
         "lastPage": 1,
         "isFirstPage": true,
         "isLastPage": true,
         "hasPreviousPage": false,
         "hasNextPage": false,
         "navigatePages": 5,
         "navigatepageNums": [
             1
         ]
     },
     "statusCode": 200
 }
 ```

#### [post] /forum/v1/detail/{postId}

 前置条件：

 * 无

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
  postId | Integer | 是 | 无 | 帖子ID

  输出参数:

  名称 | 类型 | 描述
  --------- | ----------- | ----------
  statusCode | int | 状态码
  data | object | 用户列表和回帖列表

  输出样例:

  ```
{
    "userInfoList": [
        {
            "id": 232112263,
            "uid": "cca6148145e04362bd44a1de59c675e4",
            "name": "bbb",
            "password": "A5D4BC1021DC0EB4590ADA6006B1215A",
            "picture": "",
            "deleted": false,
            "createTime": 1495893987000,
            "updateTime": 1495893987000
        }
    ],
    "answerInfoList": [
        {
            "id": 3,
            "postId": 1,
            "userUid": "cca6148145e04362bd44a1de59c675e4",
            "handNum": 111,
            "footNum": 0,
            "deleted": false,
            "createTime": 1523240608000,
            "updateTime": 1523240611000,
            "answerContext": "没错"
        }
    ],
    "statusCode": 200
}
 ```

#### [post] /forum/v1/add

 前置条件：

 * 用户必须在线

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
  title | String | 是 | 无 | 帖子标题
  content | String | 是 | 无 | 帖子内容

  输出参数:

  名称 | 类型 | 描述
  --------- | ----------- | ----------
  statusCode | int | 状态码
  message | string | 描述

  输出样例:

  ```
{
    "message": "发帖成功",
    "statusCode": 200
}
 ```

#### [delete] /forum/v1/del/{postId}

 前置条件：

 * 用户必须在线

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
  postId | Integer | 是 | 无 | 帖子ID

  输出参数:

  名称 | 类型 | 描述
  --------- | ----------- | ----------
  statusCode | int | 状态码
  message | string | 描述

  输出样例:

  ```
{
    "message": "删帖成功",
    "statusCode": 200
}
 ```
 
#### [post] /forum/v1/reply/{postId}

 前置条件：

 * 用户必须在线

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
  postId | Integer | 是 | 无 | 帖子ID
  answerContext | String | 是 | 无 | 回帖内容

  输出参数:

  名称 | 类型 | 描述
  --------- | ----------- | ----------
  statusCode | int | 状态码
  message | string | 描述

  输出样例:

  ```
{
    "message": "回帖成功",
    "statusCode": 200
}
 ```

#### [delete] /forum/v1/reply/{answerId}

 前置条件：

 * 用户必须在线

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
  answerId | Integer | 是 | 无 | 楼层回复ID

  输出参数:

  名称 | 类型 | 描述
  --------- | ----------- | ----------
  statusCode | int | 状态码
  message | string | 描述

  输出样例:

  ```
{
    "message": "删评论成功",
    "statusCode": 200
}
 ```

#### [post] /forum/v1//doHand/{answerId}

 前置条件：

 * 无

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
  answerId | Integer | 是 | 无 | 楼层回复ID

  输出参数:

  名称 | 类型 | 描述
  --------- | ----------- | ----------
  statusCode | int | 状态码
  message | string | 描述

  输出样例:

  ```
{
    "message": "点赞成功",
    "statusCode": 200
}
 ```

#### [post] /forum/v1//doFoot/{answerId}

 前置条件：

 * 无

 输入参数：

  名称 | 类型 | 是否必须 | 参数限制 | 描述
  --------- | ----------- | -------- | ---------- | ----------
  answerId | Integer | 是 | 无 | 楼层回复ID

  输出参数:

  名称 | 类型 | 描述
  --------- | ----------- | ----------
  statusCode | int | 状态码
  message | string | 描述

  输出样例:

  ```
{
    "message": "点踩成功",
    "statusCode": 200
}
 ```



