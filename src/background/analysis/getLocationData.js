/*
getLocationData.js
================================================================================
- getLocationData.js takes users lat and long uses Google Map API to find other
location info
*/

// function to get the client's location data
const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        return {
          long: pos.coords.longitude,
          lat: pos.coords.latitude,
        };
    };

// from client's location, makes api call to google maps to get other location
// info for later static search analysis
export async function getLocationData() {
  try {
    const coords = await getCoords();
    var lat = coords["lat"]
    var lng = coords["long"]
    return [lat, lng]
  }
  catch (e) {
    // location permission denied so lat, lng just = 0
    return [0,0]
  }
}