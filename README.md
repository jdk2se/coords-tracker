1. Для работы с картами использовал сервис Leaflet 
2. Адрес проверяет по схеме - если у выбранной точки в ответе API нет номера дома и индекса - значит это не адрес. 
3. Переключение локали лучше смотреть на странице карт, т.к. О задании подружается из json. Можно сделать отдельный json для 
английской локали и при смене языка подружать его (если он не был загружен ранее) и ререндерить компонент.
4. Тестовый файл получился маленький. Компоненты рендерят данные, логики нет. Не получилось быстро разобраться как тестировать 
непосредственно карту.
