import { createContainer } from "unstated-next";
import { AxiosUtil } from "../applications/utils/axios-util";
import { ItemCreateParams, ItemUpdateParams } from "../types/request";
import { ItemVO } from "../types/vo";

export const useTodoStore = () => {
  const loadItems = async (): Promise<ItemVO[]> => {
    const axios = AxiosUtil.createBase();
    const response = await axios.get<ItemVO[]>(`/items`).catch((e) => {
      return { data: [] };
    });
    return response.data;
  };
  const countItem = async (): Promise<number> => {
    const axios = AxiosUtil.createBase();
    const response = await axios.get<number>(`/items/count`).catch((e) => {
      return { data: -1 };
    });
    return response.data;
  };
  const createItem = async (
    params: ItemCreateParams
  ): Promise<ItemVO | undefined> => {
    const axios = AxiosUtil.createBase();
    const response = await axios.post<ItemVO>("/items", params).catch((e) => {
      return { data: undefined };
    });
    return response.data;
  };
  const updateItem = async (
    id: string,
    params: ItemUpdateParams
  ): Promise<ItemVO | undefined> => {
    const axios = AxiosUtil.createBase();
    const response = await axios
      .put<ItemVO>(`/items/${id}`, params)
      .catch((e) => {
        return { data: undefined };
      });
    return response.data;
  };
  const deleteItem = async (id: string): Promise<boolean> => {
    const axios = AxiosUtil.createBase();
    const response = await axios.delete(`/items/${id}`).catch((e) => {
      return { status: 500 };
    });
    return response.status === 204;
  };
  const searchItems = async(keyword: string): Promise<ItemVO[]> => {
    const axios = AxiosUtil.createBase();
    const response = await axios.get<ItemVO[]>(`/items/search?keyword=${keyword}`).catch((e) => {
      return { data: [] };
    });
    return response.data;
  }

  return {
    loadItems,
    countItem,
    createItem,
    updateItem,
    deleteItem,
    searchItems,
  };
};

export const TodoStore = createContainer(useTodoStore);
