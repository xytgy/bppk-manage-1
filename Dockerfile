# build stage
FROM m.daocloud.io/docker.io/library/node:18-alpine AS build-stage
WORKDIR /app

# 设置阿里云镜像源，大幅提升安装速度
RUN npm config set registry https://registry.npmmirror.com

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# production stage
FROM m.daocloud.io/docker.io/library/nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
