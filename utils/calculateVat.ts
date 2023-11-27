export const vatCalculationWithSd = (
  unit: number,
  vat: number,
  sd: number,
  dispatch: any,
) => {
  const vatAmount = (unit * vat) / 100;
  const sdAmount = (unit * sd) / 100;
  const includeVat = Number((unit + vatAmount + sdAmount).toFixed(2));
  const excludeVat = Number((includeVat - vatAmount - sdAmount).toFixed(0));
  dispatch({
    type: 'INPUT',
    payload: {
      name: 'priceIncludingVat',
      value: includeVat,
    },
  });
  dispatch({
    type: 'INPUT',
    payload: {
      name: 'priceExcludingVat',
      value: excludeVat,
    },
  });
};

export const vatCalculationWithoutSd = (
  unit: number,
  vat: number,
  dispatch: any,
) => {
  const vatAmount = (unit * vat) / 100;
  const includeVat = Number((unit + vatAmount).toFixed(2));
  const excludeVat = Number((includeVat - vatAmount).toFixed(0));
  dispatch({
    type: 'INPUT',
    payload: {
      name: 'priceIncludingVat',
      value: includeVat,
    },
  });
  dispatch({
    type: 'INPUT',
    payload: {
      name: 'priceExcludingVat',
      value: excludeVat,
    },
  });
};
