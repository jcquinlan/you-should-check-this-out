import Env from '../env';

const parser = new DOMParser();
const METADATA_URL = Env.isLocal ?
    'http://localhost:5001/you-should-check-this-out/us-central1/metadata' :
    'https://us-central1-you-should-check-this-out.cloudfunctions.net/metadata';

export function isValidUrl (url) {
    const regexString = '^(ftp|http|https)://[^ "]+$';
    const regex = new RegExp(regexString);

    return regex.test(url);
}

export const parseHtml = (string) => {
    return parser.parseFromString(string, 'text/html');
}

export const fetchMetaData = (link) => {
    const options = {
        method: 'POST',
        body: JSON.stringify({link}),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(METADATA_URL, options)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
        })
}
