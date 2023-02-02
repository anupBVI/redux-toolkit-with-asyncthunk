import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const albumsApi = createApi({
  // CONFIGURATION OBJECT
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3004",
  }),
  endpoints(builder) {
    return {
      addAlbum: builder.mutation({
        invalidatesTags:['Album'],
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
        // this user argument came from the call where we pass the user in the "albumList.js" file useFetchAlbumsQuery(user)
        providesTags:(result , error , user)=>{
            return [{type:'Album ' , id:user.id}]
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

export const { useFetchAlbumsQuery , useAddAlbumMutation } = albumsApi; // albumsApi.useFetchAlbumsQuery()
export { albumsApi };
