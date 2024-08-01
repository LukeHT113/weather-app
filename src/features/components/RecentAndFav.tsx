import { MouseEvent, useContext, useEffect, useState } from "react"
import styles from "../styles/RecentAndFav.module.css"
import { Link } from "react-router-dom"
import { FavouriteContext } from "../../context/FavouriteContextConst"

type location = {
  "id": number,
  "name": string,
  "latitude": number,
  "longitude": number,
  "admin1": string
}

interface Props {
  shown: boolean
}

export default function RecentAndFav({ shown }: Props) {

  const [recent, setRecent] = useState([]);
  const [listShown, setListShown] = useState<'recent' | 'fav'>('recent');
  const favouriteContext = useContext(FavouriteContext);

  useEffect(() => {
    const localRecent = localStorage.getItem('recents');
    if (localRecent) {
      setRecent(JSON.parse(localRecent));
    }
  }, [])

  const determineIfFavourited = (location: location) => {
    for (let i = 0; i < favouriteContext!.favourites.length; i++) {
      const place = favouriteContext!.favourites[i];
      if (place.id == location.id) {
        return true
      }
    }
    return false;
  }
  
  const addToFavourites = (e: MouseEvent, location: location): void => {
    e.preventDefault();
    favouriteContext?.setFavourites(prev => [...prev, location]);    
  }

  const removeFromFavourites = (e: MouseEvent, location: location): void => {
    e.preventDefault();
    favouriteContext?.setFavourites(prev => prev.filter((place) => place.id !== location.id));
  }

  return (
    <>
      {
        shown ?
        <div className={styles.container}>
          <div>
            <button onClick={() => setListShown('recent')} className={`${styles.button} ${listShown == 'recent' ? styles.button_selected: ''}`}>Recent</button>
            <button onClick={() => setListShown('fav')} className={`${styles.button} ${listShown == 'fav' ? styles.button_selected: ''}`}>Favourites</button>
          </div>
          {
          listShown == 'recent' ?
          <ul className={styles.list}>
            {
              recent.length > 0 ?
              recent.map((recentLocation: location) => {
                return (
                  <Link key={recentLocation.id} className={styles.li} to={`/forecast?name=${recentLocation.name}&latitude=${recentLocation.latitude}&longitude=${recentLocation.longitude}`}>
                    <h3 className={styles.li_name}>{recentLocation.name}</h3>
                    <h4 className={styles.li_details}>{recentLocation.admin1} <span>({recentLocation.latitude.toFixed(2)}°N {recentLocation.longitude.toFixed(2)}°E)</span></h4>
                    {!determineIfFavourited(recentLocation) ?
                    <button title="Add to favourites" className={styles.fav} onClick={(e) => addToFavourites(e, recentLocation)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/></svg>
                    </button>
                    :
                    <button title="Remove from favourites" className={`${styles.fav} ${styles.fav_filled}`} onClick={(e) => removeFromFavourites(e, recentLocation)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/></svg>
                    </button>}
                  </Link>
                )
              })
              :
              <div className={styles.no_results}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path fill="#00000090" d="M20.59 22L15 16.41V7h2v8.58l5 5.01z"/><path fill="currentColor" d="M16 2A13.94 13.94 0 0 0 6 6.23V2H4v8h8V8H7.08A12 12 0 1 1 4 16H2A14 14 0 1 0 16 2"/></svg>
                <small>No recent searches found</small>
              </div>
            }

          </ul>
          :
          <ul className={styles.list}>
            {
              favouriteContext!.favourites.length > 0 ?
              favouriteContext!.favourites.map((favLocation: location) => {
                return (
                  <Link key={favLocation.id} className={styles.li} to={`/forecast?name=${favLocation.name}&latitude=${favLocation.latitude}&longitude=${favLocation.longitude}`}>
                    <h3 className={styles.li_name}>{favLocation.name}</h3>
                    <h4 className={styles.li_details}>{favLocation.admin1} <span>({favLocation.latitude.toFixed(2)}°N {favLocation.longitude.toFixed(2)}°E)</span></h4>
                    <button title="Remove from favourites" className={`${styles.fav} ${styles.fav_filled}`} onClick={(e) => removeFromFavourites(e, favLocation)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/></svg>
                    </button>
                  </Link>
                )
              })
              :
              <div className={styles.no_results}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path stroke="#00000090" fill="none" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"/></svg>
                <small>No favourites yet</small>
              </div>
            }
          </ul>
          }
        </div>
        : null
      }
    </>
  )
}
