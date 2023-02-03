import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

//   DEVELOPMENT PURPOSE ONLY
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
const albumsApi = createApi({
  // CONFIGURATION OBJECT
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3004",
    fetchFn: async (...args) => {
      // FOR DEVELOPMENT PURPOSE ONLY
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          console.log(album);
          return [{ type: "Album", id: album.id }];
          // return [{ type: "Album", id: album.userId }];
          // return [];
        },
        query: (album) => {
          return {
            // CONFIGURATION OBJECT
            method: "DELETE",
            url: `/albums/${album.id}`,
          };
        },
      }),
      addAlbum: builder.mutation({
        // invalidatesTags:['Album'],
        invalidatesTags: (result, error, user) => {
          // return [{ type: "Album", id: user.id }];
          return [{ type: "UsersAlbums", id: user.id }];
        },

        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchAlbums: builder.query({
        // providesTags:['Album'],
        // this user argument came from the call where we pass the user in the "albumList.js" file
        providesTags: (result, error, user) => {
          //
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbums", id: user.id });
          return tags;
          //
          // return [{ type: "Album", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi; // albumsApi.useFetchAlbumsQuery()
export { albumsApi };
