<script setup>
import {computed, ref} from "vue";
import axios from "axios";
import {message} from 'ant-design-vue';
import IconHumidity from "@/components/icons/IconHumidity.vue";
import IconWind from "@/components/icons/IconWind.vue";
import IconThermometer from "@/components/icons/IconThermometer.vue";
import IconThermometerExterior from "@/components/icons/IconThermometerExterior.vue";

const isLoading = ref(false)
const city = ref('')
const info = ref(null)
const cityName = computed(() => city.value ? city.value : 'Your city')

const getWeather = async () => {
  if (city.value.trim().length < 2) {
    message.error('Please enter a valid city name');
    return
  }

  try {
    isLoading.value = true;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);
    info.value = response.data;
  } catch (error) {
    message.error(error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <ALayout>
    <ALayoutContent class="content">
      <ACard class="wrapper">
        <div class="inner">
          <ATypographyTitle class="title">Weather in {{ cityName }}</ATypographyTitle>
          <AForm @submit="getWeather">
            <AInput placeholder="Enter city" v-model:value="city"/>
          </AForm>
          <AList v-if="info" bordered>
            <AListItem>
              <AListItemMeta>
                <template #avatar>
                  <img
                    :src="`https://openweathermap.org/img/w/${info.weather[0].icon}.png`"
                    :alt="info.weather[0].description"
                    width="32px"
                    height="32px"
                  >
                </template>
                <template #title>
                  <span class="description">{{ info.weather[0].description }}</span>
                </template>
                <template #description>{{ info.main.temp }} °C</template>
              </AListItemMeta>
            </AListItem>
            <AListItem>
              <AListItemMeta>
                <template #avatar>
                  <IconThermometer/>
                </template>
                <template #title>Feels like</template>
                <template #description>{{ info.main.feels_like }} °C</template>
              </AListItemMeta>
            </AListItem>
            <AListItem>
              <AListItemMeta>
                <template #avatar>
                  <IconThermometerExterior/>
                </template>
                <template #title>Min/Max</template>
                <template #description>{{ info.main.temp_min }}/{{ info.main.temp_max }} °C</template>
              </AListItemMeta>
            </AListItem>
            <AListItem>
              <AListItemMeta>
                <template #avatar>
                  <IconHumidity/>
                </template>
                <template #title>Humidity</template>
                <template #description>{{ info.main.humidity }} %</template>
              </AListItemMeta>
            </AListItem>
            <AListItem>
              <AListItemMeta>
                <template #avatar>
                  <IconWind/>
                </template>
                <template #title>Wind</template>
                <template #description>{{ info.wind.speed }} m/s</template>
              </AListItemMeta>
            </AListItem>
          </AList>
          <ASkeleton v-else :loading="isLoading" active avatar/>
        </div>
      </ACard>
    </ALayoutContent>
  </ALayout>
</template>

<style scoped>
.content {
  height: 100dvh;
  padding: 16px;
}

.wrapper {
  width: 100%;
  max-width: 400px;
  margin: 16px auto;
}

.inner {
  display: grid;
  gap: 16px;
}

.title {
  margin: 0;
  text-align: center;
}
</style>
