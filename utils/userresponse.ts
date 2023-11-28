import {type} from 'os';

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  role_id: number;
  supervisor_id: string | null;
  reporting_role_id: string | null;
  phone: string | null;
  avatar: string | null;
  user_type: string;
  gender: string | null;
  bio: string | null;
  country: string | null;
  city: string | null;
  division: string | null;
  location: string | null;
  longitude: string | null;
  latitude: string | null;
  status: string | null;
  bin_no: string | null;
  date_of_joining: string | null;
  created_by: string | null;
  role: {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
  };
}

export type SubmitInfo = {
  count: number;
  name: string;
};

export type DeviceTokenType = {
  os: string;
  token: string;
};

export interface ProfileInfo {
  avatar: string;
  id: number;
  name: string;
}

export interface UserType {
  token_type: string;
  access_token: string;
  user: ProfileInfo;
}
