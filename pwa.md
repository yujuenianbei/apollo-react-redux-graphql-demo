## magento PWA技术栈



### path.resolve() 
方法将路径或路径片段的序列解析为绝对路径。

    path.resolve('/foo/bar', './baz');
    // 返回: '/foo/bar/baz'

### path.relative(from, to)
path.relative() 方法根据当前工作目录返回 from 到 to 的相对路径。 如果 from 和 to 各自解析到相同的路径（分别调用 path.resolve() 之后），则返回零长度的字符串。

    path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
    // 返回: '../../impl/bbb'

### url.format(URL[, options])
返回一个WHATWG URL对象的可自定义序列化的URL字符串表达。

虽然URL对象的toString()方法和href属性都可以返回URL的序列化的字符串。然而，两者都不可以被自定义。而url.format(URL[, options])方法允许输出的基本自定义。