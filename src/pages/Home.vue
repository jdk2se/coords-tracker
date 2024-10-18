<template>
  <div class="wrapper">
    <Paragraph
      v-for="(task, index) in tasks"
      :task="task"
      :key="index"
    />
    <ol>
      <li>
        При клике на кнопку добавления, карта должна перейти в режим добавления маркера: в месте клика должен появится маркер, а в списке - запись с адресом точки.
        <ol type="a">
          <li>
            Для поиска адреса можно использовать любое бесплатное API для геокодирования, например:
            <a href="https://geocode.maps.co/">https://geocode.maps.co/</a>
          </li>
          <li>В случае, если адрес не найден, необходимо вывести ошибку и не добавлять маркер в список.</li>
        </ol>
      </li>
      <li>
        При клике на маркер должна подсвечиваться запись в списке.
      </li>
      <li>
        При клике на запись в списке карта должна центрироваться на маркере.
      </li>
      <li>
        Маркеры должны храниться локально и не пропадать после перезагрузки страницы.
      </li>
      <li>
        В адресной строке должен отображаться id выбранного маркера.
      </li>
    </ol>
    
    <h3>Дополнительно:</h3>
    <ol>
      <li>Продумать отображение на мобильных устройствах.</li>
      <li>Предусмотреть локализацию.</li>
      <li>Необходимо с помощью jest написть 1 модульный тест на любой компонент.</li>
    </ol>
    
    <p><b>Напоминание:</b> тестовое задание призвано показать умение писать хороший модульный код, а также умение пользоваться указанными технологиями и не только. Этим кодом нужно гордиться.</p>
    <p>Пример:</p>
    <img alt="MapExample" class="map__demo" src="@/assets/images/map.jpg" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, Ref } from "vue";
  import Paragraph from "@/components/Paragraph.vue";
  import { ITaskOption } from "@/types/ITaskOption.ts";

  const tasks: Ref<ITaskOption[]> = ref([]);
  onBeforeMount(async () => {
    tasks.value = (await import('@/data/tasks.json')).default;
  }); 
</script>

<style scoped lang="scss">
  .map__demo {
    display: block;
    margin: 0 auto;
  }
</style>