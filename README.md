# test_beSocial

* Итак, проект использует фреймворк fastify, подключен модуль Swagger(для генерации документации). 
* Запускается сервер командой npm run dev на http://127.0.0.1:8080
* На http://127.0.0.1:8080/api/docs можно увидеть документацию: примеры запросов, примеры ответов.
Пример документации: ![image](https://user-images.githubusercontent.com/79270327/194718195-4ab22152-a4a6-430f-b475-f0d0620a94f9.png)

* Есть метод получения списка пользователей(можно увидеть айди и протестировать на работоспособность все роуты)
* Ошибки описаны, дополнительные задания выполнены, для перевода в другую валюту баланса пользователя парсится
реальный курс валют, изначально писался свой парсер, но вспомнил про API =) (изначально не заметил, что баланс у пользователей в долларах, брал гривну и парсил данные оф.банка, поэтому при расчёте баланса под валюту гривны или долларов решение именное такое, какое можно наблюдать в проекте).
* Валидация данных присутствует.
