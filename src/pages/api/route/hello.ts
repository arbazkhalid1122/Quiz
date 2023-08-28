import { Data } from "@/data";




export default function handler(req:any, res:any) {
    const allData = Data
    if (req.method === 'GET') {
      res.status(200).json(allData);
    } 
    else if (req.method === 'POST') {
      const { type, optionArray } = req.body;
     const equalCount = allData[type].filter((item:any, index:any) => item.answer === optionArray[index]).length;
      const responseData = { getTrue: equalCount, getFalse: optionArray.length - equalCount };
      res.status(201).json(responseData);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } 
