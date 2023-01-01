const SERVER_ADDRESS = 'http://localhost:3000';
const CANDY_COLLECTION_NAME = 'items';

const formatError = (error) => {
    return error.message;
}

const ApiService = {
    async getCandyStore() {
        try {
            const response = await fetch(`${SERVER_ADDRESS}/${CANDY_COLLECTION_NAME}`);
            const items = await response.json();

            return items;
        } catch (error) {
            throw formatError(error);
        }
    },

    async deleteCandy( {id, title} ) {
        try {
            const response = await fetch(`${SERVER_ADDRESS}/${CANDY_COLLECTION_NAME}/${id}`, {
                method: 'DELETE',
            });
            if (response.status === 404) {
                throw new Error(`Element "${title}" no longer exists.`)
            }
            const deletedItem = await response.json();

            return deletedItem;
        } catch (error) {
            throw formatError(error);
        }
    },

    async createCandy(candyData) {
        try {
            const response = await fetch(`${SERVER_ADDRESS}/${CANDY_COLLECTION_NAME}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(candyData),
            });

            if (response.status === 404) {
                throw new Error(`Failed to Create new Todo`)
            }

        } catch (error) {
            throw formatError(error);
        }
    }

};

export default ApiService;