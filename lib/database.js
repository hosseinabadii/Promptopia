import mongoose from "mongoose";
import Prompt from "@/models/prompt";

let isConnected = false;

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function serializeMongoObjects(data) {
  return JSON.parse(JSON.stringify(data));
}

export async function fetchPrompts(query) {
  try {
    await connectToDB();
    const searchRegex = new RegExp(query.search, "i");
    const prompts = await Prompt.find({
      $or: [{ prompt: searchRegex }, { tag: searchRegex }],
    })
      .populate("creator")
      .limit(50);
    return serializeMongoObjects(prompts);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserPromptsById(userId) {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: userId,
    }).populate("creator");
    return serializeMongoObjects(prompts);
  } catch (error) {
    console.log(error);
  }
}

export async function deletePrompt(id) {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
}

export async function createPrompt(data) {
  try {
    await connectToDB();
    const newPrompt = new Prompt(data);
    await newPrompt.save();
  } catch (error) {
    console.log(error);
  }
}

export async function updatePrompt(id, data) {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return null;
    }
    prompt.prompt = data.prompt;
    prompt.tag = data.tag;
    await prompt.save();
  } catch (error) {
    console.log(error);
  }
}

export async function getPromptById(id) {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(id).populate("creator");
    if (!prompt) {
      return null;
    }
    return serializeMongoObjects(prompt);
  } catch (error) {
    console.log(error);
  }
}
