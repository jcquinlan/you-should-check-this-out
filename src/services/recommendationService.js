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

const getCurrentUrl = () => window.location.href;

export async function getRecommendations () {
    return await db().collection('recommendations').where('for', '==', getCurrentUrl()).get();
};

export async function createRecommendation (metadata) {
    const id = uuid();
    const currentUrl = getCurrentUrl();
    return await db().collection('recommendations').doc(id).set({for: currentUrl, ...metadata, votes: 0});
}