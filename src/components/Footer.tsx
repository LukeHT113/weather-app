import styles from "../assets/Footer.module.css"
import logo from "../assets/imgs/logo.png"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a target="_blank" href="https://lukehtalling.com/"><img className={styles.logo} src={logo} alt="" /></a>
      <small className={styles.copyright}>©2024. Created by <a target="_blank" href="https://lukehtalling.com/">LHT</a>.</small>
      <small className={styles.small}>Powered by <a target="_blank" href="https://open-meteo.com/">Open-Meteo</a>.</small>
    </footer>
  )
}
