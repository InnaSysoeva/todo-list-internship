import { TaskType } from "types/task.type";
import { parse, ParseResult } from "papaparse";
import errorMessages from "./error.messages";
import { expectedHeaders } from "./csv.headers";

const areHeadersValid = (headers: (string | undefined)[]): boolean => {
  return (
    headers.length === expectedHeaders.length &&
    expectedHeaders.every((header) => headers.includes(header))
  );
};

const isRowValid = (
  row: TaskType,
  headers: (string | undefined)[],
): boolean => {
  return (
    Object.values(row).filter((value) => value.toString().trim() !== "")
      .length === headers.length
  );
};

export const parseCSV = (csvData: string): Promise<TaskType[]> => {
  return new Promise((resolve, reject) => {
    parse<TaskType>(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<TaskType>) => {
        const headers = results.meta.fields;

        if (!headers || !areHeadersValid(headers)) {
          reject(
            new Error(
              errorMessages.csvValidation(
                "headers",
                expectedHeaders.join(", "),
              ),
            ),
          );
          return;
        }

        const invalidRows = results.data.filter(
          (row, index) => !isRowValid(row, headers),
        );

        if (invalidRows.length > 0) {
          reject(
            new Error(
              errorMessages.csvValidation(
                "rows",
                expectedHeaders.length + " values in a row",
              ),
            ),
          );
          return;
        }

        resolve(results.data as TaskType[]);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};
