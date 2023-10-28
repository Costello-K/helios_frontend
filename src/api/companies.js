import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';
import { computed } from 'vue';
import store from '@/store';

class CompaniesApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
    this.user_id = computed(() => store.getters['authUser/getUserId']);
  }

  async getListCompanies(page, user_id='') {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('user_id', user_id);

    const path = `/v1/companies/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getCompany(id) {
    const path = `/v1/companies/${id}/?user_id=${this.user_id.value}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async createCompany(formData) {
    const path = '/v1/companies/';
    return this.baseApiClient.makeRequest('POST', path, formData);
  }

  async updateCompany(id, formData) {
    const path = `/v1/companies/${id}/?user_id=${this.user_id.value}`;
    return this.baseApiClient.makeRequest('PATCH', path, formData);
  }

  async removeCompany(id) {
    const path = `/v1/companies/${id}/?user_id=${this.user_id.value}`;
    return this.baseApiClient.makeRequest('DELETE', path);
  }
}

const companiesApiController = new BaseApiController(axiosInstance);
export const companiesApi = new CompaniesApiController(companiesApiController);
