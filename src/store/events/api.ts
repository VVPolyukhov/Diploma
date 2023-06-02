import { notification } from "antd";
import { ROUTES } from "constants/shared/routes";
import Router from "next/router";
import { ETagTypes } from "store/api/types";
import { api } from "../api";

export const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (body) => ({
        url: "networking_event",
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
    editEvent: builder.mutation({
      query: (body) => ({
        url: `networking_event`,
        body,
        method: "put",
      }),
      invalidatesTags: [ETagTypes.events],
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: "networking_event",
        body,
        method: "post",
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
  }),
});

export const {
  useCreateEventMutation,
  useEditEventMutation,
  useGetEventQuery,
  useGetEventsQuery,
} = eventsApi;
