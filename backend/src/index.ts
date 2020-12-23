//Dependences
import Server from "./Server";
import connection from "./db";

/**
 * Main function
 */
async function main(): Promise<void> {
    // Instances
    const server: Server = new Server();

    // Start Server and database
    await connection();
    server.startServer();
}

main();