import * as firebase from 'firebase';

let dbInstance;

const db = () => {
    if (dbInstance) {
        return dbInstance;
    }

    dbInstance = firebase.firestore();
    return dbInstance;
}

export const getRecommendations = () => {
    return db().collection('recommendations').get();
};

export const createRecommendation = (link) => {

}