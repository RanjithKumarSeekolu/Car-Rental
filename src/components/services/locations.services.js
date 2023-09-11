const baseUrl = "http://localhost:4000/";
export const getLocations = async () => {
  return await fetch(`${baseUrl}locations/getLocations`, {
    method: "GET",
    // body: JSON.stringify(payload),
  }).then((resp) => resp.json());
};
