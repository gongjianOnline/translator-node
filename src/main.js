const http = require('http');
const url = require('url');
const querystring = require('querystring');
const server = http.createServer((request, response) => {
  let APilist = request.url;
  APilist = APilist.slice(0,APilist.indexOf("?"))
  console.log("监听到访问了")
  if(APilist === "/baiduCurrency"){
    console.log("进入了百度PI的判断条件")
    let {query} = url.parse(request.url,true);
    const querys = querystring.stringify({
      q: query.word,
      from: query.from,
      to: query.to,
      appid: query.appId,
      salt: query.salt,
      sign: query.sign,
    })
    console.log("查询字符串")
    console.log(querys)
    http.get(
      "http://api.fanyi.baidu.com/api/trans/vip/translate?"+querys,
      function(data){
        let str ="";
        data.on("data",function(chunk){
          str+=chunk;//监听数据响应，拼接数据片段
        })
        data.on("end",function(){
          str.toString()
          //将数据返回给客户端
          response.write(str,'utf-8')
          response.end()
        })
      }
  )
  }
});

server.listen(8888);




