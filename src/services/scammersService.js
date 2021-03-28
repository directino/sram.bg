const url = 'https://sram-bg-default-rtdb.europe-west1.firebasedatabase.app/scammers.json';

export const getAll = (category = '') => {
    let scammersUrl = url + ((category && category !== 'all') ? `?category=${category}` : '');

    return fetch(scammersUrl)
        .then(res => res.json())
        .catch(error => console.log(error));
};

export const getOne = (scammerId) => {
    return fetch(`${url}/${scammerId}`)
        .then(res => res.json())
        .catch(error => console.log(error));
};

export const create = (phone, firstName, secondName, city, description, reporter, id) => {
    let scammer = {
        phone,
        firstName,
        secondName,
        city,
        description,
        reporter,
        id,
    };
    
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scammer)
    });
};

export const update = (scammerId, scammer) => {
    return fetch(`${url}/${scammerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scammer)
    });
};

export const scammer = (scammerId, likes) => {
    return fetch(`${url}/${scammerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({likes})
    })
        .then(res => res.json());
}