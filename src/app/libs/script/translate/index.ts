import { translateActor } from "./translateActor"
import { translateCountry } from "./translateCountry"
import { translateImdb } from "./translateImdbItem"
import { translateGenre } from "./translateGenre"

export const main = async () => {
    await translateActor()
    await translateCountry()
    await translateGenre()
    await translateImdb()
}


// main()