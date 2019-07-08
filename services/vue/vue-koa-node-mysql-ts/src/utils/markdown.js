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
      if (-1 === levelIndex) {
        levelStack.unshift(item.level);
        addStartUL();
        addLI(item.anchor, item.text);
      } else if (0 === levelIndex) { 
        // 找到相应 level 的 ul 标签,并且在栈定的位置则直接将 li 放入 ul 下.
        addLI(item.anchor, item.text);
      } else {
        // 找到了相应的 level 的 ul 标签,但不是在栈顶相应的位置,需要将之前的所有 level 出栈
        // 并且打上闭合标签,最后新增 li
        while (levelIndex--) {
          levelStack.shift();
          addEndUL();
        }
        addLI(item.anchor, item.text);
      }
    });
    // 如果栈中还有 level,全部出栈打上闭合标签
    while (levelStack.length) {
      levelStack.shift();
      addEndUL();
    }
    // 清理先前的数据供下次使用
    this.toc = [];
    this.index = 0;
    return result;
  },
  toc: [],
  index: 0
};

class MarkUtils {
  constructor() {
    this.rendererMD = new marked.Renderer();
    this.rendererMD.heading = function(text, level, raw) {
      var anchor = tocObj.add(text, level);
      return `<h${level} id=${anchor}>${text}</h${level}>\n`;
    };
    this.rendererMD.table = function(header, body) {
      return '<table class="table" boder="0" cellspacing="0" cellpadding="0">'
             + header + body + '</table>';
    };
    highlight.configure({ useBR: true });
    marked.setOptions({
      renderer: this.rendererMD,
      headerIds: false,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      samrtypants: false,
      highlight: function(code) {
        return highlight.highlightAuto(code).value;
      }
    });
  }

  async marked(data) {
    if (data) {
      let content = await marked(data);
      let toc = tocObj.toHTML();
      return { content: content, toc: toc };
    } else {
      return null;
    }
  }
}

const markdown = new MarkUtils();

export default markdown;