<template>
    <section class="header">
        <h1>Veður</h1>
    </section>
    <div class="container">
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-if="error">Error: {{ error }}</div>
            <div v-else>
                <h1>Weather</h1>
                <div>
                    <h2>{{ weather?.name }}</h2>
                    <small>{{ weather?.atime }}</small>
                    <div v-for="(f, i) in weather?.forecast" :key="i">
                        {{ f.T }}°C
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useWeatherStore } from '@/stores/weather';
import { computed, onMounted } from 'vue';

const weatherStore = useWeatherStore();

const weather = computed(() => weatherStore.getWeather);
const loading = computed(() => weatherStore.loading);
const error = computed(() => weatherStore.error);

onMounted(() => {
    weatherStore.fetchWeather();
});

</script>