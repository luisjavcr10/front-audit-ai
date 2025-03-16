/**
 * Type definitions for Google APIs
 */

// Google Picker API types
export interface GooglePickerAction {
  PICKED: string;
  CANCELED: string;
  LOADED: string;
}

export interface GooglePickerViewId {
  DOCS: string;
  FOLDERS: string;
  DOCS_IMAGES: string;
  DOCS_VIDEOS: string;
  DOCS_AUDIO: string;
  SPREADSHEETS: string;
  PRESENTATIONS: string;
  FORMS: string;
  DOCS_UPLOAD: string;
}

// Separar el constructor en un `type`
export type GooglePickerBuilderConstructor = new () => GooglePickerBuilder;

export interface GooglePickerBuilder {
  addView(viewId: string): GooglePickerBuilder;
  setOAuthToken(token: string): GooglePickerBuilder;
  setDeveloperKey(key: string | undefined): GooglePickerBuilder;
  setCallback(callback: (data: GooglePickerResponse) => void): GooglePickerBuilder;
  build(): GooglePicker;
}

export interface GooglePicker {
  setVisible(visible: boolean): void;
}

export interface GooglePickerResponse {
  action: string;
  docs: Array<{ id: string; name: string }>;
}

// Google Identity Services types
export interface GoogleIdentityServices {
  accounts: {
    oauth2: {
      initTokenClient(config: TokenClientConfig): TokenClient;
    };
  };
}

export interface TokenClientConfig {
  client_id: string | undefined;
  scope: string;
  callback: (response: TokenResponse) => void;
}

export interface TokenClient {
  requestAccessToken(): void;
}

export interface TokenResponse {
  access_token: string;
}

// Google API types
export interface GoogleAPI {
  load(api: string, callback: () => void): void;
}

// Window with Google APIs
export interface WindowWithGoogleAPIs extends Window {
  google: {
    picker: {
      Action: GooglePickerAction;
      ViewId: GooglePickerViewId;
      PickerBuilder: GooglePickerBuilderConstructor; // Usar el type aquí
    };
    accounts: {
      oauth2: {
        initTokenClient(config: TokenClientConfig): TokenClient;
      };
    };
  };
  gapi: GoogleAPI;
}
