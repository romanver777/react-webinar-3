import {memo, useCallback, useEffect, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import Spinner from "../../components/spinner";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  useEffect(() => {
    store.actions.category.setCategories();
  }, []);

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categoryList: state.category.list,
    waiting: state.category.waiting,
  }));

  const callbacks = {
    // Категории
    onCategorySearch: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort, page: 1}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
  };

  const {t} = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <SideLayout padding='medium'>
        <Select options={select.categoryList} value={select.category} onChange={callbacks. onCategorySearch}/>
        <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
        <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
               delay={1000}/>
        <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
      </SideLayout>
    </Spinner>
  )
}

export default memo(CatalogFilter);
