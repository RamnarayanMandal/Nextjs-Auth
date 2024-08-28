import mongoose from 'mongoose';

export async function connect() {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('Please define the MONGO_URL environment variable inside .env.local');
        }

        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "School",
        });

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected to MongoDB");
        });

        connection.on('error', (err) => {
            console.log("MongoDB connection error, please try again: " + err);
            process.exit(1);
        });

    } catch (err) {
        console.log("Something went wrong in connecting to MongoDB");
        console.log(err);
    }
}
