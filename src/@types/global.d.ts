import { compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __WB_MANIFEST: (string)[];
    dataLayer: {
      push: (args: { event: string; formName: string; noItems?: string }) => void;
    };
  }
}
