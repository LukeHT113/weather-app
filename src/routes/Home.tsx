import Footer from '../components/Footer'
import bgImage from "../assets/imgs/clouds.avif"
import HomeSearch from '../features/components/HomeSearch'
import styles from '../assets/Home.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <img className={styles.background_img} src={bgImage} alt="" />
      <HomeSearch />
      <Footer />
    </div>
  )
}
