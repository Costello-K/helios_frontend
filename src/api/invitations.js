import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';
import { computed } from 'vue';
import store from '@/store';

class InvitationsApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
    this.user_id = computed(() => store.getters['authUser/getUserId']);
  }

  async getMyInvitationsList(page) {
    const path = `v1/users/${this.user_id.value}/invitations/?page=${page}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getCompanyInvitationsList(company_id, page) {
    const path = `v1/companies/${company_id}/invitations/?page=${page}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async sendInvitation(company_id, user_id) {
    const path = `v1/companies/${company_id}/invitations/${user_id}/`;
    return this.baseApiClient.makeRequest('POST', path);
  }

  async revokeInvitation(company_id, invitation_id) {
    const path = `v1/companies/${company_id}/invitations/${invitation_id}/revoke/`;
    return this.baseApiClient.makeRequest('POST', path);
  }

  async updateStatusOfInvitation(company_id, invitation_id, data) {
    const path = `v1/companies/${company_id}/invitations/${invitation_id}/`;
    return this.baseApiClient.makeRequest('PATCH', path, data);
  }

  async sendRequest(company_id) {
    const path = `v1/users/${this.user_id.value}/requests/${company_id}/`;
    return this.baseApiClient.makeRequest('POST', path);
  }
}

const invitationsApiController = new BaseApiController(axiosInstance);
export const invitationsApi = new InvitationsApiController(invitationsApiController);
