export const FETCH_COORDS = 'FETCH_COORDS';

export function fetchCoords(coordinates) {
  const { latitude, longitude } = coordinates;

  return {
    type: FETCH_COORDS,
    payload: {
      latitude,
      longitude
    }
  };
}