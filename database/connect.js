import mongoose from "mongoose";

async function connect() {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_ATLAS);
  } catch (error) {
    throw new Error(error);
  }
}

export default connect;
