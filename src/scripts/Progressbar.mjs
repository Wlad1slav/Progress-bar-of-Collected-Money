import {Parse} from "./Parse.mjs";

export class Progressbar {

    // https://console.cloud.google.com/apis/credentials
    #apiGoogleCloud = 'YOUR_API';

    #spreadsheetId; // The ID of the table from which they will be collected
    #aim; // The aim is how much to collect
    #columnRange; // From what radius to take sums of money
    #currency = '$'; // Currency of the fee
    #collectionGoal = ''; // Goal of collecting money

    #parser; // A parser for getting data from a table

    constructor(options) {
        this.#spreadsheetId = options.spreadsheetId;
        this.#aim = options.aim ?? 1000;
        this.#columnRange = options.columnRange;
        this.#currency = options.currency ?? this.#currency;
        this.#collectionGoal = options.collectionGoal ?? this.#collectionGoal;

        this.#parser = new Parse({
            apiKey: this.#apiGoogleCloud,
            spreadsheetId:  this.#spreadsheetId,
        });

        // Creates a progress bar
        this.#create().then(() => {
            // After the progress bar is created,
            // it is set to update the data after a certain transmitted interval
            setInterval(this.#update.bind(this), options.updateInterval * 60000);
        });

    }

    async #create() {
        this.#getValue().then(r => {
            // Collection information
            document.getElementById('goal').innerText = this.#collectionGoal;
            document.getElementById('value').innerText = r + this.#currency;
            document.getElementById('aim').innerText = this.#aim + this.#currency;
            document.getElementById('percentage').innerText = (r / this.#aim * 100).toFixed(2) + '%';

            // Create a progress bar
            const progressBar = document.createElement('progress');
            progressBar.id = 'progressbar';
            progressBar.max = this.#aim;
            progressBar.value = r;

            // Adds the created progress bar to the page
            document.body.innerHTML += progressBar.outerHTML;
        });
    }

    async #update() {
        // Updates the progress bar value

        console.log('Progressbar updating...');

        const progressbar = document.getElementById('progressbar');
        this.#getValue().then(r => {
            document.getElementById('value').innerText = r + this.#currency;
            document.getElementById('percentage').innerText = (r / this.#aim * 100).toFixed(2) + '%';
            progressbar.value = r;
        });

        console.log('Progressbar updated');
    }

    async #getValue() {
        // Returns the sum of all cells of the given radius

        const column = await this.#parser.getRadius(
            this.#columnRange.sheet,
            this.#columnRange.point1,
            this.#columnRange.point2
        );

        // The cycle goes through all the cells of a given radius and adds up all the numbers
        let value = 0;
        for (let row in column.values) {
            for (let cell in column.values[row]) {
                value += !isNaN(column.values[row][cell]) ? +column.values[row][cell] : 0;
            }
        }

        return value;
    }

}