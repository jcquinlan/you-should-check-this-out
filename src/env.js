const url = window.location.href;
// So hacky, im so sorry.
const isLocal = url.includes('localhost');

export default {
    isLocal,
    isExtension: !isLocal
}