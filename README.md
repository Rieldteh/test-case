<!-- /* cSpell:disable */
/* spell-checker: disable */
/* spellchecker: disable */ -->
<h1 align="center">Test-case</h1>

## Технологии

В данном проекте использовались следующие технологии:

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Prisma](https://www.prisma.io)
- [TypeScript](https://www.typescriptlang.org)
- [Eslint](https://eslint.org)

## Как использовать

Сначала необходимо выполнить установку проекта.

```bash
# Скопировать репозиторий
$ git clone https://github.com/Rieldteh/test-case

# Перейти в созданную директорию
$ cd test-case
```

### Запуск сервиса 1 в задании 1
```bash
# Запуск проекта:
# Переход в директорию первого сервиса
$ cd task1/service1

# Установить зависимости
$ npm run start
```

### Запуск сервиса2 в задании 1
```bash
# Запуск проекта:
# Переход в директорию первого сервиса
$ cd task1/service2

# Установить зависимости
$ npm run start
```

### Запуск задания 2
```bash
# Установка проекта:
# Переход в директорию первого сервиса
$ cd task2/prject2

# Установить зависимости
$ npm run start
```

### Базы данных

| Параметр              | Значение    |
|-----------------------|-------------|
| Host name/address     | postgres    |
| Port                  | 5432        |
| Maintenance database  | postgres    |
| Username              | postgres    |
| Password              | qwerty1234  |

Используемые БД:
|           БД          |     Назначение    |
|-----------------------|-------------------|
| Test                  | task1/service1    |
| Logs                  | task1/service2    |
| Test2                 | task2             |

## Используемые end-point's
В приложении используются следующие end point's

### Задание 1
#### Сервис 1

#### product

| Метод запроса | End-point              | Значение                       |
|---------------|------------------------|--------------------------------|
| POST          | /procucts/create       | Создание продукта              |
| POST          | /procucts              | Получение списка продуктов     |
| DELETE        | /procucts              | Удаление продукта              |

#### shop

| Метод запроса | End-point              | Значение                       |
|---------------|------------------------|--------------------------------|
| POST          | /shops/create          | Создание магазина              |
| POST          | /shops                 | Получение списка магазинов     |
| DELETE        | /shops                 | Удаление магазина              |


#### stock

| Метод запроса | End-point               | Значение                                 |
|---------------|-------------------------|------------------------------------------|
| GET           | /stocks/storages/create | Создать хранилище                        |
| POST          | /stocks/storages        | Получение списка хранилищ                |
| DELETE        | /stocks/storages        | Удаление хранилища                       |
| POST          | /stocks/storages/inc    | Увеличение остатка в хранилище           |
| POST          | /stocks/storages/dec    | Увеличение остатка в хранилище           |
| GET           | /stocks/orders/create   | Создание заказа                          |
| POST          | /stocks/orders          | Получение списка активных заказов        |
| DELETE        | /stocks/orders/:id      | Удаление заказа                          |

#### Сервис 2

#### logs

| Метод запроса | End-point               | Значение                                 |
|---------------|-------------------------|------------------------------------------|
| POST          | /logs                   | Создать лог                              |
| POST          | /logs/:pageNum          | Просмотр списка логов                    |
| DELETE        | /logs/:id               | Удаление лога                            |


### Задание 2

#### users

| Метод запроса | End-point              | Значение                          |
|---------------|------------------------|-----------------------------------|
| GET           | /users?page=page       | Просмотреть список пользователей  |
| POST          | /users                 | Получить количество пользователей c активными проблемами и изменить их на false |