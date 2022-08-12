# Приложение 'Todo list'

стек: NestJS, TypeORM, GraphQL и Angular.

Запускается на порту 3000 командой `bash launch.sh'

в этом файле последовательнсть команд

```
cd ./todofront; npm i; npm run build-front
cd ../todolist; docker-compose up & npm run start:prod
```

docker-compose поднимает контейнеры с БД и pgAdmin, само БД монтируется из директории с беком (todolist/data)
