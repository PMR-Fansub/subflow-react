const getErrorMessageFromError = error => {
  let errorMessage = "";
  if (error.response) {
    errorMessage = `${error.response.data.message} (${error.response.data.code})`;
  } else {
    errorMessage = error.message;
  }
  return errorMessage;
};

const getDataFromResponse = response => {
  const respBody = response.data;
  return respBody.data;
};

export { getErrorMessageFromError, getDataFromResponse };
