import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api/',
    credentials: 'include'
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

type ErrorResponse = | string | { title: string } | {errors: string[]} ;

export const baseQueryWithErrorHandling = async (args:string | FetchArgs, api:BaseQueryApi,
    extraOptions: object) => {
    api.dispatch({type: 'ui/setLoading'});
    await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch({type: 'ui/stopLoading'});
    if(result.error) {
        const originalStatus = result.error.status ===  'PARSING_ERROR' && result.error.originalStatus
              ? result.error.originalStatus
              : result.error.status;
        const responseData = result.error.data as ErrorResponse;
        switch (originalStatus) {
            case 400:
                if(typeof responseData === 'string')
                    toast.error(responseData);
                else if('errors' in responseData){
                    throw Object.values(responseData.errors).flat().join(', ');
                    //toast.error(Object.values(responseData.errors).flat().join(', '));
                }
                else
                    toast.error(responseData.title);
                break;
            case 401:
                if(typeof responseData === 'object' && 'title' in responseData)
                toast.error(responseData?.title);
                break;
            case 404:
                if(typeof responseData === 'object' && 'title' in responseData)
                 router.navigate('/not-found');
                break;
            case 500:
                if(typeof responseData === 'object' && 'title' in responseData)
                    router.navigate('/server-error',{state:{error:responseData}})
                //toast.error(responseData?.title);
                break;
            default:
                toast.error('An error occurred');
                break;
        }
    }
    return result;
}