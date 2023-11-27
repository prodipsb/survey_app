import {ApplicationData} from '../../states/state.interface';
import {UserType} from '../../utils/asyncStorage';

export type FormType = {
  state: ApplicationData;
  preview: boolean;
  dispatch: (action: {
    type: string;
    payload: {
      name: string;
      value: string | Date | string[] | HTMLImageElement | number;
    };
  }) => void;
  errorData: string;
};

export interface ScreenType {
  setUser: (open: UserType | null) => void;
  user?: UserType;
}
