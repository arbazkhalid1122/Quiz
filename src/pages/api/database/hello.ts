import { NextApiRequest, NextApiResponse } from "next";
import { QuizModel } from "../model/model";
import db from "@/pages/mongodb";

type ResponseData = {
  message: string;
  result: any;
};

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await db();
    const data = await QuizModel.find();
    res.status(200).json({ result: data, message: "got data" });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({
      message: "Internal server error",
      result: undefined,
    });
  }
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await db();
    const data = await QuizModel.find();
    const { type, optionArray } = req.body;

    const filter = data.filter((item) => {
      return item.category === type;
    });

    const correctAnswers = filter.map((item) => item.answer);

    const correctCount = optionArray.filter(
      (selectedAnswer: any, index: any) => {
        return selectedAnswer === correctAnswers[index];
      }).length;

    const answer = {
      getTrue: correctCount,
      getFalse: filter.length - correctCount,
    };

    res.status(201).json({ result: answer, message: "success" });
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({
      message: "Internal server error",
      result: undefined,
    });
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
    res.status(405).json({
      message: "Method Not Allowed",
      result: undefined,
    });
  }
}
