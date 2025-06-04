import Header from "./components/header";
import WeatherBoard from "./components/weather-board";
import { WeatherProvider } from "./provider";

export default function App() {
  return (
    <WeatherProvider>
      <div className="grid place-items-center h-screen">
        <Header />
        <main>
          <section>
            <WeatherBoard />
          </section>
        </main>
      </div>
    </WeatherProvider>
  );
}
