window.onload = () => {
  // 假装后台请求接口给到的图片数据
  const imgList = [];
  const renderDOM = document.querySelector('.flex-waterfall');
  let prevMode = 1;
  
  // func: 滚动查找元素并将 String 累计起来，最终渲染到 renderDOM 节点上
  const reduceDOM = (limit) => {
    // 生成 limit 条字符串
    const htmlString = Array.from(Array(limit), () => '<div class="column">');
    // 遍历并将 <img/> 添加到每一列上
    imgList.forEach((item, index) => {
      const surplus = index % limit;
      if (surplus < limit) {
        htmlString[surplus] += `<img src="${item}" />`;
      }
    });
    // 结尾设置 String
    for (let i = 0; i < limit; i++) {
      htmlString[i] += '</div>';
    }
    // 渲染到 HTML 上。记得处理下数组，要不然会产生逗号
    renderDOM.innerHTML = htmlString.join('');
  };

  // func: 重排节点
  const resize = () => {
    const width = window.innerWidth;
    // 超过 1000px 显示 3 列，否则显示 2 列
    if (width >= 1000 && prevMode !== 3) {
      prevMode = 3;
      reduceDOM(prevMode);
    } else if (width < 1000 && prevMode !== 2) {
      prevMode = 2;
      reduceDOM(prevMode);
    }
  };
  
  // 1、每次进来先执行一遍
  resize();

  // 2、每次拖拽，判断是否需要重新渲染
  window.onresize = () => {
    resize();
  };
};