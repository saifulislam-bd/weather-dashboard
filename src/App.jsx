import Header from "./components/header";
import WeatherBoard from "./components/weather-board";
import { FavoriteProvider, WeatherProvider } from "./provider";

export default function App() {
  return (
    <WeatherProvider>
      <FavoriteProvider>
        <div className="grid place-items-center h-screen">
          <Header />
          <main>
            <section>
              <WeatherBoard />
            </section>
          </main>
        </div>
      </FavoriteProvider>
    </WeatherProvider>
  );
}
