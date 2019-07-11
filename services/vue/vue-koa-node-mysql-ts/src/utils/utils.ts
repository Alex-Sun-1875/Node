// fn是我们需要包装的事件回调, delay是时间间隔的阈值
export function throttle(fn: Function, delay: number) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0;
  let timer: any = null;
  // 将throttle处理结果当作函数返回
  return function() {
    // 保留调用时的this上下文
    const context = this;
    // 保留调用时传入的参数
    const args = arguments;
    // 记录本次触发回调的时间
    const now = +new Date();

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now;
      fn.apply(context, args);
    }
  };
}

export function setCookie(cName: string, value: any, expiredays: any) {
  if (expiredays > 0 && expiredays !== '100') {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie =
      cName +
      '=' +
      escape(value) +
      (expiredays == null ? '' : ';expires=' + exdate.toUTCString());
  }
  if ('100' === expiredays) {
    const exdate = new Date('2119-01-01 00:00:00');
    document.cookie =
      cName +
      '=' +
      escape(value) +
      (expiredays == null ? '' : ';expires=' + exdate.toUTCString());
  }
}

export function getCookie(cName: string) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + '=');
    if (-1 !== cStart) {
      cStart = cStart + cName.length + 1;
      let cEnd = document.cookie.indexOf(';', cStart);
      if (-1 === cEnd) {
        cEnd = document.cookie.length;
      }
      return unescape(document.cookie.substring(cStart, cEnd));
    }
  }

  return '';
}

export function delCookie(name: string) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (null != cval) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toString();
  }
}

// 清除 cookie
export function clearCookie(name: string) {
  setCookie(name, '', -1);
}

// 获取 QueryString 的数组
export function getQueryStringByName(name: string) {
  const result = window.location.search.match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i'),
  );
  if (null == result || result.length < 1) {
    return '';
  }
  return result[1];
}
