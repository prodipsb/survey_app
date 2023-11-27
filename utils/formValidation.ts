import {exactBin, exactEmail, exactMobile} from '../sampleData/regexdata';
import {ApplicationData} from './../states/state.interface';

export const validation = (state: ApplicationData): string => {
  if (!exactBin.test(state.binNumber)) {
    return 'binNumber';
  }
  if (!exactMobile.test(String(state.binHolderMobile))) {
    return 'binHolderMobile';
  }
  if (state.binHolderEmail !== '') {
    if (!exactEmail.test(state.binHolderEmail)) {
      return 'binHolderEmail';
    }
  }
  if (state.differentBin !== '') {
    if (!exactBin.test(state.differentBin)) {
      return 'differentBin';
    }
  }
  if (state.posSoftwareProvider === 'Personal') {
    if (state.nrbApproved === '') {
      return 'nrbApproved';
    }
  }
  if (state.posSoftwareProvider === 'Third Party') {
    if (state.nrbApproved === '') {
      return 'nrbApproved';
    }
    if (state.thirdPartyName === '') {
      return 'thirdPartyName';
    }
  }
  if (state.onlineSaleAvailable === 'Yes') {
    if (!state.onlineSaleParcent) {
      return 'onlineSaleParcent';
    }
    if (state.onlineOrderMode === '') {
      return 'onlineOrderMode';
    }
  }
  if (state.productInfo === 'Type') {
    if (state.productName === '') {
      return 'productName';
    }
    if (state.productUnit === '') {
      return 'productUnit';
    }
    if (!state.unitPrice) {
      return 'unitPrice';
    }
    if (!state.vatParcent) {
      return 'vatParcent';
    }
    if (!state.priceIncludingVat) {
      return 'priceIncludingVat';
    }
    if (!state.priceExcludingVat) {
      return 'priceExcludingVat';
    }
  }

  const excludedFields = [
    'brandName',
    'nrbApproved',
    'thirdPartyName',
    'onlineSaleParcent',
    'onlineOrderMode',
    'productName',
    'productUnit',
    'unitPrice',
    'vatParcent',
    'sdPercent',
    'priceIncludingVat',
    'priceExcludingVat',
    'differentBin',
    'binHolderEmail',
    'sdPercent',
  ];

  for (const prop in state) {
    if (
      !excludedFields.includes(prop) &&
      state[prop as keyof ApplicationData] === ''
    ) {
      return prop;
    }
  }

  if (state.shopPic === null) {
    return 'shopPic';
  }
  if (state.binCertificate === null) {
    return 'binCertificate';
  }
  if (state.itemList.length === 0) {
    return 'itemList';
  }

  return 'ok';
};
