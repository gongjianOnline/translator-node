const http = require('http');
const url = require('url');
const querystring = require('querystring');
const server = http.createServer((request, response) => {
  let APilist = request.url;
  APilist = APilist.slice(0,APilist.indexOf("?"))
  if(APilist === "/baiduCurrency"){
    let {query} = url.parse(request.url,true);
    const querys = querystring.stringify({
      q: query.word,
      from: query.from,
      to: query.to,
      appid: query.appid,
      salt: query.salt,
      sign: query.sign,
    })
    console.log("打印参数")
    console.log(querys)
    http.get(
      "http://api.fanyi.baidu.com/api/trans/vip/translate?"+querys,
      // "http://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4",
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




