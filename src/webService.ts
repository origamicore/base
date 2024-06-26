const request = require('request');
const querystring = require('querystring');
export default class WebService
{
    static getData(url:string,data:any=null,header:any=null,func:Function=null)
    {
        if(url.indexOf('?')==-1 && data)
        {
            url+="?"
        }
        if(data)
            for(var a in data)
            {
                url+="&"+a+'='+data[a];
            }
        var options:any = { method: 'GET',
            url: url, 
            json: true };
        if(header)
            options.headers=header;
        if(func)
        {
            request(options, function (error, response, body) {
                
                func(error,JSON.parse(body))
            })            
        }
        else
        {
            return new Promise(function (resolve, reject) {
                request(options, function (error, response, body) { 
                    if(error)
                        return reject(error)
                    return resolve(JSON.parse(body))
                }) 
            })
        }
    }
    static get(url:string,data:any,header:any=null,func:Function=null)
    {
        if(url.indexOf('?')==-1 && data)
        {
            url+="?"
        }
        if(data)
            for(var a in data)
            {
                url+="&"+a+'='+data[a];
            }
        var options:any = { method: 'GET',
            url: url, 
            json: true };
        if(header)
            options.headers=header;
        if(func)
        {
            request(options, function (error, response, body) {
                
                func(error,body)
            })            
        }
        else
        {
            return new Promise(function (resolve, reject) {
                request(options, function (error, response, body) { 
                    if(error)
                        return reject(error)
                    return resolve(body)
                }) 
            })
        }
    }
    static postData(url:string,data:any,header:any=null,func:any=null)    
    {
        var options:any = { method: 'POST',
            url: url,
            body:data,
            json: true };
        if(header)
            options.headers=header; 
        if(func)
        {
            request(options, function (error, response, body) {
                //if (error) throw new Error(error);
              
                func(error,JSON.parse(body))
              });
                       
        }
        else
        {
            return new Promise(function (resolve, reject) {
                request(options, function (error, response, body) {
                    if (error) return reject(error);
                  
                    return resolve(JSON.parse(body))
                  });
               
            })
        }        
    }
    static postForm(url:string,data:any,header:any=null,func:any=null)  
    {
        
        var formData = querystring.stringify(data);
        var contentLength = formData.length;
        var headers= {
              'Content-Length': contentLength,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        if(header)
            for(var a in header)
                 headers[a]=header[a]
        if(func)
        { 
          request({
            headers:headers,
            uri: url,
            body: formData,
            method: 'POST'
          }, function (err, res, body) {
            //it works!
                func(err,body)
          });
                       
        }
        else
        { 
            return new Promise(function (resolve, reject) {
                
                  request({
                    headers:headers,
                    uri: url,
                    body: formData,
                    method: 'POST'
                  }, function (err, res, body) {
                    //it works!
                    if (err) return reject(err);
                  
                    return resolve(body)
                  }); 
               
            })
        }        
           
    }
    static post(url:string,data:any,header:any=null,func:any=null)    
    {
        var options:any = { method: 'POST',
            url: url,
            body:data,
            json: true };
        if(header)
            options.headers=header;
        if(func)
        {
            request(options, function (error, response, body) {
                //if (error) throw new Error(error);
              
                func(error,body)
              });
                       
        }
        else
        {
            return new Promise(function (resolve, reject) {
                request(options, function (error, response, body) {
                    if (error) return reject(error);
                  
                    return resolve(body)
                  });
               
            })
        }        
    }
}