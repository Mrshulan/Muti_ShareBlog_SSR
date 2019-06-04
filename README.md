# Muti_ShareBlog_SSR
该项目在[前后端分离v2](https://github.com/Mrshulan/Muti_ShareBlog_FE) (CSR)的模式基础上，在线体验地址<http://mrshulan.xin/blog/>

实现了[服务端同构渲染v3](https://github.com/Mrshulan/Muti_ShareBlog_SSR) (SSR) 在线体验地址<http://mrshulan.xin/blogssr/> ,

不得不说，**真的没有白屏loading**，感觉非常的舒服，SEO啥的umm 大家都懂~(SSR自带优点)。

没有使用nextjs使用的是自己搭建的[Webpack](https://github.com/Mrshulan/Train_demo/tree/master/React-ssr)👆自行打包，项目的打包的体积更小, webpack做了`splitchunks`之后有效提升了首屏速度，在Disable cache下 大约从3s提升到了2.3左右。

更多关于该项目的请点击这里看[Readme ](<https://github.com/Mrshulan/Muti_ShareBlog_FE) 👆