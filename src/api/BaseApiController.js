export class BaseApiController {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async makeRequest(method, path, data, config = {}) {
    try {
      const response = await this.axios.request({
        method,
        url: path,
        data,
        ...config,
      });

      return { ...response };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
