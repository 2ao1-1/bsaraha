export const request = async (promise) => {
  try {
    const res = await promise;

    return {
      success: res.data?.success ?? true,
      data: res.data?.data || res.data,
      message: res.data?.message,
      status: res.status,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        status: err.response?.status || 500,
        message:
          err.response?.data?.message ||
          err.message ||
          "server connection error",
        data: err.response?.data,
      },
    };
  }
};
