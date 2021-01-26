class IndexConverter {
    execute(index: number): number {
        if (index < 2) {
            throw Error('This index cannot be less than 2');
        }

        const newIndex = index - 2;

        return newIndex;
    }
}

const indexConverter = new IndexConverter();
export default indexConverter;