import { defineStore } from 'pinia';

type WeatherState = {
    weather: WeatherResult | null;
    loading: boolean;
    error: string | null;
}

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weather: null,
        loading: false,
        error: null,
    } as WeatherState),
    getters: {
        getWeather() : WeatherResult | null {
            return this.weather;
        },
        getLoading() : boolean {
            return this.loading;
        },
        getError() : string | null{
            return this.error;
        },
    },
    actions: {
        async fetchWeather() {
            this.loading = true
            try {
                const response = await fetch('https://apis.is/weather/forecasts/is?stations=422')
                const weather = await response.json();
                this.weather = weather.results[0];
            }
            catch (error) {
                this.error = error as string;
            }
            finally {
                this.loading = false
            }
        },
    },
})

type WeatherResult = {
    name: string;
    atime: string;
    err: string;
    link: string;
    forecast: WeatherForecast[];
    id: string;
    valid: string;
}

type WeatherForecast = {
    ftime: string;
    F: string;
    D: string;
    T: string;
    W: string;
    N: string;
    TD: string;
    R: string;
}