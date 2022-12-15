import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectLn } from '@/store/selectors/language';
import Authorization from '@/utils/language/Authorization';
import MePage from '@/utils/language/MePage';
import Navigation from '@/utils/language/Navigation';
import InputsPages from '@/utils/language/InputsPages';
import Common from '@/utils/language/Common';

export default () => {
  const ln = useSelector(selectLn);

  const authorization = useMemo(() => new Authorization(ln), [ln]);
  const mePage = useMemo(() => new MePage(ln), [ln]);
  const navigation = useMemo(() => new Navigation(ln), [ln]);
  const inputsPages = useMemo(() => new InputsPages(ln), [ln]);
  const common = useMemo(() => new Common(ln), [ln]);

  return [{
    authorization,
    mePage,
    navigation,
    inputsPages,
    common,
  }];
};
