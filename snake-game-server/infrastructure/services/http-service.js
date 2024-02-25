import { createServer } from "http";
import express from "express";

export class HttpService {
    
    constructor(dbService) {
        this.dbService = dbService;
    }

    initialize(port) {

        const app = express();

        app.use(express.static('../snake-client/dist'));

        this.httpServer = createServer(app);
        this.httpServer.listen(port);

        app.get('/scores', async (req, res) => {

            this.dbService.getScores()
                .then(scores => {
                    res.status(200).json(scores);
                })
                .catch(err => {
                    res.status(500).json({ error: 'Failed to fetch scores' } );
                });
        });
    }

    getServer() {
        return this.httpServer;
    }
}
