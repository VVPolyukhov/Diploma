import { notification } from "antd";
import { ETagTypes } from "store/api/types";
import { api } from "../api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // getUsers: builder.query({
    //   query: () => ({
    //     url: "user",
    //     method: "get",
    //   }),
    // }),
    getUser: builder.query({
      query: () => ({
        url: `user`,
        method: "get",
      }),
      providesTags: [ETagTypes.user],
    }),
    editUser: builder.mutation({
      query: (body) => ({
        url: `user`,
        body,
        method: "put",
      }),
      invalidatesTags: [ETagTypes.user],
      onQueryStarted: async (arg, api) => {
        try {
          await api.queryFulfilled;
          notification.success({
            message: "Данные пользователя изменены",
          });
        } catch (error) {}
      },
    }),
    getUserAvatar: builder.query({
      query: () => ({
        url: "user/avatar",
        method: "get",
      }),
    }),
    editUserAvatar: builder.mutation({
      query: () => ({
        url: "user/avatar",
        method: "post",
      }),
      onQueryStarted: async (arg, api) => {
        try {
          await api.queryFulfilled;
          notification.success({
            message: "Данные пользователя изменены",
          });
        } catch (error) {}
      },
    }),
    deleteUserAvatar: builder.mutation({
      query: () => ({
        url: "user/avatar",
        method: "delete",
      }),
    }),
  }),
});

export const {
  useDeleteUserAvatarMutation,
  useEditUserAvatarMutation,
  useEditUserMutation,
  useGetUserAvatarQuery,
  useGetUserQuery,
} = userApi;
