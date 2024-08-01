import { createContext } from "react";

type location = {
  "id": number,
  "name": string,
  "latitude": number,
  "longitude": number,
  "admin1": string
}

interface FavouriteContextValue {
  favourites: location[],
  setFavourites: React.Dispatch<React.SetStateAction<location[]>>;
}

export const FavouriteContext = createContext<FavouriteContextValue | null>(null);