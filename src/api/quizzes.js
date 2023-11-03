import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';

class QuizzesApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
  }

  async getListQuizzes(page, company_id) {
    const params = new URLSearchParams();
    params.append('page', page);

    const path = `/v1/companies/${company_id}/quizzes/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async createQuiz(company_id, formData) {
    const path = `/v1/companies/${company_id}/quizzes/`;
    return this.baseApiClient.makeRequest('POST', path, formData);
  }

  async getQuiz(company_id, quiz_id) {
    const path = `/v1/companies/${company_id}/quizzes/${quiz_id}/`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async updateQuiz(company_id, quiz_id, formData) {
    const path = `/v1/companies/${company_id}/quizzes/${quiz_id}/`;
    return this.baseApiClient.makeRequest('PATCH', path, formData);
  }

  async removeQuiz(company_id, quiz_id) {
    const path = `/v1/companies/${company_id}/quizzes/${quiz_id}/`;
    return this.baseApiClient.makeRequest('DELETE', path);
  }

  async startQuiz(company_id, quiz_id) {
    const path = `/v1/companies/${company_id}/quizzes/${quiz_id}/start/`;
    return this.baseApiClient.makeRequest('POST', path);
  }

  async completeQuiz(company_id, quiz_id, formData) {
    const path = `/v1/companies/${company_id}/quizzes/${quiz_id}/complete/`;
    return this.baseApiClient.makeRequest('POST', path, formData);
  }
}

const quizzesApiController = new BaseApiController(axiosInstance);
export const quizzesApi = new QuizzesApiController(quizzesApiController);
