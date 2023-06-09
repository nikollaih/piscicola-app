import {
  ProductTypesServices,
  ProductiveUnitsServices,
  PondsServices,
  FishServices,
  TasksServices,
  EmployeesServices,
  UsersServices
} from "../services";

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

export const getPonds = async (user) => {
  try {
    let response = await PondsServices.get(user.token, user.productive_unit.id);
    if (response.status == 401) return { is_logged: false };
    return response.status == 200
      ? await response.json()
      : { data: [] };
  } catch (error) {
    return { data: [] };
  }
};

export const getFish = async (user) => {
  try {
    let response = await FishServices.get(user);
    if (response.status == 401) return { is_logged: false };
    return response.status == 200
      ? await response.json()
      : { data: [] };
  } catch (error) {
    return { data: [] };
  }
};

export const getTasks = async (user) => {
  try {
    let response = await TasksServices.get(user);
    if (response.status == 401) return { is_logged: false };
    return response.status == 200
      ? await response.json()
      : { data: [] };
  } catch (error) {
    return { data: [] };
  }
};

export const getEmployees = async (user) => {
  try {
    let response = await EmployeesServices.get(user);
    if (response.status == 401) return { is_logged: false };
    return response.status == 200
      ? await response.json()
      : { data: [] };
  } catch (error) {
    return { data: [] };
  }
};

export const getUserTypes = async (user) => {
  try {
    let response = await UsersServices.getUserTypes(user.token);
    if (response.status == 401) return { is_logged: false };
    return response.status == 200
      ? await response.json()
      : [];
  } catch (error) {
    return [];
  }
};
