import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { weatherService } from "../service/weather.service";
import { WeatherData, ForecastData } from "../models/weather.model";
import { RootState } from "../../../store/store";

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  loading: {
    currentWeather: boolean;
    forecast: boolean;
  };
  error: {
    currentWeather: string | null;
    forecast: string | null;
  };
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: {
    currentWeather: false,
    forecast: false,
  },
  error: { currentWeather: null, forecast: null },
};

export const fetchCurrentWeatherData = createAsyncThunk(
  "weather/fetchCurrentData",
  async ({ lat, lon }: { lat: number; lon: number }, { rejectWithValue }) => {
    try {
      return await weatherService.getCurrentWeather(lat, lon);
    } catch {
      return rejectWithValue("Failed to fetch current weather");
    }
  }
);

export const fetchForecastData = createAsyncThunk(
  "weather/fetchForecastData",
  async ({ lat, lon }: { lat: number; lon: number }, { rejectWithValue }) => {
    try {
      return await weatherService.getForecast(lat, lon);
    } catch {
      return rejectWithValue("Failed to fetch forecast");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeatherData: (state) => {
      state.currentWeather = null;
      state.forecast = null;
      state.loading = { currentWeather: false, forecast: false };
      state.error = { currentWeather: null, forecast: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeatherData.pending, (state) => {
        state.loading.currentWeather = true;
        state.error.currentWeather = null;
      })
      .addCase(fetchCurrentWeatherData.fulfilled, (state, action) => {
        state.loading.currentWeather = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchCurrentWeatherData.rejected, (state, action) => {
        state.loading.currentWeather = false;
        state.error.currentWeather = action.payload as string;
      })
      .addCase(fetchForecastData.pending, (state) => {
        state.loading.forecast = true;
        state.error.forecast = null;
      })
      .addCase(fetchForecastData.fulfilled, (state, action) => {
        state.loading.forecast = false;
        state.forecast = action.payload;
      })
      .addCase(fetchForecastData.rejected, (state, action) => {
        state.loading.forecast = false;
        state.error.forecast = action.payload as string;
      });
  },
});

export const weatherActions = weatherSlice.actions;

export const selectWeatherState = (state: RootState) => state.weather;

export const selectCurrentWeather = createSelector(
  selectWeatherState,
  (weatherState) => weatherState.currentWeather
);

export const selectForecast = createSelector(
  selectWeatherState,
  (weatherState) => weatherState.forecast
);

export const selectIsLoading = createSelector(
  selectWeatherState,
  (weatherState) => weatherState.loading
);

export const selectError = createSelector(
  selectWeatherState,
  (weatherState) => weatherState.error
);

export default weatherSlice.reducer;
