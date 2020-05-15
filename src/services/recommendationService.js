import * as firebase from 'firebase';
import {v4 as uuid} from 'uuid';

let dbInstance;

const db = () => {
    if (dbInstance) {
        return dbInstance;
    }

    dbInstance = firebase.firestore();
    return dbInstance;
};

export async function getCurrentUrl () {
    if (window.chrome && window.chrome.tabs) {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-undef
            chrome.tabs.getSelected(null, (tab) => {
                resolve(tab.url);
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            resolve(window.location.href);
        });
    }

};

export async function getRecommendations () {
    const currentUrl = await getCurrentUrl();
    return await db().collection('recommendations').where('for', '==', currentUrl).get();
};

export async function createRecommendation (metadata) {
    const id = uuid();
    const currentUrl = await getCurrentUrl();
    return await db().collection('recommendations').doc(id).set({for: currentUrl, ...metadata, votes: 0});
}

export async function voteOnRecommendation (id, newVote) {
    return await db().collection('recommendations').doc(id).update({votes: newVote});
}