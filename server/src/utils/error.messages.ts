const errorMessages = {
  creation: (entity: string) => `Error creating ${entity}`,
  update: (entity: string) => `Error updating ${entity}`,
  deletion: (entity: string) => `Error deleting ${entity}`,
  notFound: (entity: string) => `${entity} not found`,
  validation: (entity: string) => `Error validating ${entity}`,
};
export default errorMessages;
