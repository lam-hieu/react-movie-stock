// https://www.themoviedb.org/
const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'd34cdfa980fbe03ccddf20a383c69e58',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;