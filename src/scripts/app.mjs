import {Progressbar} from "./Progressbar.mjs";

new Progressbar({
    spreadsheetId: '1xNebksWKAfyeXF_Kq-D1UsTWkwoF2OInOacTuDYzuPE',
    aim: '30000',
    columnRange: {
        sheet: 'Основна черга',
        point1: 'C2',
        point2: 'C'
    },
    collectionGoal: 'FPV drone for the Ukrainian army',
    currency: '₴',
    updateInterval: 5 // in minutes
});