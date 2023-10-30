import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';
import { computed } from 'vue';
import store from '@/store';

class RequestsApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
    this.user_id = computed(() => store.getters['authUser/getUserId']);
  }

  async getMyRequestsList(page) {
    const path = `v1/users/${this.user_id.value}/requests/?page=${page}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getCompanyRequestsList(company_id, page) {
    const path = `v1/companies/${company_id}/requests/?page=${page}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async sendRequest(company_id) {
    const path = `v1/users/${this.user_id.value}/requests/${company_id}/`;
    return this.baseApiClient.makeRequest('POST', path);
  }

  async cancelRequest(request_id) {
    const path = `v1/users/${this.user_id.value}/requests/${request_id}/cancell/`;
    return this.baseApiClient.makeRequest('POST', path);
  }

  async updateStatusOfRequest(sender_id, request_id, data) {
    const path = `v1/users/${sender_id}/requests/${request_id}/`;
    return this.baseApiClient.makeRequest('PATCH', path, data);
  }
}

const requestsApiController = new BaseApiController(axiosInstance);
export const requestsApi = new RequestsApiController(requestsApiController);
