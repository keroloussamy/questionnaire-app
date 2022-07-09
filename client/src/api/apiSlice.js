import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Questionnaires', 'Questionnaire'],
  endpoints: builder => ({
    getQuestionnaires: builder.query({
      query: () => '/questionnaires',
      providesTags: ['Questionnaires']
    }),
    getQuestionnaire: builder.query({
      query: id => `/questionnaires/${id}`,
      providesTags: ['Questionnaire']
    }),
    addNewQuestionnaire: builder.mutation({
      query: questionnaireData => ({
        url: '/questionnaires',
        method: 'POST',
        body: questionnaireData
      }),
      invalidatesTags: ['Questionnaires']
    }),
    deleteQuestionnaire: builder.mutation({
      query: id => ({
        url: `/questionnaires/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Questionnaires']
    }),
    getQuestion: builder.query({
      query: ({ questionnaireId, questionId }) => ({
        url: `/questions/${questionnaireId}/${questionId}`,
      })
    }),
    addNewQuestion: builder.mutation({
      query: ({ questionnaireId, questionData }) => ({
        url: `/questions/${questionnaireId}`,
        method: 'POST',
        body: questionData
      }),
      invalidatesTags: ['Questionnaire']
    }),
    deleteQuestion: builder.mutation({
      query: ({ questionnaireId, questionId }) => ({
        url: `/questions/${questionnaireId}/${questionId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Questionnaire']
    }),
    editQuestion: builder.mutation({
      query: ({ questionnaireId, questionId, questionData }) => ({
        url: `/questions/${questionnaireId}/${questionId}`,
        method: 'PUT',
        body: questionData
      }),
      invalidatesTags: ['Questionnaire']
    }),
  })
})

export const {
  useGetQuestionnairesQuery,
  useGetQuestionnaireQuery,
  useAddNewQuestionnaireMutation,
  useDeleteQuestionnaireMutation,
  useGetQuestionQuery,
  useAddNewQuestionMutation,
  useDeleteQuestionMutation,
  useEditQuestionMutation,
} = apiSlice