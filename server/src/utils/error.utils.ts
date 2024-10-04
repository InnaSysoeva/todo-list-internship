export const createError = (status: number, message: string, details: any) => {
  return {
    status,
    message,
    details,
  };
};
