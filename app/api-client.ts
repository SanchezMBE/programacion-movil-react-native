import { ArtistResource } from "@/types/artist"

const API_KEY = "0d6a3580b51d85ed3c7c9bf87ae1b18d"
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${API_KEY}&format=json`

function getMusicData() {
  return fetch(URL, {
    method: 'GET',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => data.topartists.artist)
  .then(artists => artists.map((artist: ArtistResource) => {
    return {
      id: artist.mbid,
      name: artist.name,
      image: artist.image[0]['#text']
    }
  }))
}

export { getMusicData }