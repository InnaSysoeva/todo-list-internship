export const toastErrorMessages = {
  creation: (entity: string) => `Error creating ${entity}`,
  update: (entity: string) => `Error updating ${entity}`,
  deletion: (entity: string) => `Error deleting ${entity}`,
  notFound: (entity: string) => `${entity} not found`,
};

export const toastSuccessMessages = {
  creation: (entity: string) => `${entity} successfully created`,
  update: (entity: string) => `${entity} successfully updated`,
  deletion: (entity: string) => `${entity} successfully deleted`,
};
