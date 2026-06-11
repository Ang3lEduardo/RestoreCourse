import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api/'
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (args:string | FetchArgs, api:BaseQueryApi,
    extraOptions: object) => {
    api.dispatch({type: 'ui/setLoading'});
    await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch({type: 'ui/stopLoading'});
    if(result.error) {
        const {status, data} = result.error;
        console.log({status, data});
    }
    return result;
}