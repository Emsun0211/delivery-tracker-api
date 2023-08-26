import mongoose, {ConnectOptions} from "mongoose";
import { config } from "dotenv";

config();




const connectDB = async () => {
	try {
		const connect = await mongoose.connect(`mongodb+srv://emsun:${process.env.DB_PASSWORD}@cluster0.nyudlgz.mongodb.net/?retryWrites=true&w=majority`);
		console.log(
			"Database connected",
			connect.connection.host,
			connect.connection.name
		);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connectDB;