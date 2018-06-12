
### setState是异步的

我们可能在一个方法中连续使用多次setState，但由于设置是异步的，我们不能在第二次调用setState方法时拿到第一次调用setState所设置的值，它们的state都是基于最初的state的。
那么这个问题如何解决呢？

其实setState还有第二种形式，使用回调函数而非对象的形式去更新state，像这样

`
this.setState((prevState, props) => {
  return {
    count: preState.count + 1
  }
};
`
