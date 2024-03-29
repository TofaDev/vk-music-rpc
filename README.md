[![Github All Releases](https://img.shields.io/github/downloads/TofaDev/vk-music-rpc/total.svg)]()![GitHub last commit (branch)](https://img.shields.io/github/last-commit/TofaDev/vk-music-rpc/main)

<h1>Описание</h1>
Программа позволяет транслировать музыку которую вы слушаете ВКонтакте в дискорд

Как это выглядит:

![Когда музыка играет в ВК](https://files.tofadevel.ru/api/files/download/when_playing.png)

Когда музыка не играет:

![Когда музыка не играет в ВК](https://files.tofadevel.ru/api/files/download/when_not_playing.png)

Все сообщения конфигурируются в файле который создается после запуска программы

<h1>Возможные проблемы и их решение</h1>

<h2>Программа запустилась, но статус в дискорде не отображается</h2>

Убедитесь, что в дискорде включено отображение активности

настройки -> конфидециальность -> отображать текущую активность в игре

<h1>Установка</h1>

Первым делом, если у Вас не установлен [Tampermonkey](https://www.tampermonkey.net/) - его необходимо установить длля вашего браузера

Даллее, Вам нужно установить скрипт:

- [Версия для Вконтакте](https://raw.githubusercontent.com/TofaDev/vk-music-rpc/main/vk-extension.js)
- [Версия для Я. Музыки](https://raw.githubusercontent.com/TofaDev/vk-music-rpc/main/yandex-extension.js)

На этом всё, далее нужно скачать саму программу и запустить её, вы прекрасны.

Программа доступна для Linux, Windows, iOS можно скачать на странице релизов: https://github.com/TofaDev/vk-music-rpc/releases/tag/release

<h1>Самостоятельная сборка</h1>

<h2>Зависимости:</h2>

Node js версии 16

<h2>Инструкция:</h2>

По стандарту билд будет происходить под x64 процессоры под системы Linux, iOS, Windows

Если вам нужен билд под другой тип процессоров, то вы можете изменить scope в файле **package.json** под ваши нужды

Для сборки необходимо консоль и ввести команду **npm run build:release**,
после чего в папке с проектом появится папка **releases**, в которой будут собранные бинарные файлы
