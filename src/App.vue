<script setup>
import {computed, ref} from "vue";
import axios from "axios";
import { message } from 'ant-design-vue';

const city = ref('')
const info = ref(null)
const cityName = computed(() => city.value ? city.value : 'your city')

const getWeather = async () => {
  if(city.value.trim().length < 2){
    message.error('Please enter a valid city name');
    return false
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);
    info.value = response.data;
  } catch (error) {
    message.error(error.message);
  }
}
</script>

<template>
  <div class="grid">
    <ACard>
      <h1>Weather in {{cityName}}</h1>
      <div class="search">
        <AInput placeholder="Enter city" v-model:value="city" />
        <AButton type="primary" v-show="city" @click="getWeather">Get weather</AButton>
      </div>
    </ACard>
    <AList v-if="info" bordered>
      <AListItem>
        <AListItemMeta>
          <template #title>Temperature</template>
          <template #description>{{ info.main.temp }}</template>
        </AListItemMeta>
      </AListItem>
      <AListItem>
        <AListItemMeta>
          <template #title>Feels like</template>
          <template #description>{{ info.main.feels_like }}</template>
        </AListItemMeta>
      </AListItem>
      <AListItem>
        <AListItemMeta>
          <template #title>Minimum temperature</template>
          <template #description>{{ info.main.temp_min }}</template>
        </AListItemMeta>
      </AListItem>
      <AListItem>
        <AListItemMeta>
          <template #title>Maximum temperature</template>
          <template #description>{{ info.main.temp_max }}</template>
        </AListItemMeta>
      </AListItem>
    </AList>
  </div>

</template>

<style scoped>
.grid {
  width: 100%;
  max-width: 400px;
  display: grid;
  gap: 16px;
}

.search {
  display: flex;
  gap: 8px;
}

</style>
