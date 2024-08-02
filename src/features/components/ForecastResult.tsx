import styles from "../styles/ForecastResult.module.css"
import { useEffect, useState } from "react"
import { fetchWeatherApi } from "openmeteo";
import decodeWeatherCode from "../../utils/weatherCode.ts"
import determineUv from "../../utils/getUV.ts";
import DailyCards from "./DailyCards.tsx";
import HourlyCards from "./HourlyCards.tsx";
import { Link, useLocation } from "react-router-dom";
import background2 from "../../assets/imgs/cloudy.avif"
import getDayOfWeek from "../../utils/dayOfWeek.ts";
import getMonth from "../../utils/getMonth.ts";

type weatherData = {
  current: {
    time: Date,
    temperature2m: number,
    apparentTemperature: number,
    isDay: number,
    weatherCode: number,
    windSpeed10m: number,
    windDirection10m: number
  },
  hourly: {
    time: Date[],
    temperature2m: Float32Array,
    apparentTemperature: Float32Array,
    precipitationProbability: Float32Array,
    weatherCode: Float32Array,
    windSpeed10m: Float32Array,
    windDirection10m: Float32Array,
    relativeHumidity2m: Float32Array,
    surfacePressure: Float32Array,
    visibility: Float32Array,
  },
  daily: {
    time: Date[],
    weatherCode: Float32Array,
    temperature2mMax: Float32Array,
    temperature2mMin: Float32Array,
    apparentTemperatureMax: Float32Array,
    apparentTemperatureMin: Float32Array,
    sunrise: Float32Array,
    sunset: Float32Array,
    uvIndexMax: Float32Array
  }
}

export default function ForecastResult() {

  const [data, setData] = useState<weatherData>();
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    const fetchForecast = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const params = {
        "latitude": urlParams.get('latitude'),
        "longitude": urlParams.get('longitude'),
        "current": ["temperature_2m", "apparent_temperature", "is_day", "weather_code", "wind_speed_10m", "wind_direction_10m"],
        "hourly": ["temperature_2m", "apparent_temperature", "precipitation_probability", "weather_code", "wind_speed_10m", "wind_direction_10m", "relative_humidity_2m", "surface_pressure", "visibility"],
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "uv_index_max"],
        "wind_speed_unit": "mph",
        "timezone": "auto",
        "forecast_days": 14
      }
  
      // Helper function to form time ranges
      const range = (start: number, stop: number, step: number): number[] => {
        return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
      }
  
      const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params)
      const response = responses[0];
  
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current()!;
      const hourly = response.hourly()!;
      const daily = response.daily()!;
  
      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature2m: current.variables(0)!.value(),
          apparentTemperature: current.variables(1)!.value(),
          isDay: current.variables(2)!.value(),
          weatherCode: current.variables(3)!.value(),
          windSpeed10m: current.variables(4)!.value(),
          windDirection10m: current.variables(5)!.value(),
        },
        hourly: {
          time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          temperature2m: hourly.variables(0)!.valuesArray()!,
          apparentTemperature: hourly.variables(1)!.valuesArray()!,
          precipitationProbability: hourly.variables(2)!.valuesArray()!,
          weatherCode: hourly.variables(3)!.valuesArray()!,
          windSpeed10m: hourly.variables(4)!.valuesArray()!,
          windDirection10m: hourly.variables(5)!.valuesArray()!,
          relativeHumidity2m: hourly.variables(6)!.valuesArray()!,
          surfacePressure: hourly.variables(7)!.valuesArray()!,
          visibility: hourly.variables(8)!.valuesArray()!,
        },
        daily: {
          time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          weatherCode: daily.variables(0)!.valuesArray()!,
          temperature2mMax: daily.variables(1)!.valuesArray()!,
          temperature2mMin: daily.variables(2)!.valuesArray()!,
          apparentTemperatureMax: daily.variables(3)!.valuesArray()!,
          apparentTemperatureMin: daily.variables(4)!.valuesArray()!,
          sunrise: daily.variables(5)!.valuesArray()!,
          sunset: daily.variables(6)!.valuesArray()!,
          uvIndexMax: daily.variables(7)!.valuesArray()!,
        },
      };
      setData(weatherData);
    }

    fetchForecast();
    return () => {
    }
  }, [location])

  return (
    <>
    {
      data ?
      <>
      <div className={styles.upper_container}>
        <img className={styles.upper_container__img} src={background2} alt="" />
        <div className={styles.current_card}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.325q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762t-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575T16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12"/></svg>
          <h1 className={styles.current__location}>{new URLSearchParams(window.location.search).get('name')}</h1>
          <h3 className={styles.current__date}>{getDayOfWeek(data.current.time.getUTCDay())}, {getMonth(data.current.time.getUTCMonth())} {data.current.time.getUTCDate()} {data.current.time.getUTCHours().toString().length < 2 ? `0${data.current.time.getUTCHours()}` : data.current.time.getUTCHours()}:{data.current.time.getUTCMinutes().toString().length < 2 ? `0${data.current.time.getUTCMinutes()}` : data.current.time.getUTCMinutes()}</h3>
          <div className={styles.current__row}>
            <img 
              className={styles.current__img} 
              src={decodeWeatherCode(data.current.weatherCode, data.current.isDay == 1).image}
              alt={decodeWeatherCode(data.current.weatherCode, data.current.isDay == 1).description}
              title={decodeWeatherCode(data.current.weatherCode, data.current.isDay == 1).description}
            />
            <div className={styles.current__col}>
              <h2 className={styles.current__temp}>
                {Math.round(data.current.temperature2m)}°
              </h2>
              <h3 className={styles.current__apparent_temp}>
                Feels like {Math.round(data.current.apparentTemperature)}°
              </h3>
            </div>
          </div>
          <h3 className={styles.current__desc}>{decodeWeatherCode(data.current.weatherCode, data.current.isDay == 1).description}</h3>
        </div>
        <DailyCards dailyData={data.daily} setSelectedDay={setSelectedDay} selectedDay={selectedDay} />
      </div>
      <HourlyCards hourlyData={data.hourly} selectedDay={selectedDay} currentTime={data.current.time} />
      <div className={styles.more_info__container}>
        <div className={styles.more_info__warnings}>
          <div className={styles.more_info__row}>
            <div 
            title={`${determineUv(Math.round(data.daily.uvIndexMax[selectedDay])).category} UV`}
            style={{borderColor: `${determineUv(Math.round(data.daily.uvIndexMax[selectedDay])).colour}`, backgroundColor: `${determineUv(Math.round(data.daily.uvIndexMax[selectedDay])).colour}`, color: `${determineUv(Math.round(data.daily.uvIndexMax[selectedDay])).textColour}`}} 
            className={styles.more_info__uv}
            >
              {determineUv(Math.round(data.daily.uvIndexMax[selectedDay])).abbreviation}
            </div>
            <h3 style={{color: `${determineUv(Math.round(data.daily.uvIndexMax[selectedDay])).colour}`}} className={styles.more_info__uv_text}>{determineUv(Math.round(data.daily.uvIndexMax[selectedDay])).category} UV</h3>
          </div>

        </div>
        <div className={styles.more_info__citations}>
          <small>What does it mean? Look at our <Link to={`../guide`}>Weather Guide</Link>.</small>
        </div>
      </div>
      </> : <div className={styles.loader}></div>
    }

    </>
  )
}
