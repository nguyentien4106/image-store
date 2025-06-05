import { api } from "@/config/api";
import { buildQueryParams } from "@/helpers";
import { AppResponse, PaginatedResult } from "@/types";
import { PaginationRequest } from "@/types";
import { AddChannelPayload, Channel } from "@/types/store";


const getStores = async (request: PaginationRequest): Promise<AppResponse<PaginatedResult<Channel>>> => {
    try {
        const response = await api.get('/stores' + buildQueryParams(request));
        return response.data;
    } catch (error) {
        throw error;
    }
}


const addStore = async (payload: AddChannelPayload): Promise<AppResponse<Channel>> => {
    try{
        const response = await api.post('/stores', payload);
        return response.data;
    } catch (error) {
        throw error;
    }

};

const deleteStore = async (id: string): Promise<AppResponse<Channel>> => {
    try{
        const response = await api.delete(`/stores/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const storeApi = {
    getStores,
    addStore,
    deleteStore
}