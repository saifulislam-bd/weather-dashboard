import { useEffect, useState, useCallback } from "react";

const initialData = {
  location: "",
  climate: "",
  temperature: "",
  maxTemperature: "",
  minTemperature: "",
  humidity: "",
  cloudPercentage: "",
  wind: "",
  time: "",
  longitude: "",
  latitude: "",
};

export function useWeather() {
  const [weatherData, setWeatherData] = useState(initialData);
  const [loading, setLoading] = useState({ state: false, message: "" });
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async (latitude, longitude) => {
    try {
      setLoading({
        ...loading,
        state: true,
        message: "Fetching weather data...",
      });

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );

      if (!response.ok) {
        const errorMessage = `Fetching weather data failed: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();

      const updatedWeatherData = {
        ...weatherData,
        location: data?.name,
        climate: data?.weather[0]?.main,
        temperature: data?.main?.temp,
        maxTemperature: data?.main?.temp_max,
        minTemperature: data?.main?.temp_min,
        humidity: data?.main?.humidity,
        cloudPercentage: data?.clouds?.all,
        wind: data?.wind?.speed,
        time: data?.dt,
        latitude: latitude,
        longitude: longitude,
      };
      setWeatherData(updatedWeatherData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading({ state: false, message: "" });
    }

    return { weatherData, loading, error };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading({ state: true, message: "Finding location..." });
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherData(position.coords.latitude, position.coords.longitude);
    });
  }, [fetchWeatherData]);
  return { weatherData, loading, error };
}
