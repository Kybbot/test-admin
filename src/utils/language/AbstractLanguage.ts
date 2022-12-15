import { LANGUAGES } from '@/store/reducers/language';

type LanguagesEnumValues = keyof typeof LANGUAGES;
type ISelector = { [key in LanguagesEnumValues]: string };

export default abstract class AbstractLanguage {
  constructor(private ln: LanguagesEnumValues) {}

  protected getText(selector: ISelector) {
    return selector[this.ln];
  }
}
