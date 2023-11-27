import {View} from 'react-native';
import React from 'react';
import {FormType} from '../../types/screenComponentsType';
import TextComponent from '../../ui/TextComponent';
import DropdownComponents from '../../ui/DropdownComponents';
import {
  OperatorCoveragedata,
  existanceData,
  mobileOperatordata,
  softwarePrinterData,
  stockKeepingData,
} from '../../../sampleData/sampleDropdown';

const Form4: React.FC<FormType> = ({preview, dispatch, state, errorData}) => {
  return (
    <View className="w-[85%] mx-auto">
      <View className="w-full mt-5 mb-3">
        <TextComponent style="text-[18px] text-black" content="Stock keeping" />
        <DropdownComponents
          defaultValue={state.stockKeeping}
          name="stockKeeping"
          handleSelect={dispatch}
          data={stockKeepingData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent style="text-[18px] text-black" content="POS software" />
        <DropdownComponents
          defaultValue={state.posSoftware}
          name="posSoftware"
          handleSelect={dispatch}
          data={softwarePrinterData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent style="text-[18px] text-black" content="POS printer" />
        <DropdownComponents
          defaultValue={state.posPrinter}
          name="posPrinter"
          handleSelect={dispatch}
          data={softwarePrinterData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent style="text-[18px] text-black" content="PC / Laptop" />
        <DropdownComponents
          defaultValue={state.pcOrLaptop}
          name="pcOrLaptop"
          handleSelect={dispatch}
          data={existanceData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent style="text-[18px] text-black" content="Router" />
        <DropdownComponents
          defaultValue={state.router}
          name="router"
          handleSelect={dispatch}
          data={existanceData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent style="text-[18px] text-black" content="Networking" />
        <DropdownComponents
          defaultValue={state.networking}
          name="networking"
          handleSelect={dispatch}
          data={existanceData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent style="text-[18px] text-black" content="Surveillance" />
        <DropdownComponents
          defaultValue={state.surveillance}
          name="surveillance"
          handleSelect={dispatch}
          data={existanceData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent
          style="text-[18px] text-black"
          content="Select mobile operator"
        />
        <DropdownComponents
          defaultValue={state.mobileOperator}
          name="mobileOperator"
          handleSelect={dispatch}
          data={mobileOperatordata}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      {state.mobileOperator && (
        <View className="w-full mt-5 mb-3">
          <TextComponent
            style="text-[18px] text-black"
            content="Select network coverage"
          />
          <DropdownComponents
            defaultValue={state.operatorCoverage}
            name="operatorCoverage"
            handleSelect={dispatch}
            data={OperatorCoveragedata}
            search={false}
            preview={preview}
            errorData={errorData}
          />
        </View>
      )}
    </View>
  );
};

export default Form4;
