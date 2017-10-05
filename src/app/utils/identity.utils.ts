import { GB2260 } from './identity.data';
import { Address } from '../domain'

export interface IdentityInfo {
  addrCode: string;
  birthCode: string;
};

export const extraInfo = (identityNo: string): IdentityInfo => {
  if (!identityNo || identityNo.length !== 18) {
    return;
  }

  const addrPart = identityNo.substr(0, 6);
  const birthPart = identityNo.substr(6, 8);
  return {
    addrCode: addrPart,
    birthCode: birthPart
  };
};

export const getAddr = (addrCode: string): Address => {
  const province = GB2260[addrCode.substr(0, 2) + '0000'];
  const _city = GB2260[addrCode.substr(0, 4) + '00'];
  const _district = GB2260[addrCode];
  const city = _city.replace(new RegExp(province + '|' + '地区', 'g'), '') + '市';
  const district = _district.replace(new RegExp(_city, 'g'), '');

  return {
    province,
    city,
    district
  };
};

export const getBirth = (birthCode: string): string => {
  if (!birthCode || birthCode.length !== 8) {
    return '';
  }
  return birthCode.substr(0, 4) + '-' + birthCode.substr(4, 2) + '-' + birthCode.substr(6, 2);
};

export const isValidAddrCode = (addrCode: string): boolean => {
  return GB2260[addrCode] !== undefined;
};
