import { Func } from 'mocha';

// utils/utils.ts 常用函数的封装， 比如 事件的节流（throttle）与防抖（debounce）方法：
// fn 是我们需要包装的事件回调, delay 是时间间隔的阈值
export function throttle(fn: () => void, delay: number) {
  // last 为上一次触发回调的时间, timer 是定时器
  let last = 0;
  let timer : any = null;
  // 将 throttle 处理结果当做函数返回
  return function() {
    // 保留调用时的 this 上下文
    const context = this;
    // 保留调用时传入的参数
    const args = arguments;
    // 记录本次触发回调的时间
    const now = +new Date();
    // 判断上次触发和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值,则为本次触发操作设立一个新的定时器
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值, 那就不等了,但是无论如何豆芽反馈给用户一次响应
      last = now;
      fn.apply(context, args);
    }
  };
}