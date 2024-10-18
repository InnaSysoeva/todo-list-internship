import { TaskType } from "types/task.type";
import { parse, ParseResult } from "papaparse";

export const parseCSV = (csvData: string): Promise<TaskType[]> => {
  return new Promise((resolve, reject) => {
    parse<TaskType>(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<TaskType>) => {
        resolve(results.data as TaskType[]);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};
