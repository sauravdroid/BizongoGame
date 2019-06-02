import axios from 'axios';

const {requestUrl} = require('../../../localConfig');

export const fetchGameList = () => {
    const url = `${requestUrl}/game`;

    return axios.get(url, {
        timeout: 20000
    })
    .then(response => response.data)
}

export const convertCSVtoJSON = (data) => {
    data.splice(0, 1);
    return Promise.map(data, (dataItem, index) => {
        return {
            rank: dataItem[0],
            name: dataItem[1],
            platform: dataItem[2],
            year: dataItem[3],
            genre: dataItem[4],
            publisher: dataItem[5],
            globalSales: dataItem[6],
        };
    });
}

const swap = (arr, firstIndex, secondIndex) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;

    return arr;
}

export const getPartitionIndex = (arr, start, end, sortBy = 'name') => {
    const pivot = arr[end];
    let pivotIndex = start;

    for (let i = start; i <= end - 1; i++) {
        let comparison = null;
        switch(sortBy.toLowerCase()) {
            case 'name':
                comparison = arr[i].name.localeCompare(pivot.name) < 0;
                break;
            case 'globalSales':
                comparison = Number(arr[i].globalSales) < Number(pivot.globalSales);
                break;
            case 'year':
                comparison = Number(arr[i].year) < Number(pivot.year);
                break;
            default:
                comparison = arr[i].name.localeCompare(pivot.name) < 0;
                break;
        }

        if (comparison) {
            arr = swap(arr, i, pivotIndex);
            pivotIndex++;
        }
    }
    arr = swap(arr, pivotIndex, end);

    return pivotIndex;
}

export const quickSort = (arr, start, end, sortBy = 'name') => {
    if (start < end) {
        const pivotIndex = getPartitionIndex(arr, start, end, sortBy);
        quickSort(arr, start, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, end);
    }

    return arr;
}