type State = {
    user: {
        id: number;
        username?: string;
        status?: 'admin' | 'user';
        rating?: number;
    }
}

const INITIAL_STATE = {
    user: {

    }
};

type HttpRequestParams = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
    headers?: { [key: string]: string };
    url: string;
    body?: string;
    type?: 'json' | 'text';
}

function httpRequest({
    method = 'GET',
    headers,
    url,
    body,
    type = 'json',
}: HttpRequestParams): Promise<string> {
    return new Promise(function(resolve, reject) {
        const request = new XMLHttpRequest();

        request.open(method, url);
        request.responseType = type;

        if (headers) {
            Object.keys(headers).forEach(headerName => {
                request.setRequestHeader(headerName, headers[headerName]);
            });
        }

        request.send(body);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(request.response || 'Неизвестная ошибка');
            }
        });

        request.addEventListener('error', () => {
            reject('Сеть недоступна');
        });
    });
}

function getUsername(state: State, cb?: (state: State) => void) {
    setTimeout(() => {
        const username = btoa(state.user.id.toString());

        cb?.({
            ...state,
            user: {
                ...state.user,
                username,
            },
        });
    }, Math.random() * 1000);
}

function getStatus(state: State, cb?: (state: State) => void) {
    setTimeout(() => {
        const status = state.user.id % 5 === 0 ? 'admin' : 'user';

        cb?.({
            ...state,
            user: {
                ...state.user,
                status,
            },
        });
    }, Math.random() * 1000);
}

function getRating(state: State, cb?: (state: State) => void) {
    setTimeout(() => {
        const rating = state.user.id % 5 + (state.user.id % 10) / 10;

        cb?.({
            ...state,
            user: {
                ...state.user,
                rating,
            },
        });
    }, Math.random() * 1000);
}

getUsername({
    user: {
        id: Math.ceil(Math.random() * 10000000),
    },
}, (state: State) => {
    getStatus(state, (state: State) => {
        getRating(state, (state) => console.log(state));
    });
});

new Promise(function(resolve, reject) {
    setTimeout(() => {
        console.log('hello');

        resolve(33);
    }, 5000);
}).then(result => console.log(result));

function getUsernamePromisified(state: State): Promise<State> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const username = btoa(state.user.id.toString());

            resolve({
                ...state,
                user: {
                    ...state.user,
                    username,
                },
            });
        }, Math.random() * 1000);
    });
}

function getStatusPromisified(state: State): Promise<State> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const status = state.user.id % 5 === 0 ? 'admin' : 'user';

            resolve({
                ...state,
                user: {
                    ...state.user,
                    status,
                },
            });
        }, Math.random() * 1000);
    });
}

function getRatingPromisified(state: State): Promise<State> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rating = state.user.id % 5 + (state.user.id % 10) / 10;

            if (rating < 2) reject('Пользователь забанен');

            resolve({
                ...state,
                user: {
                    ...state.user,
                    rating,
                },
            });
        }, Math.random() * 1000);
    });
}

getUsernamePromisified({
    user: {
        id: Math.ceil(Math.random() * 10000000),
    },
})
    .then(state => getRatingPromisified(state))
    .then(state => getStatusPromisified(state))
    .then(result => console.log(result))
    .catch((error) => console.log('Ошибка ' + error));


httpRequest({
    url: './tsconfig.json'
})
    .then(data => console.log(data));

fetch('./tsconfig.json')
    .then(response => response.json())
    .then(data => console.log(data));
