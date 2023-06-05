import { notification } from "antd";
import { ROUTES } from "constants/shared/routes";
import Router from "next/router";
import { ETagTypes } from "store/api/types";
import { TObject } from "utils/shared/url";
import { api } from "../api";

export const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (query: TObject) => ({
        url: `networking_event`,
        params: query,
        method: "get",
      }),
      providesTags: [ETagTypes.events],
    }),
    getEvent: builder.query({
      query: ({ id }) => ({
        url: `networking_event/${id}`,
        method: "get",
      }),
    }),
    getEventAvatar: builder.query({
      query: ({ id }) => ({
        url: `networking_event/avatar/${id}`,
        method: "get",
      }),
    }),
    editEvent: builder.mutation({
      query: (body) => ({
        url: `networking_event`,
        body,
        method: "put",
        formData: true,
      }),
      invalidatesTags: [ETagTypes.events],
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: "networking_event",
        body,
        method: "post",
        formData: true,
      }),
      onQueryStarted: async (arg, api) => {
        try {
          await api.queryFulfilled;
          Router.push(ROUTES.ADMIN_EVENTS.PATHNAME);
          notification.success({
            message: "Мероприятие создано",
          });
        } catch (error) {}
      },
      invalidatesTags: [ETagTypes.events],
    }),
    registerEvent: builder.mutation({
      query: (id) => ({
        url: `networking_event/${id}/sign_up`,
        method: "post",
      }),
      onQueryStarted: async (arg, api) => {
        try {
          await api.queryFulfilled;
          notification.success({
            message: "Вы успешно зарегистрировались на мероприятие",
          });
        } catch (error) {}
      },
      invalidatesTags: [ETagTypes.events],
    }),
  }),
});

export const {
  useRegisterEventMutation,
  useCreateEventMutation,
  useEditEventMutation,
  useGetEventQuery,
  useGetEventsQuery,
  useGetEventAvatarQuery,
} = eventsApi;
