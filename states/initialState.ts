import {ApplicationData} from './state.interface';

export const initialState: ApplicationData = {
  date: new Date(),
  binNumber: '',
  commissioneRate: '',
  division: '',
  circle: '',
  shopName: '',
  brandName: '',
  areaOrshoppingMall: '',
  businessRegisteredAddress: '',
  outletAddress: '',
  binHolderNid: null,
  binHolderName: '',
  binHolderMobile: null,
  binHolderEmail: '',
  businessStartDate: new Date(),
  category: '',
  subCategory: '',
  latitude: 0,
  longitude: 0,
  numberOfOutlet: null,
  numberOfCounter: null,
  differentBin: '',
  transactionType: '',
  posSoftwareProvider: '',
  nrbApproved: '',
  thirdPartyName: '',
  monthlyAverageSales: null,
  monthlyAverageCustomer: null,
  onlineSaleAvailable: '',
  onlineSaleParcent: null,
  onlineOrderMode: '',
  productInfo: '',
  productName: '',
  productUnit: '',
  unitPrice: null,
  vatParcent: null,
  sdPercent: null,
  priceIncludingVat: 0,
  priceExcludingVat: 0,
  stockKeeping: '',
  posSoftware: '',
  posPrinter: '',
  pcOrLaptop: '',
  mushak: '',
  router: '',
  networking: '',
  surveillance: '',
  mobileOperator: '',
  operatorCoverage: '',
  weeklyHoliday: '',
  shopPic: null,
  binCertificate: null,
  itemList: [],
};
