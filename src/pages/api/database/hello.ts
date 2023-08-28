import { NextApiRequest, NextApiResponse } from "next";
import { QuizModel } from "../model/model";
import db from "@/pages/mongodb";

type ResponseData = {
  message: string;
};

async function handleGet(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await db();
    const data = await QuizModel.find();
    res.status(200).json({ result: data, success: true });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await db();
    const newData = new QuizModel({
      name: "khan",
      email: "aaaaa"
    });

    const addData = await newData.save();
    res.status(201).json({ result: addData, success: true });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    await handleGet(req, res);
  } else if (req.method === "POST") {
    await handlePost(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
