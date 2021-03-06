影响网页性能最大的因素是浏览器的重绘（reflow）和重排版（repaint）。
React 背后的 Virtual DOM 就是尽可能地减少浏览器的重绘与重排版。

对于性能优化这个主题，我们往往会基于“不信任”的前提，即我们需要提高 React Virtual DOM 的效率。
从 React 的渲染过程来看，如何防止不避要的渲染可能是最需要去解决的问题。
然而，针对这个问题，React 官方提供了一个便捷的方法来解决，那就是 PureRender。


要理解 PureRender 中的 Pure，还要从函数式编程的基本概念“纯函数”讲起。纯函数由三大原则构成：

- 给定相同的输入，它总是返回相同的输出；

- 过程没有副作用(https://en.wikipedia.org/wiki/Side_effect_(computer_science))

- 没有额外的状态依赖


纯函数也是函数式编程的基础，它完全独立于外部状态，这样就避免了因为共享外部状态而导致的 bug。
这种独立，让我们可以利用 CPU 在分布式集群上作并行计算，这对于多种科学计算和资源密集型计算任务是非常核心的一点，让计算机高效地处理这类任务变得可能。
纯函数非常方便进行方法级别的测试以及重构，可以让程序具有良好的扩展性及适应性。