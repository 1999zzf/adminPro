import CooKies from 'js-cookie';

// cookie操作
export function getCookie (c_name) {
  return CooKies.get(c_name);
}

export function setCookie (c_name,value,expiredays) {
  CooKies.set(c_name,value, { expires: expiredays});
}

export function delCookie (name) {
  CooKies.remove(name);
}
