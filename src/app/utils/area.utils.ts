import { city_data } from './area.data';

export const getProvinces = () => {
  const provinces = [];
  for (const province in city_data) {
    provinces.push(province);
  }
  return provinces;
};

export const getCitiesByProvince = (province: string) => {
  const val = city_data[province];
  const cities = [];

  if (!province || !val) {
    return [];
  }

  for (let city in val) {
    cities.push(city);
  }
  return cities;
};

export const getDistrictsByCity = (province: string, city: string) => {
  if (!province || !city || !city_data[province] || !city_data[province][city]) {
    return [];
  }

  return city_data[province][city];
};
