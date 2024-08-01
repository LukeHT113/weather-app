import Main from "../components/Main";
import Header from "../components/Header";
import ForecastResult from "../features/components/ForecastResult";
import Footer from "../components/Footer";

export default function Forecast() {


  return (
    <>
      <Header />
      <Main>
        <ForecastResult />
      </Main>
      <Footer />
    </>
  )
}
