import { useEffect, useState } from "react";
import { FavouriteContext } from "./FavouriteContextConst";

type location = {
  "id": number,
  "name": string,
  "latitude": number,
  "longitude": number,
  "admin1": string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FavouriteProvider(props: any) {
  const [favourites, setFavourites] = useState<location[]>(JSON.parse(localStorage.getItem('favourites')!) || []);

  useEffect(() => {
    const localData = localStorage.getItem('favourites');
    if (localData) {
      setFavourites(JSON.parse(localData));
    }
  }, []) 

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites])
  

  return (
    <FavouriteContext.Provider value={{favourites, setFavourites}}>
      {props.children}
    </FavouriteContext.Provider>
  )
}
