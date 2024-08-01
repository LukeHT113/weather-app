import Footer from "../components/Footer";
import Header from "../components/Header";
import { weatherCodes } from "../utils/weatherCode";
import styles from "../assets/Guide.module.css"

export default function Guide() {

  const weatherCodesArray = Object.keys(weatherCodes).map((key) => [key, weatherCodes[key]]);

  return (
    <>
      <Header />
      <section className={styles.section}>
        <h1 className={styles.title}>Weather Guide</h1>
        <h2 className={styles.section__heading}>Weather Codes & Icons</h2>
        <p className={styles.section__paragraph}>These are the various interpretations of weather that could appear in the forecast.</p>
      </section>
      <div className={styles.weather_codes__container}>
        {
          weatherCodesArray.map((item) => {
            return (
              <div key={`weatherCode_${item[0]}`} className={styles.weather_code__container}>
                <img className={styles.weather_code__img} src={item[1]["day"].image} alt={item[1]["day"].description} />
                <h2 className={styles.weather_code__desc}>{item[1]["day"].description}</h2>
              </div>
            )
          })
        }
        </div>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Chance of precipitation</h2>
        <p className={styles.section__paragraph}>An 80% chance of precipitation would mean a 8 in 10 chance that precipitation will fall at some point during that period.</p>
        <p className={styles.section__paragraph}>Precipitation means falling water - rain, sleet, snow, hail or drizzle.</p>
        <p className={styles.section__paragraph}>We show the chance that at least 0.1mm of precipitation will fall within 1 hour, on the hourly forecast. This precipitation may fall across the while time or fall in a short sharp burst. The weather description will distinguish between light and heavy precipitation.</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Temperature</h2>
        <p className={styles.section__paragraph}>The temperature shows the air temperature at 2 meters at that time, it is shown in Celsius(°C).</p>
        <h2 className={styles.section__heading}>Apparent Temperature</h2>
        <p className={styles.section__paragraph}>The apparent temperature, or "feels like temperature", takes wind speed & humidity into account. This is a more accurate calculation of how the temperature will feel.</p>
        <h2 className={styles.section__heading}>Temperatures in daily tab</h2>
        <p className={styles.section__paragraph}>There are two temperatures present in each day's tab - one on top of the other. The upper most temperature, highlighted in a bolder font, is the maximum (highest) temperature that is forecast for that day and the lower temperature is the minimum (lowest) temperature that is forecast for that day. A "day" is the 24 hour period spanning from 5am to 4am.</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Wind direction and speed</h2>
        <p className={styles.section__paragraph}>The speed shows the average wind speed expected at that point in time. This is the mean (average) wind speed you may encounter, realistically the wind will ebb and flow above and below this value.</p>
        <p className={styles.section__paragraph}>The arrow shows the direction that the wind is blowing. The extra details on an hourly forecast will give a breakdown of direction and speed in easier to understand terms. For example, "Light breeze from the west south west".</p>
        <p className={styles.section__paragraph}>The wind speed is given in mph (miles per hour) and measured using the <a target="_blank" href="https://www.metoffice.gov.uk/weather/guides/coast-and-sea/beaufort-scale">Beaufort scale</a>.</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Visibility</h2>
        <p className={styles.section__paragraph}>Visibility measures the distances at which an object can be clearly seen. Below is the data we use to define breakpoints.</p>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Visibility description</th>
              <th>Visibility (metres)</th>
            </tr>
            <tr>
              <td>Very Poor</td>
              <td>Less than 1,000 metres</td>
            </tr>
            <tr>
              <td>Poor</td>
              <td>Between 1,001 and 4,000 metres</td>
            </tr>
            <tr>
              <td>Moderate</td>
              <td>Between 4,001 and 10,000 metres</td>
            </tr>
            <tr>
              <td>Good</td>
              <td>Between 10,001 and 20,000 metres</td>
            </tr>
            <tr>
              <td>Very Good</td>
              <td>Between 20,001 and 40,000 metres</td>
            </tr>
            <tr>
              <td>Good</td>
              <td>Greater than 40,000 metres</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>Humidity</h2>
        <p className={styles.section__paragraph}>Humidity is the amount of water vapour in the air. If there is a lot of water vapour, the humidity will be high. The higher the percentage of humidity, the wetter it will feel outside. The value for humidity is a percentage representing how saturated the air is with water - a value of 100% would indicate that the air is saturated and no more water could evaporate into it.</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.section__heading}>UV</h2>
        <p className={styles.section__paragraph}>We use the UV index developed by the World Health Organisation, called the 'Solar UV Index'. It shows the strength of the sun's ultraviolet radiation. The index is represented by the table below:</p>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>UV index</th>
              <th>UV summary</th>
              <th>Exposure</th>
            </tr>
            <tr>
              <td>
                <div style={{color: '#fff', backgroundColor: '#606060'}} className={styles.uv_container}>
                  0
                </div>
              </td>
              <td>
                <div style={{color: '#fff', backgroundColor: '#606060'}} className={styles.uv_container}>
                  -
                </div>
              </td>
              <td>No significant UV</td>
            </tr>
            <tr>
              <td>
                <div style={{color: '#000', backgroundColor: '#71b466'}} className={styles.uv_container}>
                  1
                </div>
                <div style={{color: '#000', backgroundColor: '#71b466'}} className={styles.uv_container}>
                  2
                </div>
              </td>
              <td>
                <div style={{color: '#000', backgroundColor: '#71b466'}} className={styles.uv_container}>
                  L
                </div>
              </td>
              <td>Low</td>
            </tr>
            <tr>
              <td>
                <div style={{color: '#000', backgroundColor: '#f8e71c'}} className={styles.uv_container}>
                  3
                </div>
                <div style={{color: '#000', backgroundColor: '#f8e71c'}} className={styles.uv_container}>
                  4
                </div>
                <div style={{color: '#000', backgroundColor: '#f8e71c'}} className={styles.uv_container}>
                  5
                </div>
              </td>
              <td>
                <div style={{color: '#000', backgroundColor: '#f8e71c'}} className={styles.uv_container}>
                  M
                </div>
              </td>
              <td>Moderate</td>
            </tr>
            <tr>
              <td>
                <div style={{color: '#000', backgroundColor: '#ff950c'}} className={styles.uv_container}>
                  6
                </div>
                <div style={{color: '#000', backgroundColor: '#ff950c'}} className={styles.uv_container}>
                  7
                </div>
              </td>
              <td>
                <div style={{color: '#000', backgroundColor: '#ff950c'}} className={styles.uv_container}>
                  H
                </div>
              </td>
              <td>High</td>
            </tr>
            <tr>
              <td>
              <div style={{color: '#fff', backgroundColor: '#d72921'}} className={styles.uv_container}>
                  8
                </div>
                <div style={{color: '#fff', backgroundColor: '#d72921'}} className={styles.uv_container}>
                  9
                </div>
                <div style={{color: '#fff', backgroundColor: '#d72921'}} className={styles.uv_container}>
                  10
                </div>
              </td>
              <td>
                <div style={{color: '#fff', backgroundColor: '#d72921'}} className={styles.uv_container}>
                  VH
                </div>
              </td>
              <td>Very High</td>
            </tr>
            <tr>
              <td>
                <div style={{color: '#fff', backgroundColor: '#6600e0'}} className={styles.uv_container}>
                  11
                </div>
              </td>
              <td>
                <div style={{color: '#fff', backgroundColor: '#6600e0'}} className={styles.uv_container}>
                  Ex
                </div>
              </td>
              <td>Extreme</td>
            </tr>
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  )
}
