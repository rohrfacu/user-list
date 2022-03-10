import request from "axios";

const url = "https://randomuser.me/api/";

// We use axios to fire a get request to the URL above, obtaining
// the first ten results
const getUserList = (page) => {
  const params = {
    results: 10,
    seed: "southteams"
  };
  if (page) {
    params.page = page;
  }
  return request.get(url, { params }).then((response) => {
    return response?.data?.results;
  });
};

export default {
  getUserList
};
