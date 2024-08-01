import { useEffect, useRef, useState } from "react"
import styles from "../styles/HourlyCards.module.css"
import getDayOfWeek from "../../utils/dayOfWeek";
import decodeWeatherCode from "../../utils/weatherCode";

interface Props {
  hourlyData: {
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
  selectedDay: number,
  currentTime: Date
}

export default function HourlyCards({hourlyData, selectedDay, currentTime}: Props) {

  const [openedCard, setOpenedCard] = useState<number>(-1);
  const hourlyCardContainer = useRef<HTMLDivElement>(null);
  const [highestTemp, setHighestTemp] = useState<number>(-100);
  const [lowestTemp, setLowestTemp] = useState<number>(100);

  useEffect(() => {
    setHighestTemp(-100);
    setLowestTemp(100);
    setOpenedCard(-1);
    if (selectedDay == 0) {
      if (currentTime.getUTCHours() - 6 >= 6) {
        hourlyCardContainer.current?.scroll({left: 75 * 6});
      } else {
        hourlyCardContainer.current?.scroll({left: 75 * (currentTime.getUTCHours() - 6)});
      }
    } else {
      hourlyCardContainer.current?.scroll({left: 0});
    }
  
    return () => {
      
    }
  }, [selectedDay, hourlyData, currentTime])
  

  const cardOnClick = (idx: number) => {
    // const index = idx%24 > 5 ? idx%24-6 : idx%24+18; 
    if (openedCard == idx) {
      setOpenedCard(-1);
    } else {
      setOpenedCard(idx);
    }
  }

  const calcPrecipitationChance = (percent: number) => {
    if (percent === 0) {
      return 'Precipitation is not expected';
    }
    if (percent <= 30) {
      return 'Low chance of precipitation';
    }
    if (percent <= 70) {
      return 'Chance of precipitation';
    }
    if (percent <= 100) {
      return 'High chance of precipitation';
    }
  }

  const calcVisibility = (metres: number) => {
    if (metres <= 1000) {
      return 'Very Poor';
    }
    if (metres <= 4000) {
      return 'Poor';
    }
    if (metres <= 10000) {
      return 'Moderate';
    }
    if (metres <= 20000) {
      return 'Good';
    }
    if (metres <= 40000) {
      return 'Very Good';
    }
    if (metres > 40000) {
      return 'Excellent';
    }
  }

  const calcWindDescription = (direction: number, speed: number) => {
    return `${calcWindMagnitude(speed)} from the ${calcWindDirection(direction)}`;
  }

  const calcWindMagnitude = (speed: number) => {
    if (speed < 6) {
      return "Light air";
    }
    if (speed < 10) {
      return "Light breeze";
    }
    if (speed < 15) {
      return "Gentle breeze";
    }
    if (speed < 22) {
      return "Moderate breeze";
    }
    if (speed < 28) {
      return "Fresh breeze";
    }
    if (speed < 35) {
      return "Strong breeze";
    }
    if (speed < 43) {
      return "Near gale winds";
    }
    if (speed < 51) {
      return "Gale winds";
    }
    if (speed < 60) {
      return "Strong gale winds";
    }
    if (speed < 69) {
      return "Storm winds";
    }
    if (speed < 74) {
      return "Violent storm winds";
    } else {
      return "Hurricane winds";
    }
  }

  const calcWindDirection = (direction: number) => {
    if (direction > 348.75 || direction <= 11.25) {
      return "north";
    }
    if (direction <= 33.75) {
      return "north north east";
    }
    if (direction <= 56.25) {
      return "north east";
    }
    if (direction <= 78.75) {
      return "east north east";
    }
    if (direction <= 101.25) {
      return "east";
    }
    if (direction <= 123.75) {
      return "east south east";
    }
    if (direction <= 146.25) {
      return "south east";
    }
    if (direction <= 168.75) {
      return "south south east";
    }
    if (direction <= 191.25) {
      return "south";
    }
    if (direction <= 213.75) {
      return "south south west";
    }
    if (direction <= 236.25) {
      return "south west";
    }
    if (direction <= 258.75) {
      return "west south west";
    }
    if (direction <= 281.25) {
      return "west";
    }
    if (direction <= 303.75) {
      return "west north west";
    }
    if (direction <= 326.25) {
      return "north west";
    }
    if (direction <= 348.75) {
      return "north north west";
    }
  }

  return (
    <div className={styles.card_wrapper}>
        <button onClick={() => hourlyCardContainer.current?.scroll({left: hourlyCardContainer.current.scrollLeft - 600})} className={styles.card_left}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/></svg>
        </button>
        <div ref={hourlyCardContainer} className={styles.card_container}>
        {
          selectedDay == 0 || selectedDay > 0 ?
          hourlyData.time.map((time, idx) => {
            if (6 + (selectedDay * 24) > idx || idx >= 30 + (selectedDay * 24)) {
              return null
            }
            if (Math.round(hourlyData.temperature2m[idx]) < lowestTemp) {
              setLowestTemp(Math.round(hourlyData.temperature2m[idx]));
            }
            if (Math.round(hourlyData.temperature2m[idx]) > highestTemp) {
              setHighestTemp(Math.round(hourlyData.temperature2m[idx]));
            }
            return (
              <div style={{animationDelay: `${((idx-6)%24) * 0.04}s`}} key={`hourly-${idx}`} className={openedCard === idx ? `${styles.card} ${styles.card_opened}` : styles.card}>
                <div onClick={() => cardOnClick(idx)} className={styles.card__slim}>
                  <div className={styles.card__top}>
                    <p className={styles.card__time}><span>{time.getUTCHours()} </span>00</p>
                    {idx == 24 ? <small>{getDayOfWeek(time.getDay())}</small> : ''}
                  </div>

                  <div className={styles.card__middle}>
                    <div style={{bottom: `${(60/(highestTemp - lowestTemp))*Math.min(Math.max(Math.round(hourlyData.temperature2m[idx]) - lowestTemp, 0), 50)}%`}} className={styles.card__img_and_temp}>
                    <img 
                      className={styles.card__img} 
                      src={decodeWeatherCode(hourlyData.weatherCode[idx], time.getUTCHours() > 5 && time.getUTCHours() < 22).image} 
                      alt={decodeWeatherCode(hourlyData.weatherCode[idx], time.getUTCHours() > 5 && time.getUTCHours() < 22).description}
                      title={decodeWeatherCode(hourlyData.weatherCode[idx], time.getUTCHours() > 5 && time.getUTCHours() < 22).description}
                    />
                      <p>{Math.round(hourlyData.temperature2m[idx])}°C</p>
                    </div>
                  </div>

                  <div className={styles.card__bottom}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill={hourlyData.precipitationProbability[idx] == 0 ? 'grey' : '#3789c6'} d="M9 7.75C9 5 6.42 3.24 6.31 3.17a1 1 0 0 0-1.12 0C5.08 3.25 2.5 5 2.5 7.75a3.25 3.25 0 0 0 6.5 0M5.75 9A1.25 1.25 0 0 1 4.5 7.75A3.66 3.66 0 0 1 5.75 5.3A3.61 3.61 0 0 1 7 7.75A1.25 1.25 0 0 1 5.75 9m6.06 1.17a1 1 0 0 0-1.12 0c-.17.12-4.19 2.9-4.19 7.08a4.75 4.75 0 0 0 9.5 0c0-4.25-4-6.97-4.19-7.08M11.25 20a2.75 2.75 0 0 1-2.75-2.75c0-2.31 1.81-4.17 2.76-5c.94.79 2.74 2.63 2.74 5A2.75 2.75 0 0 1 11.25 20m6.81-17.83a1 1 0 0 0-1.12 0c-.14.1-3.44 2.38-3.44 5.83a4 4 0 0 0 8 0c0-3.49-3.3-5.74-3.44-5.83M17.5 10a2 2 0 0 1-2-2a5.44 5.44 0 0 1 2-3.72a5.39 5.39 0 0 1 2 3.72a2 2 0 0 1-2 2"/></svg>
                    <p className={styles.card__rain_text} style={{color: hourlyData.precipitationProbability[idx] == 0 ? '' : '#3789c6'}}>
                      {hourlyData.precipitationProbability[idx]}%
                    </p>
                    <div title={`Wind direction (${Math.round(hourlyData.windDirection10m[idx])}°) & speed (mph)`} className={styles.card__wind_container}>
                      <svg style={{transform: `rotate(${Math.round(hourlyData.windDirection10m[idx]) + 180}deg)`}} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="#080808" d="M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z"/></svg>
                      <p className={styles.card__wind_text}>{Math.round(hourlyData.windSpeed10m[idx])}</p>
                    </div>
                  </div>

                </div>
                <div className={styles.card__details}>
                  <p className={styles.card__details_title}>{decodeWeatherCode(hourlyData.weatherCode[idx], time.getUTCHours() > 5 && time.getUTCHours() < 22).description}</p>
                  <div className={styles.card__details_hr}></div>
                  <dl className={styles.card__details_dl}>
                    <dt className={styles.card__details_dt}>Humidity</dt>
                    <dd className={styles.card__details_dd}>{hourlyData.relativeHumidity2m[idx]}%</dd>
                    <dt className={styles.card__details_dt}>Pressure</dt>
                    <dd className={styles.card__details_dd}>{Math.round(hourlyData.surfacePressure[idx])} mb</dd>
                    <dt className={styles.card__details_dt}>Visibility</dt>
                    <dd className={styles.card__details_dd}>{calcVisibility(hourlyData.visibility[idx])}</dd>
                  </dl>
                  <div className={styles.card__details_hr}></div>
                  <p className={styles.card__details_text}>Temperature feels like: <span>{Math.round(hourlyData.apparentTemperature[idx])}°C</span></p>
                  <div className={styles.card__details_hr}></div>
                  <p className={styles.card__details_text}>{calcPrecipitationChance(hourlyData.precipitationProbability[idx])}</p>
                  <div className={styles.card__details_hr}></div>
                  <p className={styles.card__details_text}>{calcWindDescription(hourlyData.windDirection10m[idx], hourlyData.windSpeed10m[idx])}</p>
                </div>
              </div>
            )
          }) : null
        }
        </div>
        <button onClick={() => hourlyCardContainer.current?.scroll({left: hourlyCardContainer.current.scrollLeft + 600})} className={styles.card_right}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/></svg>
        </button>
      </div>
  )
}
