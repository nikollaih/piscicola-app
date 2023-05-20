import { ProductTypesServices, ProductiveUnitsServices } from "../services";

export const getProductType = async (token) => {
  try {
    let response = await ProductTypesServices.get(token);
    return response.status == 200 ? await response.json() : [];
  } catch (error) {
    return [];
  }
};

export const getProductiveUnit = async (token) => {
  try {
    let response = await ProductiveUnitsServices.get(token);
    return response.status == 200 ? await response.json() : [];
  } catch (error) {
    return [];
  }
};