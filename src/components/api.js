const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
      authorization: 'ac286af0-59cf-4274-a00d-fa9fb797f2c0',
      'Content-Type': 'application/json'
    },
    headersShort: {
        authorization: 'ac286af0-59cf-4274-a00d-fa9fb797f2c0'
      }
}

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    } 
    return res.json(); 
}

const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headersShort
})
    .then(getResponseData);
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headersShort
    })
        .then((res) => {
            return getResponseData(res);
        })
}

const addNewCard = (newCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
        }),
        headers: config.headers     
    }) 
    .then((res) => {
        return getResponseData(res);
    })
}
 
const setLike = (item) => {
    return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
        method: 'PUT',
                headers: config.headers 
    })
    .then((res) => {
        return getResponseData(res);
    })
}

const setDislike = (item) => {
    return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
        method: 'DELETE',
                headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
}

const deleteCardFromServer = (itemId) => {
    return fetch(`${config.baseUrl}/cards/${itemId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
}

const changeProfileData = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: data.name,
          about: data.about
        }),
        headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
}

const changeAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        body: JSON.stringify({
            avatar: url
        }),
        headers: config.headers        
    })
    .then((res) => {
        return getResponseData(res);
    })
}

export {getUserData, getInitialCards, addNewCard, deleteCardFromServer, changeProfileData, changeAvatar, setLike, setDislike};
