import { useContext, useEffect, useState } from "react";
import Header from "./components/header";
import WeatherBoard from "./components/weather-board";
import { WeatherContext } from "./context";

import ClearSkyImage from "./assets/backgrounds/clear-sky.jpg";
import FewCloudsImage from "./assets/backgrounds/few-clouds.jpg";
import MistImage from "./assets/backgrounds/mist.jpeg";
import RainyDayImage from "./assets/backgrounds/rainy-day.jpg";
import ScatteredCloudImage from "./assets/backgrounds/scattered-clouds.jpg";
import SnowImage from "./assets/backgrounds/snow.jpg";
import ThunderStormImage from "./assets/backgrounds/thunderstorm.jpg";
import WinterImage from "./assets/backgrounds/winter.jpg";

export default function Page() {
  const { weatherData, loading } = useContext(WeatherContext);
  const [climateImage, setClimateImage] = useState("");

  function getBackgroundImage(climate) {
    switch (climate) {
      case "Haze":
        return WinterImage;
      case "Clouds":
        return FewCloudsImage;
      case "Mist":
        return MistImage;
      case "Rain":
        return RainyDayImage;
      case "Snow":
        return SnowImage;
      case "Thunderstorm":
        return ThunderStormImage;
      case "Drizzle":
        return ScatteredCloudImage;
      default:
        return ClearSkyImage;
    }
  }

  useEffect(() => {
    const bgImage = getBackgroundImage(weatherData.climate);
    setClimateImage(bgImage);
  }, [weatherData.climate]);
  return (
    <>
      {loading.state ? (
        <div className="flex bg-gray-200 rounded-md w-96 mt-14 mx-auto p-4">
          <p className="text-3xl text-black text-center">{loading.message}</p>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${climateImage})`,
          }}
          className="grid place-items-center h-screen bg-no-repeat bg-cover"
        >
          <Header />
          <main>
            <section>
              <WeatherBoard />
            </section>
          </main>
        </div>
      )}
    </>
  );
}
