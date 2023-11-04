import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';

class QuizzesApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
  }

  async getListCompanyQuizzes(page, company_id) {
    const params = new URLSearchParams();
    params.append('page', page);

    const path = `/v1/companies/${company_id}/quizzes/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getListUserQuizzes(page, user_id) {
    const params = new URLSearchParams();
    params.append('page', page);

    const path = `/v1/users/${user_id}/quizzes/?${params.toString()}`;
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

  async allCompanyQuizResults(company_id, user_id='') {
    const params = new URLSearchParams();
    params.append('user_id', user_id);

    const path = `/v1/analytics/companies/${company_id}/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async allUserQuizResults(user_id) {
    const path = `/v1/analytics/users/${user_id}/`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getListUserQuizResults(user_id, { page, company_id, quiz_id, export_format }={}) {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (company_id) params.append('company_id', company_id);
    if (quiz_id) params.append('quiz_id', quiz_id);
    if (export_format) params.append('export_format', export_format);

    const path = `/v1/users/${user_id}/quizzes/results/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getCompanyUserQuizResults(company_id, { page, user_id, quiz_id, export_format }={}) {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (user_id) params.append('user_id', user_id);
    if (quiz_id) params.append('quiz_id', quiz_id);
    if (export_format) params.append('export_format', export_format);

    const path = `/v1/companies/${company_id}/quizzes/results/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }
}

const quizzesApiController = new BaseApiController(axiosInstance);
export const quizzesApi = new QuizzesApiController(quizzesApiController);
