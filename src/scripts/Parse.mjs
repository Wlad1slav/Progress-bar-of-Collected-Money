export class Parse {
    #apiKey;
    #spreadsheetId;

    constructor(options) {
        this.#apiKey = options.apiKey;
        this.#spreadsheetId = options.spreadsheetId;
    }

    async getRadius(sheet, point1, point2) {
        // Returns all the cells of a given range in a specified range

        const range = `'${sheet}'!${point1}:${point2}`;
        let column;

        await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.#spreadsheetId}/values/${range}?key=${this.#apiKey}`)
            .then(response => response.json())
            .then(data => {
                // Processing table data after execution of asynchronous bullshit
                column = data;
            })
            .catch(error => console.error('Error:', error));

        return await column;
    }
}