## imdb-top-250

预览: [网站](http://3.139.72.119:3000/en)

### feature

- next13(App) + Prisma + SQLite : 全栈应用
- tailwindcss + headlessUI  : 自定义UI + 响应式设计
- next-auth : 支持 OAuth 授权登录（谷歌、github），邮箱注册登录
- next-themes : 暗黑模式
- chart.js + react-chartjs-2 : 数据可视化
- 用 nextjs12 引入的路由中间件特性实现18n
- swr（stale-while-revalidate） : 使用 swr 库实现缓存管理，组件将会不断地、自动获得最新数据流。

### develop

```
pnpm i
```

如果你使用 npm install ， npm 会自动安装 [prisma-client] 依赖，但如果你和我一样使用的是 pnpm ，则需要通过以下指令手动安装该依赖：

```
pnpm exec prisma generate
```

运行项目 : 

```
pnpm dev
```

打包项目 : 

```
pnpm build 
```
