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
    const path = `/v1/companies/${id}/`;
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

  async getCompanyAdminsList(id, page) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('company_id', id);

    const path = `/v1/companies/${id}/admins/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getCompanyMembersList(id, page) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('company_id', id);

    const path = `/v1/companies/${id}/members/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async appointAdmin(id, user_id) {
    const path = `/v1/companies/${id}/appoint_admin/${user_id}/`;
    return this.baseApiClient.makeRequest('POST', path);
  }

  async removeAdmin(id, user_id) {
    const path = `/v1/companies/${id}/remove_admin/${user_id}/`;
    return this.baseApiClient.makeRequest('POST', path);
  }

  async removeMember(id, user_id) {
    const path = `/v1/companies/${id}/remove_user/${user_id}/`;
    return this.baseApiClient.makeRequest('DELETE', path);
  }

  async removeMe(id) {
    const path = `/v1/companies/${id}/remove_me/`;
    return this.baseApiClient.makeRequest('DELETE', path);
  }
}

const companiesApiController = new BaseApiController(axiosInstance);
export const companiesApi = new CompaniesApiController(companiesApiController);
