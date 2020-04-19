import scripts from '../actionTypes/scripts';

const setLoaded = (isLoaded = false) => ({
  type: scripts.SET_LOADED,
  payload: {
    data: isLoaded,
  },
});

export default {
  setLoaded,
};
