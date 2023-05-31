import { api } from "../api";

export const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (body) => ({
        url: "networking_event",
        body,
        method: "get",
      }),
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
    }),
    createEvent: builder.mutation({
      query: (body) => ({
        url: "networking_event",
        body,
        method: "post",
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useEditEventMutation,
  useGetEventQuery,
  useGetEventsQuery,
} = eventsApi;
