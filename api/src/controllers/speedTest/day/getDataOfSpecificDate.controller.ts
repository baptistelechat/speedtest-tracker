import { Request, Response } from "express";
import fs from "fs";
import dayjs from "dayjs";
import { ISpeedTestData } from "../../../data/interface/ISpeedTestData";

// GET data of a specific date
export const getDataOfSpecificDate = async (req: Request, res: Response) => {
  const APP_MODE = process.env.APP_MODE;

  try {
    const { filename } = req.params;
    const formattedDate = dayjs(filename, "YYYYMMDD").format("YYYYMMDD");

    const dataPath = APP_MODE?.includes("UNIX")
      ? `./data/${formattedDate}.json`
      : `../script/data/${formattedDate}.json`;

    const fileData = fs.readFileSync(dataPath, "utf-8");
    const jsonData: ISpeedTestData[] = JSON.parse(fileData);

    res.json(jsonData);
  } catch (error: any) {
    res.status(500).json({
      error: `Erreur lors de la récupération des données - ${error.message}`,
    });
  }
};
