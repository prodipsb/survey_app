import {actionTypes} from './actionTypes';
import {ApplicationData} from './state.interface';

export const reducer = (state: ApplicationData, action: any) => {
  switch (action.type) {
    case actionTypes.INPUT:
      switch (action.payload.name) {
        case 'division':
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['subDivision']: '',
            ['circle']: '',
          };
        case 'subDivision':
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['circle']: '',
          };
        case 'category':
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['subCategory']: '',
          };
        case 'posSoftwareProvider':
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['thirdPartyName']: '',
            ['nrbApproved']: '',
          };
        case 'onlineSaleAvailable':
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['onlineSaleParcent']: null,
            ['onlineOrderMode']: '',
          };
        case 'productInfo':
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['productName']: '',
            ['productUnit']: '',
            ['unitPrice']: null,
            ['vatParcent']: null,
            ['sdPercent']: null,
            ['priceIncludingVat']: 0,
            ['priceExcludingVat']: 0,
          };
        case 'mobileOperator':
          return {
            ...state,
            [action.payload.name]: action.payload.value,
            ['operatorCoverage']: '',
          };
        default:
          return {
            ...state,
            [action.payload.name]: action.payload.value,
          };
      }
    default:
      return state;
  }
};
