import { NextApiRequest, NextApiResponse } from "next";
import {QuizModel} from "../model/model";
import db from "@/pages/mongodb";
type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    try {
   await db();
  const data = await QuizModel.find();
    res.status(200).json({ result:data,success:true });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
