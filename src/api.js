export function fetchArticles() {
    return fetch('https://nc-news-se.herokuapp.com/api/articles/')
        .then(response => {
            return response.json()})

}