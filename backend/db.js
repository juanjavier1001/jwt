import { connect } from "mongoose";

const connectdb = async () => {
  try {
    const db = await connect("mongodb://127.0.0.1:27017/db_mongojc");
    console.log("conectado en " + db.connection.name);
  } catch (error) {
    console.log("error db", error);
  }
};

export default connectdb;
