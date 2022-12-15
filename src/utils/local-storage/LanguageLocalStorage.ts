import { LANGUAGES } from '@/store/reducers/language';
import LocalStorage from './LocalStorage';

enum Locals {
  LN = 'LN'
}

class LanguageLocalStorage extends LocalStorage<Locals> {
  private static instance?: LanguageLocalStorage;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!LanguageLocalStorage.instance) {
      LanguageLocalStorage.instance = new LanguageLocalStorage();
    }

    return LanguageLocalStorage.instance;
  }

  public getLn(): LANGUAGES {
    return this.get(Locals.LN);
  }

  public setLn(ln: LANGUAGES) {
    this.set(Locals.LN, ln);
  }
}

export default LanguageLocalStorage;
