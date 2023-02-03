import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const PhotosApi = createApi({
    reducerPath : 'photos',
    baseQuery : fetchBaseQuery({
        baseUrl : 'http://localhost:3004'
    }),
    endpoints(builder){
        return{
            fetchPhotos : builder.query({
                
            }),
            addPhoto : builder.mutation({
                
            }),
            removePhoto : builder.mutation({
                
            }),
        }
    }
})