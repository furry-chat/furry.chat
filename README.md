# furry.chat

Сайт-визитка Discord-сервера русскоязычного фурри-сообщества — [furry.chat](https://furry.chat/).

Сайт собирается [Jekyll](https://jekyllrb.com/) и публикуется через GitHub Pages из папки `docs/`.

## Что где лежит

| Файл | Назначение |
| --- | --- |
| `docs/_data/config.yml` | Код приглашения в Discord, ссылки, ключевые слова |
| `docs/_data/stats.yml` | Запасные цифры статистики (живые подгружаются из Discord) |
| `docs/_config.yml` | Название, описание и SEO |
| `docs/index.html` | Главная страница |
| `docs/_layouts/default.html` | Общий каркас: шапка, подвал, иконки |
| `docs/assets/css/theme.css` | Стили (светлая и тёмная тема) |
| `docs/assets/js/theme.js` | Копирование ссылки и живая статистика |

## Как поменять ссылку-приглашение

Откройте `docs/_data/config.yml` и замените `discord.invite` на новый код
(то, что идёт после `discord.gg/`). Приглашение должно быть **бессрочным**.

## Локальный запуск

```bash
gem install jekyll jekyll-seo-tag jekyll-sitemap
jekyll serve --source docs
```
