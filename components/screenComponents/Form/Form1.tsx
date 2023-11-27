import {View} from 'react-native';
import React from 'react';
import TextComponent from '../../ui/TextComponent';
import DateInput from '../../ui/DateInput';
import InputComponent from '../../ui/InputComponent';
import DropdownComponents from '../../ui/DropdownComponents';
import {FormType} from '../../types/screenComponentsType';
import {commisionerate} from '../../../sampleData/commissionerate';
import {circle, subdivision} from '../../../sampleData/divisionCircle';

const Form1: React.FC<FormType> = ({preview, dispatch, state, errorData}) => {
  return (
    <View className="w-[85%] mx-auto">
      <View className="w-full h-[70px] mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="Enter the date"
        />
        <DateInput
          preview={preview}
          handleChange={dispatch}
          name="date"
          date={state.date}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent
          style="text-[18px] text-black"
          content="Enter BIN number"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="1234XXXXX-XXXX"
          handleChange={dispatch}
          name="binNumber"
          defaultValue={state.binNumber}
          preview={preview}
          type="binRegex"
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent
          style="text-[18px] text-black"
          content="Select commissionerate"
        />
        <DropdownComponents
          defaultValue={state.commissioneRate}
          name="commissioneRate"
          handleSelect={dispatch}
          data={commisionerate}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mt-5 mb-3">
        <TextComponent
          style="text-[18px] text-black"
          content="Select division"
        />
        <DropdownComponents
          defaultValue={state.division}
          name="division"
          handleSelect={dispatch}
          data={commisionerate}
          search={false}
          preview={preview}
          errorData={errorData}
        />
      </View>
      {state.division && (
        <View className="w-full mt-5 mb-3">
          <TextComponent
            style="text-[18px] text-black"
            content="Select sub-division"
          />
          <DropdownComponents
            defaultValue={state?.subDivision}
            name="subDivision"
            handleSelect={dispatch}
            data={subdivision[state?.division]}
            search={true}
            preview={preview}
            errorData={errorData}
          />
        </View>
      )}
      {state.subDivision && (
        <View className="w-full mt-5 mb-3">
          <TextComponent
            style="text-[18px] text-black"
            content="Select circle"
          />
          <DropdownComponents
            defaultValue={state.circle}
            name="circle"
            handleSelect={dispatch}
            data={circle[state.subDivision]}
            preview={preview}
            search={false}
            errorData={errorData}
          />
        </View>
      )}
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="Enter shop name"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="Shop name"
          handleChange={dispatch}
          name="shopName"
          defaultValue={state.shopName}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mb-3">
        {preview && state.brandName !== '' && (
          <TextComponent
            style="text-[18px] text-black mt-5"
            content="Enter brand name (optional)"
          />
        )}
        {!preview && (
          <TextComponent
            style="text-[18px] text-black mt-5"
            content="Enter brand name (optional)"
          />
        )}
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="Brand name"
          handleChange={dispatch}
          name="brandName"
          defaultValue={state.brandName}
          preview={preview}
          errorData={errorData}
          optional={true}
        />
      </View>
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="Area / Shopping mall"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="Dhaka"
          handleChange={dispatch}
          name="areaOrshoppingMall"
          defaultValue={state.areaOrshoppingMall}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="Business registered address (as per BIN)"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="Dhaka"
          handleChange={dispatch}
          name="businessRegisteredAddress"
          defaultValue={state.businessRegisteredAddress}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="Outlet address"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="Dhaka"
          handleChange={dispatch}
          name="outletAddress"
          defaultValue={state.outletAddress}
          preview={preview}
          errorData={errorData}
        />
      </View>
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="BIN holder's NID"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="12345436"
          handleChange={dispatch}
          name="binHolderNid"
          defaultValue={state.binHolderNid}
          preview={preview}
          keyboardType="number-pad"
          errorData={errorData}
        />
      </View>
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="BIN holder's name"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="Example: Mr. xxx"
          handleChange={dispatch}
          name="binHolderName"
          defaultValue={state.binHolderName}
          preview={preview}
          type="alphanumericAndSymbol"
          errorData={errorData}
        />
      </View>
      <View className="w-full mb-3 mt-5">
        <TextComponent
          style="text-[18px] text-black"
          content="BIN holder's mobile number"
        />
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="01XXXXXXXXX"
          handleChange={dispatch}
          name="binHolderMobile"
          defaultValue={state.binHolderMobile}
          preview={preview}
          type="mobile"
          keyboardType="number-pad"
          errorData={errorData}
        />
      </View>
      <View className="w-full mb-3">
        {preview && state.binHolderEmail !== '' && (
          <TextComponent
            style="text-[18px] text-black mt-5"
            content="BIN holder's email (optional)"
          />
        )}
        {!preview && (
          <TextComponent
            style="text-[18px] text-black mt-5"
            content="BIN holder's email (optional)"
          />
        )}
        <InputComponent
          style="text-[18px] text-black border-b"
          placeholder="example@gmail.com"
          handleChange={dispatch}
          name="binHolderEmail"
          defaultValue={state.binHolderEmail}
          type="email"
          preview={preview}
          errorData={errorData}
          optional={true}
        />
      </View>
    </View>
  );
};

export default Form1;
