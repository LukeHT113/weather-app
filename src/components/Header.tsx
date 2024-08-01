import { Link, useNavigate } from "react-router-dom"
import styles from "../assets/Header.module.css"
import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { FavouriteContext } from "../context/FavouriteContextConst";

type location = {
  "id": number,
  "name": string,
  "latitude": number,
  "longitude": number,
  "admin1": string
}

export default function Header() {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResponse, setSearchResponse] = useState<[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const favouriteContext = useContext(FavouriteContext);

  useEffect(() => {
    if (debouncedSearchQuery === '' || debouncedSearchQuery.length < 2) {
      setSearchResponse([]);
    } else {
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${debouncedSearchQuery}&count=12&language=en&format=json`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSearchResponse(data.results);
      })
    }
    return () => {
    }
  }, [debouncedSearchQuery])
    
  const errorHandler = (errorObj: GeolocationPositionError) => { 
  alert(errorObj.code + ": " + errorObj.message);
  }; 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) {
      setSearchResponse([]);
    }
    setSearchQuery(e.target.value);
  }

  const getLocation = () => {
    setSearchQuery('');
    setSearchResponse([]);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, errorHandler, {enableHighAccuracy: true, maximumAge: 10000});
    }
  }

  const showPosition = (postion: GeolocationPosition) => {
    navigate(`/forecast?name=Current%20Position&latitude=${postion.coords.latitude}&longitude=${postion.coords.longitude}`);
  }

  const checkInRecents = (recents: location[], item: location): boolean => {
    for (let i = 0; i < recents.length; i++) {
      const recentLocation = recents[i];
      if (recentLocation.id == item.id) {
        return true;
      }
    }
    return false;
  }

  const locationOnClick = (item: location): void => {
    setSearchQuery('');
    setSearchResponse([]);
    const local = localStorage.getItem('recents');
    if (local) {
      const localParsed = JSON.parse(local);
      if (checkInRecents([...localParsed], item)) {
        return
      }
      const newArr = [...localParsed, item];
      if (newArr.length > 5) {
        newArr.shift();
      }
      localStorage.setItem('recents', JSON.stringify(newArr));
    } else {
      localStorage.setItem('recents', JSON.stringify([item]));
    }
  }

  const addToFavourites = (e: MouseEvent<HTMLButtonElement>, location: location): void => {
    e.stopPropagation();
    e.preventDefault();
    favouriteContext?.setFavourites(prev => [...prev, location]);    
  }

  const removeFromFavourites = (e: MouseEvent<HTMLButtonElement>, location: location): void => {
    e.stopPropagation();
    e.preventDefault();
    favouriteContext?.setFavourites(prev => prev.filter((place) => place.id !== location.id));
  }

  return (
    <header style={{height: `${searchQuery != '' ? "350px" : ''}`}} className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} to={`/`}>
          <svg className={styles.logo_img} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10"/><path fillRule="evenodd" d="M12 1a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1M3.293 3.293a1 1 0 0 1 1.414 0l1.5 1.5a1 1 0 0 1-1.414 1.414l-1.5-1.5a1 1 0 0 1 0-1.414m17.414 0a1 1 0 0 1 0 1.414l-1.5 1.5a1 1 0 1 1-1.414-1.414l1.5-1.5a1 1 0 0 1 1.414 0M1 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1m19 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1M6.207 17.793a1 1 0 0 1 0 1.414l-1.5 1.5a1 1 0 0 1-1.414-1.414l1.5-1.5a1 1 0 0 1 1.414 0m11.586 0a1 1 0 0 1 1.414 0l1.5 1.5a1 1 0 0 1-1.414 1.414l-1.5-1.5a1 1 0 0 1 0-1.414M12 20a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1" clipRule="evenodd"/></svg>
        </Link>
        <div className={styles.form}>
          <input placeholder="Search a location..." onChange={(e) => handleInputChange(e)} value={searchQuery} className={styles.search} type="text" />
          <button title="Use current location" onClick={getLocation} className={styles.gps}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7"/></svg>
          </button>
        </div>
      </div>
      {
      searchResponse ?
      <div className={styles.results__container}>
      {searchResponse.map((item: location, idx: number) => {
        let favourited: boolean = false;
        for (let i = 0; i < favouriteContext!.favourites.length; i++) {
          const fav = favouriteContext!.favourites[i];
          if (fav.id == item.id) {
            favourited = true;
            break;
          }
        }

        return (
        <Link style={{animationDelay: `${idx * 0.04}s`}} className={styles.result} onClick={() => locationOnClick(item)} key={item.id} to={`/forecast?name=${item.name}&latitude=${item.latitude}&longitude=${item.longitude}`}>

          <h3 className={styles.result_title}>{item.name}</h3>
          <h4 className={styles.result_subtitle}>{item.admin1} <span>({item.latitude.toFixed(2)}°N {item.longitude.toFixed(2)}°E)</span></h4>
          {!favourited ?
          <button title="Add to favourites" className={styles.result_fav} onClick={(e) => addToFavourites(e, item)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/></svg>
          </button>
          :
          <button title="Remove from favourites" className={`${styles.result_fav} ${styles.result_fav_filled}`} onClick={(e) => removeFromFavourites(e, item)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/></svg>
          </button>}
        </Link>
        )})}
      </div>
      : searchQuery !== '' ? <h2 className={styles.result_error}>No results found</h2> : null}
    </header>
  )
}
