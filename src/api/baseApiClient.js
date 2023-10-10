export class BaseApiClient {
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

      return {
        data: response.data,
        status: response.status,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
