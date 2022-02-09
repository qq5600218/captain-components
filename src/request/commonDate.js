import request from './index'
import qs from 'qs'
export const getTimeInfo = params => {
  return request({
    url: "index.php?m=common&c=CommonMethod&a=getTimeInfoNew",
    method: 'post',
    data: qs.stringify(params),
    exclude:true
  });
};
export const getOldTimeInfo = data=>{
  return request({
      exclude:true,
      url: '/common-CommonMethod-getTimeInfo.php?',
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data)
    })
};
export const getTimeList = params => {
  return request({
    url: "index.php?m=common&c=CommonMethod&a=getTimeListNew",
    method: 'post',
    data: qs.stringify(params),
    exclude:true
  });
};

export const getSystemTime =()=> {  
  return request({  
    url: 'index.php?m=common&c=CommonMethod&a=getSystemTime',
    method: 'post',     
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }      
  })
}