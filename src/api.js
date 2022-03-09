import axios from "axios"

// export function fetchApi(extension) {
//     return fetch(`https://nc-news-se.herokuapp.com/api/${extension}`)
//         .then(response => {
//             return response.json()})


// }

export function fetchApi(extension) {
    return axios.get(`https://nc-news-se.herokuapp.com/api/${extension}`, {
            params: {
            },
          })
        .then(response => {
            return response.data
        })

}

export function sendApi(extension, info) {
  return axios({
    method: 'patch',
    url: `https://nc-news-se.herokuapp.com/api/${extension}`,
    data: info
  })
}