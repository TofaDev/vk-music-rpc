<h1>Описание</h1>
Программа позволяет транслировать музыку которую вы слушаете ВКонтакте в дискорд

Как это выглядит:

![Когда музыка играет в ВК](https://files.tofahome.space/api/download/github_music_played.png)

Когда музыка не играет:

![Когда музыка не играет в ВК](https://files.tofahome.space/api/download/github_music_not_played.png)

Все сообщения конфигурируются в файле который создается после запуска программы

<h1>Возможные проблемы и их решение</h1>

<h2>Программа запустилась, но статус в дискорде не отображается</h2>

Убедитесь, что в дискорде включено отображение активности

настройки -> конфидециальность -> отображать текущую активность в игре

<h1>Скачать программу</h1>

Программа для Linux, Windows, iOS можно скачать на странице релизов: https://github.com/TofaDev/vk-music-rpc/releases/tag/release

<h1>Самостоятельная сборка</h1>

<h2>Зависимости:</h2>

Node js версии 16


<h2>Инструкция:</h2>

По стандарту билд будет происходить под x64 процессоры под системы Linux, iOS, Windows

Если вам нужен билд под другой тип процессоров, то вы можете изменить scope в файле **package.json** под ваши нужды

Для сборки необходимо консоль и ввести команду **npm run build:release**,
после чего в папке с проектом появится папка **releases**, в которой будут собранные бинарные файлы