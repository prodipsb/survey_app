/* eslint-disable react-hooks/exhaustive-deps */
import {View} from 'react-native';
import React, {useEffect} from 'react';
import TextComponent from '../../ui/TextComponent';
import InputComponent from '../../ui/InputComponent';
import {FormType} from '../../types/screenComponentsType';
import DropdownComponents from '../../ui/DropdownComponents';
import {
  conditionalData,
  producUnit,
  productInfo,
} from '../../../sampleData/sampleDropdown';
import {
  vatCalculationWithSd,
  vatCalculationWithoutSd,
} from '../../../utils/calculateVat';

const Form3: React.FC<FormType> = ({preview, dispatch, state, errorData}) => {
  useEffect(() => {
    if (state.unitPrice && state.vatParcent) {
      if (state.sdPercent) {
        vatCalculationWithSd(
          Number(state.unitPrice),
          Number(state.vatParcent),
          Number(state.sdPercent),
          dispatch,
        );
      } else {
        vatCalculationWithoutSd(
          Number(state.unitPrice),
          Number(state.vatParcent),
          dispatch,
        );
      }
    }
  }, [state.unitPrice, state.vatParcent, state.sdPercent]);

  return (
    <View className="w-[85%] mx-auto">
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="Monthly average sales"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="123456"
          handleChange={dispatch}
          name="monthlyAverageSales"
          defaultValue={state.monthlyAverageSales}
          preview={preview}
          errorData={errorData}
          keyboardType="number-pad"
        />
      </View>
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="Monthly average customer"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="123456"
          handleChange={dispatch}
          name="monthlyAverageCustomer"
          defaultValue={state.monthlyAverageCustomer}
          preview={preview}
          errorData={errorData}
          keyboardType="number-pad"
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent
          style="text-[18px] text-black"
          content="Online sale available"
        />
        <DropdownComponents
          defaultValue={state.onlineSaleAvailable}
          name="onlineSaleAvailable"
          handleSelect={dispatch}
          data={conditionalData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      {state.onlineSaleAvailable === 'Yes' && (
        <>
          <View className="w-full mb-3 mt-5">
            <TextComponent
              style="text-[18px] text-black"
              content="Online sell percent"
            />
            <InputComponent
              style="text-[18px] text-black border-b"
              placeholder="Example: 12"
              handleChange={dispatch}
              name="onlineSaleParcent"
              defaultValue={state.onlineSaleParcent}
              preview={preview}
              errorData={errorData}
              keyboardType="number-pad"
            />
          </View>
          <View className="w-full mb-3 mt-5">
            <TextComponent
              style="text-[18px] text-black"
              content="Online Order mode"
            />
            <InputComponent
              style="text-[18px] text-black border-b"
              placeholder="Website"
              handleChange={dispatch}
              name="onlineOrderMode"
              defaultValue={state.onlineOrderMode}
              preview={preview}
              type="alphanumericAndSymbol"
              errorData={errorData}
            />
          </View>
        </>
      )}
      <View className="w-full mt-5 mb-3">
        <TextComponent
          style="text-[18px] text-black"
          content="Product information"
        />
        <DropdownComponents
          defaultValue={state.productInfo}
          name="productInfo"
          handleSelect={dispatch}
          data={productInfo}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      {state.productInfo === 'Type' && (
        <>
          <View className="w-full mb-3 mt-5">
            <TextComponent
              style="text-[18px] text-black"
              content="Product name"
            />
            <InputComponent
              style="text-[18px] text-black border-b"
              placeholder="Garments"
              handleChange={dispatch}
              name="productName"
              defaultValue={state.productName}
              preview={preview}
              type="alphanumericAndSymbol"
              errorData={errorData}
            />
          </View>
          <View className="w-full mt-5 mb-3">
            <TextComponent
              style="text-[18px] text-black"
              content="Product unit"
            />
            <DropdownComponents
              defaultValue={state.productUnit}
              name="productUnit"
              handleSelect={dispatch}
              data={producUnit}
              search={false}
              preview={preview}
              errorData={errorData}
            />
          </View>
          <View className="w-full mb-3 mt-5">
            <TextComponent
              style="text-[18px] text-black"
              content="Unit price"
            />
            <InputComponent
              style="text-[18px] text-black border-b"
              placeholder="Example: 123"
              handleChange={dispatch}
              name="unitPrice"
              defaultValue={state.unitPrice}
              preview={preview}
              keyboardType="number-pad"
              errorData={errorData}
            />
          </View>
          <View className="w-full mb-3 mt-5">
            <TextComponent style="text-[18px] text-black" content="VAT %" />
            <InputComponent
              style="text-[18px] text-black border-b"
              placeholder="Example: 5"
              handleChange={dispatch}
              name="vatParcent"
              defaultValue={state.vatParcent}
              preview={preview}
              keyboardType="number-pad"
              errorData={errorData}
            />
          </View>
          <View className="w-full mb-3">
            {preview && state.differentBin !== '' && (
              <TextComponent
                style="text-[18px] text-black mt-5"
                content="SD %"
              />
            )}
            {!preview && (
              <TextComponent
                style="text-[18px] text-black mt-5"
                content="SD %"
              />
            )}
            <InputComponent
              style="text-[18px] text-black border-b"
              placeholder="Example: 2"
              handleChange={dispatch}
              name="sdPercent"
              defaultValue={state.sdPercent}
              preview={preview}
              keyboardType="number-pad"
              errorData={errorData}
              optional={true}
            />
          </View>
          <View className="w-full mb-3 mt-5">
            <TextComponent
              style="text-[18px] text-black"
              content="Price including VAT"
            />
            <TextComponent
              style="text-[18px] text-black mt-4 border-b pb-3"
              content={Number(state.priceIncludingVat)}
            />
          </View>
          <View className="w-full mb-3 mt-5">
            <TextComponent
              style="text-[18px] text-black"
              content="Price excluding VAT"
            />
            <TextComponent
              style="text-[18px] text-black mt-4 border-b pb-3"
              content={Number(state.priceExcludingVat)}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Form3;
