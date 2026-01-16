import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './ProductPage.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductList } from '../shared/ProductList/ProductList';
import { useGlobalState } from '../../context/store';
import { capitalizeFirstCharacter } from '../../utils/capitalizeFirstCharacter';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { getPreparedProducts } from '../../utils/getPreparedProducts';
import { SortOptions } from '../../types/SortOptions';
import { Dropdown } from '../shared/Dropdown/Dropdown';
import { PerPageOptions } from '../../types/PerPageOptions';
import { Pagination } from '../shared/Pagination';
import { ProductPageSkeleton } from './ProductPageSkeleton';
import { useTranslation } from 'react-i18next';
import { getSearch } from '../../utils/getSearchWith';
import debounce from 'lodash.debounce';
import cn from 'classnames';

export const ProductPage = () => {
  //#region states & handlers

  // Get global state: products, loading/error states, fetch function, and theme
  const { products, isLoading, errorMessage, fetchProducts, theme } =
    useGlobalState();

  // i18n translation function
  const { t } = useTranslation();

  // React Router: get and set URL search params
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract query params from URL or set defaults
  const query = searchParams.get('query') || '';
  const sort = (searchParams.get('sort') as SortOptions) || SortOptions.Newest;
  const perPage =
    (searchParams.get('perPage') as PerPageOptions) || PerPageOptions.All;
  const page = +(searchParams.get('page') || 1);

  // Local state for the search input value
  const [appliedQuery, setAppliedQuery] = useState(query);

  // Keep the search input in sync with the URL's query param
  useEffect(() => {
    setAppliedQuery(query);
  }, [query]);

  // Debounced function to update the query param in the URL after user stops typing
  const applyQuery = useMemo(
    () =>
      debounce((value: string) => {
        setSearchParams(getSearch({ query: value || null }, searchParams));
      }, 1000),
    [setSearchParams, searchParams],
  );

  // Handle changes in the search input
  const handleQueryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setAppliedQuery(value); // Update local input state immediately

      if (value === '') {
        // If input is cleared, remove query param from URL
        setSearchParams(getSearch({ query: null }, searchParams));

        return;
      }

      // Otherwise, debounce updating the URL
      applyQuery(value);
    },
    [applyQuery, searchParams, setSearchParams],
  );

  // Clear the search input and remove query param from URL
  const clearInput = useCallback(() => {
    setAppliedQuery('');
    setSearchParams(getSearch({ query: null }, searchParams));
  }, [searchParams, setSearchParams]);

  // Get current route path and derive category from it
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];
  const pageTitle = capitalizeFirstCharacter(category);

  // Filter products by current category
  const categoryProducts = useMemo(
    () => products.filter(product => product.category === category),
    [category, products],
  );

  // Apply sorting and search query to filtered products
  const visibleProducts = useMemo(
    () => getPreparedProducts(categoryProducts, sort, query),
    [categoryProducts, sort, query],
  );

  // Determine how many products to show per page
  const perPageInNumbers =
    perPage === PerPageOptions.All ? visibleProducts.length : Number(perPage);

  // Calculate total number of pages for pagination
  const totalPages = useMemo(
    () =>
      perPage === PerPageOptions.All
        ? 1
        : Math.ceil(visibleProducts.length / perPageInNumbers),
    [visibleProducts.length, perPage, perPageInNumbers],
  );

  // Calculate the starting index for the current page
  const startIndex = (page - 1) * perPageInNumbers;

  // Get the products to display on the current page
  const productsOnPage = useMemo(
    () =>
      perPage === PerPageOptions.All
        ? visibleProducts
        : visibleProducts.slice(startIndex, startIndex + perPageInNumbers),
    [perPage, perPageInNumbers, startIndex, visibleProducts],
  );

  //#endregion

  return (
    <div className={styles.content}>
      {isLoading && <ProductPageSkeleton />}

      {!isLoading && errorMessage && (
        <div className={styles.errorWrapper}>
          <div className={styles.errorMessage}>{errorMessage}</div>

          <button
            onClick={fetchProducts}
            className={styles.reloadButton}
            disabled={isLoading}
          >
            Try reload
          </button>
        </div>
      )}

      {!isLoading &&
        !errorMessage &&
        appliedQuery &&
        productsOnPage.length === 0 && (
          <>
            <>
              <div className={styles.breadcrumbs}>
                <Breadcrumbs />
              </div>

              <h1 className={styles.pageTitle}>{pageTitle}</h1>

              <div
                className={styles.productsAmount}
              >{`${categoryProducts.length} ${t('models')}`}</div>

              <div className={styles.controlsWrapper}>
                <div className={styles.dropdowns}>
                  <div className={styles.dropdownSort}>
                    <Dropdown
                      label={t('dropdownLabel.sort')}
                      value={sort}
                      options={Object.values(SortOptions)}
                      paramsToUpdate={value => ({ sort: value })}
                    ></Dropdown>
                  </div>

                  <div className={styles.dropdownPerPage}>
                    <Dropdown
                      label={t('dropdownLabel.items')}
                      value={perPage}
                      options={Object.values(PerPageOptions)}
                      paramsToUpdate={value => ({ perPage: value })}
                    ></Dropdown>
                  </div>
                </div>

                <div className={styles.searchWrapper}>
                  <span
                    className={cn(styles.searchIcon, {
                      [styles.searchIconLight]: theme === 'light',
                    })}
                  ></span>

                  <input
                    type="text"
                    name="search"
                    value={appliedQuery}
                    className={styles.searchInput}
                    onChange={handleQueryChange}
                    placeholder="Search products..."
                  />

                  {appliedQuery && (
                    <button
                      className={styles.searchClear}
                      onClick={clearInput}
                      aria-label="Clear search"
                    />
                  )}
                </div>
              </div>
            </>

            <div className={styles.errorWrapper}>
              <div className={styles.errorMessage}>
                {`There are no ${category} matching the query`}
              </div>
            </div>
          </>
        )}

      {!isLoading &&
        !errorMessage &&
        !appliedQuery &&
        productsOnPage.length === 0 && (
          <div className={styles.errorWrapper}>
            <div className={styles.errorMessage}>
              {`There are no ${category} yet`}
            </div>
          </div>
        )}

      {!isLoading && !errorMessage && productsOnPage.length > 0 && (
        <>
          <div className={styles.breadcrumbs}>
            <Breadcrumbs />
          </div>

          <h1 className={styles.pageTitle}>{pageTitle}</h1>

          <div
            className={styles.productsAmount}
          >{`${categoryProducts.length} ${t('models')}`}</div>

          <div className={styles.controlsWrapper}>
            <div className={styles.dropdowns}>
              <div className={styles.dropdownSort}>
                <Dropdown
                  label={t('dropdownLabel.sort')}
                  value={sort}
                  options={Object.values(SortOptions)}
                  paramsToUpdate={value => ({ sort: value })}
                ></Dropdown>
              </div>

              <div className={styles.dropdownPerPage}>
                <Dropdown
                  label={t('dropdownLabel.items')}
                  value={perPage}
                  options={Object.values(PerPageOptions)}
                  paramsToUpdate={value => ({ perPage: value })}
                ></Dropdown>
              </div>
            </div>

            <div className={styles.searchWrapper}>
              <span
                className={cn(styles.searchIcon, {
                  [styles.searchIconLight]: theme === 'light',
                })}
              ></span>

              <input
                type="text"
                name="search"
                value={appliedQuery}
                className={styles.searchInput}
                onChange={handleQueryChange}
                placeholder="Search products..."
              />

              {appliedQuery && (
                <button
                  className={styles.searchClear}
                  onClick={clearInput}
                  aria-label="Clear search"
                />
              )}
            </div>
          </div>

          <div className={styles.productList}>
            <ProductList products={productsOnPage} />
          </div>

          {perPage !== PerPageOptions.All && totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} />
          )}
        </>
      )}
    </div>
  );
};
