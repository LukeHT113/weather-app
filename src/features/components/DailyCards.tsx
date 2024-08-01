import { useEffect, useRef } from "react"
import styles from "../styles/DailyCards.module.css"
import decodeWeatherCode from "../../utils/weatherCode";
import getDayOfWeek from "../../utils/dayOfWeek";

interface Props {
  dailyData: {
    time: Date[],
    weatherCode: Float32Array,
    temperature2mMax: Float32Array,
    temperature2mMin: Float32Array,
    apparentTemperatureMax: Float32Array,
    apparentTemperatureMin: Float32Array,
    sunrise: Float32Array,
    sunset: Float32Array
  },
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>,
  selectedDay: number
}

export default function DailyCards({dailyData, setSelectedDay, selectedDay}: Props) {

  const dailyCardContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedDay(0);
    dailyCardContainer.current?.scroll({left: 0})
  
  }, [dailyData, setSelectedDay])
  

  return (
    <div className={styles.card_wrapper}>
      <button onClick={() => dailyCardContainer.current?.scroll({left: dailyCardContainer.current.scrollLeft - 322})} className={styles.card_left}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/></svg>
      </button>
      <div ref={dailyCardContainer} className={styles.card_container}>
      <div className={styles.card_container__inner}>
      {
        dailyData.time.map((day, idx) => {
          return (
            <div key={`daily-${idx}`} onClick={() => {
              dailyCardContainer.current?.scroll({left: idx*160 - 25})
              setSelectedDay(idx);
            }} className={idx === selectedDay ? `${styles.card} ${styles.card_selected}` : styles.card}>
              <h3 className={styles.card__title}>{day.getDate() === new Date().getDate() ? "Today" : `${getDayOfWeek(day.getDay())}, ${day.getDate()}`}</h3>
              <div className={styles.card__details}>
                <div className={styles.card__short}>
                  <img 
                  className={styles.card__img} 
                  src={decodeWeatherCode(dailyData.weatherCode[idx], true).image} 
                  alt={decodeWeatherCode(dailyData.weatherCode[idx], true).description}
                  title={decodeWeatherCode(dailyData.weatherCode[idx], true).description}/>
                  <div className={styles.card__column}>
                    <p className={styles.card__maxTemp}>{Math.round(dailyData.temperature2mMax[idx])}°C</p>
                    <p className={styles.card__minTemp}>{Math.round(dailyData.temperature2mMin[idx])}°C</p>
                  </div>
                </div>
                <div className={styles.card__description}>
                  <p className={styles.card__description_text}>{decodeWeatherCode(dailyData.weatherCode[idx], true).description}</p>
                </div>
              </div>
            </div>
          )
        })
      }
      </div>
      </div>
      <button onClick={() => dailyCardContainer.current?.scroll({left: dailyCardContainer.current.scrollLeft + 322})} className={styles.card_right}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/></svg>
      </button>
    </div>
  )
}
