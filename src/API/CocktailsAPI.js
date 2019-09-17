import AXIOS from '../config/AxiosConfig';

export default {
  list: () => {
    return AXIOS.get(`/filter.php?g=Cocktail_glass`);
  },
  get: cocktailId => {
    return AXIOS.get(`/lookup.php?i=${cocktailId}`);
  },
};
