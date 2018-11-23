RN在执行
```
componentDidMount() {
    this._fetchData();
} 
```
的时候，拉取到数据后会通过更新state来更新UI。

按照ReactNative的生命周期调用规则，在setState之后，RN会依次调用shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate生命周期方法。然而问题就出在state更新后调用render方法时，会停止当前Component进入屏幕时的滚动动画。造成新Component进入画面一半时停住，甚至新Component还没开始进入画面时就停住，等到componentDidUpdate执行完成后才继续向前滚动。严重影响使用体验。

这个时候我们就需要让这个state更新操作延迟进行。为了实现这个目的，可以使用RN提供的一个工具：InteractionManager。

这是一个管理互动操作的工具。其中有一个方法runAfterInteraction（func）。这个方法用来标记参数中传入的方法在所有当前进行的交互和动画完成后再执行。可以理解为将func加入到一个等待队列。

```
componentDidMount() {
   InteractionManager.runAfterInteractions(()  =>  {  
      this._fetchData();
   });
}
```

**记得要在头部引入InteractionManager**

这样，在Component进入画面的动画结束后，才会执行拉取数据的操作，这个逻辑才符合我们的预期。
