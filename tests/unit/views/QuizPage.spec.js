/* global describe, beforeEach, it, expect, jest */
import { mount } from '@vue/test-utils';
import router from '@/router';
import axios from 'axios';
import QuizPage from '@/views/QuizPage';


describe('testQuizPageView', () => {
  let wrapper;
  const mockQuiz = {
    title: 'Title',
    description: 'Description',
    frequency: null,
    company: {
      is_admin: false,
      owner: {
        id: 2,
      },
    },
    questions: [
      {
        id: 1,
        question_text: 'Question 1',
        answers: [
          {
            text: 'Answer 1',
            is_right: false,
          },
          {
            text: 'Answer 2',
            is_right: false,
          },
        ],
      },
      {
        id: 2,
        question_text: 'Question 2',
        answers: [
          {
            text: 'Answer 3',
            is_right: false,
          },
          {
            text: 'Answer 4',
            is_right: false,
          },
        ],
      },
    ],
  };

  const mockRouter = {
    currentRoute: {
      value: {
        params: {
          companyId: 1,
          quizId: 1,
        },
        query: {
          preview: false,
          start: true,
        },
      },
    },
  };
  jest.mock('vue-router', () => ({
    useRouter: () => mockRouter,
  }));

  const store = {
    getters: {
      'authUser/getUserId': 1,
    },
  };
  jest.mock('vuex', () => ({
    useStore: () => store,
  }));

  const mockTranslate = key => key;
  jest.mock('vue-i18n', () => ({
    useI18n: () => ({
      t: mockTranslate,
    }),
  }));

  beforeEach(async () => {
    axios.get = jest.fn().mockResolvedValue({ data: mockQuiz })

    wrapper = mount(QuizPage, {
      props: {
        formData: mockQuiz,
        loaded: true,
      },
      global: {
        plugins: [store, router],
        mocks: {
          $t: mockTranslate,
          $router: mockRouter,
        }
      },
    });

    await wrapper.vm.$nextTick();
  });

  it('renders quiz page', async () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Quiz');
  });

  it('toggles checkbox value to true on click', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    expect(checkbox.exists()).toBe(true);

    await checkbox.trigger('click');

    expect(wrapper.vm.formData.questions[0].answers[0].is_right).toBe(true);
  });

  it('sending quiz results when you click the "Submit" button', async () => {
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.exists()).toBe(true);

    const submitMethodMock = jest.spyOn(wrapper.vm, 'submit');
    await submitButton.trigger('click');

    expect(submitMethodMock).toHaveBeenCalled();
    expect(submitMethodMock).toHaveBeenCalledTimes(1);
  });
});
