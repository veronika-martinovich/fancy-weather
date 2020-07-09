import natureImage from "../../assets/nature.jpg";
import { client } from "../../constants/apiKeys";
import { getRandomNumber } from "../../utilities/getRandomNumber";

export function changeBgImage(url) {
  return { type: "CHANGE_BG_IMAGE", url };
}

export function changeBgFetchingFlag(flag) {
  return { type: "CHANGE_BG_FETCHING_FLAG", flag };
}

export function getBgImage(weather, season, timeOfDay) {
  return async function (dispatch) {
    try {
      dispatch(changeBgFetchingFlag(true));
      const query = `${weather}, ${season}, ${timeOfDay}`;
      const page = getRandomNumber(1, 1000);
      const photos = await client.photos.search({
        query,
        page: page,
        per_page: 1,
      });
      console.log("Bg image query:", query);
      dispatch(changeBgImage(photos.photos[0].src.original));
      dispatch(changeBgFetchingFlag(false));
    } catch (err) {
      console.log("No available images");
      dispatch(changeBgImage(natureImage));
      dispatch(changeBgFetchingFlag(false));
    }
  };
}
