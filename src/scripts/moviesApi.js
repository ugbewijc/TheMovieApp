const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&";

const loadMovies = async(page=1) => {
  let url=`${API_URL}api_key=${process.env.API_KEY}&page=${page}`;
  try {
    let res=await fetch(url);
    return await res.json();
  } catch (e) {}
};

export {loadMovies};
