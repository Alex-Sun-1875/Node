const highlight = require('highlight.js');
const marked = require('marked');
const tocObj = {
  add: function(text, level) {
    var anchor = `#toc${level}${++this.index}`;
    this.toc.push({ anchor: anchor, level: level, text: text });
    return anchor;
  },
  // 使用堆栈的方式处理嵌套的ul,li，level即ul的嵌套层次，1是最外层
  // <ul>
  //   <li></li>
  //   <ul>
  //     <li></li>
  //   </ul>
  //   <li></li>
  // </ul>
  toHTML: function() {
    let levelStack = [];
    let result = '';
    const addStartUL = () => {
      result += '<ul class="anchor-ul" id="anchor-fix">';
    };
    const addEndUL = () => {
      result += '</ul>\n';
    };
    const addLI = (anchor, text) => {
      result +=
        '<li><a class="toc-link" href="#' + anchor + '">' + text + '<a></li>\n';
    };

    this.toc.forEach(function(item) {
      let levelIndex = levelStack.indexOf(item.level);
      // 没有找到相应 level 的 url 标签,则将 li 放入到新增 ul 中.
      
    });
  }
};
