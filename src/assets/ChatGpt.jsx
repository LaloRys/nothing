export const chatGpt = async () => {
  const url =
    "https://moviesdatabase.p.rapidapi.com/titles/seasons/%7BseriesId%7D";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "76dac1668bmshd295477b7f3c5c0p1e8addjsn47aa56d2275f",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
