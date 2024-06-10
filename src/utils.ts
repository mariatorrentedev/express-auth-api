export const composeError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  customMessage: string = "An unexpected error occurred"
) => {
  return error instanceof Error ? error.message : customMessage;
};
