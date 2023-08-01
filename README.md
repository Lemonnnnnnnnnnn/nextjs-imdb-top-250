## imdb-top-250

[中文简介](./README.cn.md)

preview: [website](http://3.139.72.119:3000/en)

### feature

- next13(App) + Prisma + SQLite : full stack application
- tailwindcss + headlessUI  : customized UI  + responsive design
- next-auth : introduce github + google OAuth login method
- next-themes : dark mode
- chart.js + react-chartjs-2 : visualization data
- use middleware feature introduced by next12 to complete 18n
- swr : make the data obtained by the client automatically cached.

### develop

```
pnpm i
```

If you use npm install , npm will automatically install [prisma-client] dependency. but if you use pnpm like me , additional command need be execute : 

```
pnpm exec prisma generate
```

run : 

```
pnpm dev
```

build : 

```
pnpm build 
```
