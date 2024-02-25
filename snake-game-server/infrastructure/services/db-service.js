import { MongoClient } from "mongodb";

export class DbService {

    constructor() {
        this.dbContext = null;
    }

    initialize() {
       return MongoClient.connect('mongodb://localhost:27017/snake')
            .then((client) => {
                this.dbContext = client.db()
                console.log('db connect')
            })
            .catch(err => {
                console.log(err)
            })
    }

    async getScores() {
        try {
            const scores = await this.dbContext.collection('snakescores')
                .find()
                .sort({ score: -1 })
                .toArray();
            return scores;
        } catch (error) {
            console.error('Error fetching scores:', error);
            throw error;
        }
    }

    async insertScore(scoreEntry) {
        try {
             await this.dbContext.collection('snakescores')
                .insertOne(scoreEntry)
        } catch (error) {
            console.error('Error fetching scores:', error);
            throw error;
        }
    }

    getDb() {
        return this.dbContext;
    }

}