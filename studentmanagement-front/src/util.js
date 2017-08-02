/*工具类*/

/*设置cookie*/
export function setCookie(name,value)
{
    let  Days = 30;
    let  exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toUTCString();
}

/*读取cookie*/
export function getCookie(name)
{
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    arr=document.cookie.match(reg);
    if(arr!=null){
        return decodeURI(arr[2]);
    }
    return null;
}