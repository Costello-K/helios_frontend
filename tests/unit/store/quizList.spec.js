/* global describe, beforeEach, it, expect */
import quizList from '@/store/modules/quizList';


describe('testQuizVuexModule', () => {
  let state;
  const mockQuizList = [
    {id: 1, name: 'Quiz 1'},
    {id: 2, name: 'Quiz 2'},
    {id: 3, name: 'Quiz 3'},
  ];
  const mockUpdateQuizList = [
    {id: 4, name: 'Quiz 4'},
    {id: 5, name: 'Quiz 5'},
  ];

  beforeEach(() => {
    state = quizList.state();
    quizList.mutations.setQuizListData(state, mockQuizList);
    quizList.mutations.setQuizPageSize(state, 4);
  });

  it('clear state', () => {
    quizList.mutations.removeQuizListData(state);

    expect(state.quizzes).toEqual([]);
  });

  it('set quiz list', () => {
    quizList.mutations.setQuizListData(state, mockUpdateQuizList);

    expect(state.quizzes).toEqual(mockUpdateQuizList);
  });

  it('set page size', () => {
    const pageSize = 10;

    quizList.mutations.setQuizPageSize(state, pageSize);

    expect(state.page_size).toEqual(pageSize);
  });

  it('add quiz if list length is less than page_size', () => {
    const quizToAdd = [{ id: 4, name: 'Quiz 4' }];

    quizList.mutations.addQuizList(state, quizToAdd);

    expect(state.quizzes).toContainEqual({ id: 4, name: 'Quiz 4' });
  });

  it('add the number of quizzes so that list length is equal to page size', () => {
    quizList.mutations.addQuizList(state, mockUpdateQuizList);

    expect(state.quizzes).toContainEqual(mockUpdateQuizList[0]);
    expect(state.quizzes).not.toContainEqual(mockUpdateQuizList[1]);
  });

  it('doesn\'t add quiz if list length is greater than page_size', () => {
    state.page_size = 3;

    quizList.mutations.addQuizList(state, mockUpdateQuizList);

    expect(state.quizzes).not.toContainEqual(mockUpdateQuizList[0]);
  });

  it('removes quiz', () => {
    quizList.mutations.removeQuiz(state, 2);

    expect(state.quizzes).toEqual([
      mockQuizList[0],
      mockQuizList[2],
    ]);
  });

  it('doesn\'t remove quiz if id doesn\'t match', () => {
    quizList.mutations.removeQuiz(state, 4);

    expect(state.quizzes).toEqual(mockQuizList);
  });

  it('update quiz', () => {
    const updatedQuiz = {id: 2, name: 'Updated Quiz'};

    quizList.mutations.updateQuizListData(state, updatedQuiz);

    expect(state.quizzes).toEqual([
      mockQuizList[0],
      updatedQuiz,
      mockQuizList[2],
    ]);
  });

  it('doesn\'t update quiz if id doesn\'t match', () => {
    const updatedQuiz = {id: 4, name: 'Updated Quiz'};

    quizList.mutations.updateQuizListData(state, updatedQuiz);

    expect(state.quizzes).toEqual(mockQuizList);
  });
});
