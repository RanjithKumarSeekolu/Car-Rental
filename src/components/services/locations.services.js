import apiUrl from "../../utils/Constants";
export const getLocations = async () => {
  return await fetch(`${apiUrl}locations/getLocations`, {
    method: "GET",
    // body: JSON.stringify(payload),
  }).then((resp) => resp.json());
};
