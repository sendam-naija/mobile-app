import Toast from "react-native-toast-message";

const findErrorMessage = (error: unknown): string | undefined => {
  if (typeof error === "string" && error.trim()) {
    return error;
  }

  if (!error || typeof error !== "object") {
    return undefined;
  }

  const value = error as Record<string, unknown>;

  return (
    findErrorMessage(value.message) ||
    findErrorMessage(value.error) ||
    findErrorMessage(value.data)
  );
};

export const handleError = (error: unknown) => {
  Toast.show({
    type: "customSlideError",
    text1: "An Error Occurred",
    text2: findErrorMessage(error) || "Couldn't complete operation",
  });
};

export const handleSuccess = (message?: string) => {
  Toast.show({
    type: "customSlideSuccess",
    text1: "Success",
    text2: message || "Operation completed successfully",
  });
};
