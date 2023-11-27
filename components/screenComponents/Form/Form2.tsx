import {View} from 'react-native';
import React from 'react';
import {FormType} from '../../types/screenComponentsType';
import TextComponent from '../../ui/TextComponent';
import InputComponent from '../../ui/InputComponent';
import DropdownComponents from '../../ui/DropdownComponents';
import DateInput from '../../ui/DateInput';
import {
  conditionalData,
  posSoftwareProviderData,
  transactionData,
} from '../../../sampleData/sampleDropdown';
import {
  businessCategories,
  businessSubCategories,
} from '../../../sampleData/businessCategories';

const Form2: React.FC<FormType> = ({state, dispatch, preview, errorData}) => {
  return (
    <View className="w-[85%] mx-auto">
      <View className="w-full h-[70px] mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="Business start date"
        />
        <DateInput
          preview={preview}
          handleChange={dispatch}
          name="businessStartDate"
          date={state.businessStartDate}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent
          style="text-[18px] text-black"
          content="Select business category"
        />
        <DropdownComponents
          defaultValue={state.category}
          name="category"
          handleSelect={dispatch}
          data={businessCategories}
          search={true}
          preview={preview}
          errorData={errorData}
        />
      </View>
      {state?.category && (
        <View className="w-full mt-5 mb-3">
          <TextComponent
            style="text-[18px] text-black"
            content="Select business subcategory"
          />
          <DropdownComponents
            defaultValue={state.subCategory}
            name="subCategory"
            handleSelect={dispatch}
            data={businessSubCategories[state?.category]}
            search={true}
            preview={preview}
            errorData={errorData}
          />
        </View>
      )}
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="Number of outlet"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="example: 2"
          handleChange={dispatch}
          name="numberOfOutlet"
          defaultValue={state.numberOfOutlet}
          preview={preview}
          errorData={errorData}
          keyboardType="number-pad"
        />
      </View>
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="Number of counter"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="example: 2"
          handleChange={dispatch}
          name="numberOfCounter"
          defaultValue={state.numberOfCounter}
          preview={preview}
          errorData={errorData}
          keyboardType="number-pad"
        />
      </View>
      <View className="w-full mb-3">
        {preview && state.differentBin !== '' && (
          <TextComponent
            style="text-[18px] text-black mt-5"
            content="Different BIN (if any)"
          />
        )}
        {!preview && (
          <TextComponent
            style="text-[18px] text-black mt-5"
            content="Different BIN (if any)"
          />
        )}
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="example:1234XXXXX-XXXX"
          handleChange={dispatch}
          name="differentBin"
          defaultValue={state.differentBin}
          preview={preview}
          type="binRegex"
          errorData={errorData}
          optional={true}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent
          style="text-[18px] text-black"
          content="Transaction type"
        />
        <DropdownComponents
          defaultValue={state.transactionType}
          name="transactionType"
          handleSelect={dispatch}
          data={transactionData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent style="text-[18px] text-black" content="Mushak 6.3" />
        <DropdownComponents
          defaultValue={state.mushak}
          name="mushak"
          handleSelect={dispatch}
          data={conditionalData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent
          style="text-[18px] text-black"
          content="POS softwsre provider"
        />
        <DropdownComponents
          defaultValue={state.posSoftwareProvider}
          name="posSoftwareProvider"
          handleSelect={dispatch}
          data={posSoftwareProviderData}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      {state.posSoftwareProvider === 'Personal' && (
        <View className="w-full mt-5 mb-3">
          <TextComponent
            style="text-[18px] text-black"
            content="NRB approved"
          />
          <DropdownComponents
            defaultValue={state.nrbApproved}
            name="nrbApproved"
            handleSelect={dispatch}
            data={conditionalData}
            search={false}
            preview={preview}
            errorData={errorData}
          />
        </View>
      )}
      {state.posSoftwareProvider === 'Third Party' && (
        <>
          <View className="w-full mb-3 mt-5">
            <TextComponent
              style="text-[18px] text-black"
              content="Third party name"
            />
            <InputComponent
              style="text-[18px] text-black border-b"
              placeholder="Rashed"
              handleChange={dispatch}
              name="thirdPartyName"
              defaultValue={state.thirdPartyName}
              preview={preview}
              type="alphanumericAndSymbol"
              errorData={errorData}
            />
          </View>
          <View className="w-full mt-5 mb-3">
            <TextComponent
              style="text-[18px] text-black"
              content="NRB approved"
            />
            <DropdownComponents
              defaultValue={state.nrbApproved}
              name="nrbApproved"
              handleSelect={dispatch}
              data={conditionalData}
              search={false}
              preview={preview}
              errorData={errorData}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Form2;
