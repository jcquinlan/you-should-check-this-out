import {getCurrentUrl} from './recommendationService';
import Env from '../env';

const VoteRecordKey = 'ysco-vote-record-key';
let VoteRecord;

export const setStorageItemLocal = (key, value, callback) => {
    localStorage.setItem(key, JSON.stringify(value));
    if (callback) callback(value);
}

const setStorageItemExt = (key, value, callback) => {
    window.chrome.storage.local.set({[key]: value}, () => {
        if (callback) return callback(({[key]: value}));
        return;
    });;
}

export const setStorageItem = Env.isLocal ? setStorageItemLocal : setStorageItemExt;

export const getStorageItemLocal = (key, callback) => {
    const voteRecordString = localStorage.getItem(key);
    const voteRecord = JSON.parse(voteRecordString || '{}');

    callback({[VoteRecordKey]: voteRecord});
}

const getStorageItemExt = (key, callback) => {
    window.chrome.storage.local.get(key, callback);
}

export const getStorageItem = Env.isLocal ? getStorageItemLocal : getStorageItemExt;

export async function getVoteRecord () {
    return new Promise((resolve, reject) => {
        if (VoteRecord !== undefined) {
            resolve(VoteRecord);
        } else {
            // eslint-disable-next-line no-undef
            getStorageItem(VoteRecordKey, (voteRecord) => {
                VoteRecord = voteRecord ? voteRecord[VoteRecordKey] : {};
                resolve(VoteRecord);
            });
        }
    });
};

export async function getCurrentUrlVoteRecord () {
    const currentUrl = await getCurrentUrl();
    const voteRecord = await getVoteRecord();

    return voteRecord[currentUrl] ? voteRecord[currentUrl] : {};
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