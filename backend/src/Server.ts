//Environment Variables
require('dotenv').config();

//Dependences
import express, { Application, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

/**
 * 
 */
class Server {
    private app: Application;

    /**
     * Create a server application
     * @param {number} port Port of the server you are working on
     */
    constructor(port?: number) {
        this.app = express();
        this.settings(port);
        this.middlewares();
        this.routes();
    }

    /**
     * Returns the server application
     */
    public get App(): Application {
        return this.app;
    }

    /**
     * Sets up all server settings
     * @param {number} port Port of the server you are working on
     */
    private settings(port?: number): void {
        this.app.set('port', port || process.env.PORT || 3500);
    }

    /**
     * Set all the middlewares that will occupy the server
     */
    private middlewares(): void {
        this.app.use(cors());
        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));

        /**
         * If the environment equals "develoment" (dev), the morgan library will be used to
         * review all customer requests, otherwise it will not be necessary to use it.
         */
        if (process.env.NODE_ENV === 'dev')
            this.app.use(morgan('dev'));
    }

    /**
     * Sets up server paths
     */
    private routes(): void {

    }

    /**
     * Start the server on the established port
     */
    public startServer(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`)
        });
    }
}

//Exporting the module
export default Server;