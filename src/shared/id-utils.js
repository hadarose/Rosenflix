// Assist function that receives an array and returns last id
export function getLastId(arr) {
    let lastId = 0;

    if (arr[arr.length - 1]) {
        lastId = arr[arr.length - 1].id;
    }
    return lastId;
}