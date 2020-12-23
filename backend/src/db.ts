//Environment Variables
require('dotenv').config();

// Dependences
import { createConnection, ConnectionOptions, Connection } from "typeorm";
import { join } from "path";


const newConnection = async (options?: ConnectionOptions): Promise<void> => {
    // Local varibles
    let connection: Connection;

    try {
        // Create a connection to the Data Base, with commun settings or user settings
        if (options)
            connection = await createConnection(options);
        else
            connection = await createConnection({
                type: "mysql",
                url: process.env.DB_URL,
                entities: process.env.NODE_ENV == "dev" ? [join(__dirname, "/models/*.ts")] : [join(__dirname, "/models/*.js")],
                synchronize: true
            });

        // It validates that the connection to the database is done
        if (connection)
            console.log(">> DB is connected");
    } catch (error) {
        console.error(error);
    }

};

// Export module
export default newConnection;

