export const composeError = (
  error: any,
  customMessage: string = "An unexpected error occurred"
) => {
  return error instanceof Error ? error.message : customMessage;
};
