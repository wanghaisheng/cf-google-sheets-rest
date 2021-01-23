class Sheet {
    index: number;

    data: object;

    constructor({ index, data }: Sheet) {
        this.index = index;
        this.data = data;
    }
}

export default Sheet;