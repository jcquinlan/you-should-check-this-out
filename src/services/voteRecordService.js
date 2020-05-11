import {getCurrentUrl} from './recommendationService';

const VoteRecordKey = 'ysco-vote-record-key';
// Represents
let VoteRecord;

export const setStorageItem = (key, value, callback) => {
    window.chrome.storage.local.set({[key]: value}, () => {
        if (callback) return callback(({[key]: value}));
        return;
    });
};

export const getStorageItem = (key, callback) => {
    window.chrome.storage.local.get(key, callback);
};

export async function getVoteRecord () {
    return new Promise((resolve, reject) => {
        if (VoteRecord !== undefined) {
            resolve(VoteRecord);
        } else {
            // eslint-disable-next-line no-undef
            chrome.storage.local.get(VoteRecordKey, (voteRecord) => {
                VoteRecord = voteRecord[VoteRecordKey];
                resolve(VoteRecord);
            });
        }
    });
};

export async function getCurrentUrlVoteRecord () {
    const currentUrl = await getCurrentUrl();
    const voteRecord = await getVoteRecord();

    return voteRecord[currentUrl];
}

export const saveVoteRecord = (record, callback) => {
    setStorageItem(VoteRecordKey, record, callback);
}

export async function updateVoteRecord (recommendationId, voteMagnitude, callback) {
    const currentUrl = await getCurrentUrl();
    let record = await getVoteRecord();

    if (!record[currentUrl]) {
        record[currentUrl] = {};
    }

    record[currentUrl][recommendationId] = voteMagnitude;

    saveVoteRecord(record, callback);
};