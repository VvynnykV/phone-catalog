import { FC, useMemo } from 'react';

import styles from './ShopByCategory.module.scss';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../../../context/store';
import { useTranslation } from 'react-i18next';

export const ShopByCategory: FC = () => {
  //#region states & handlers
  const { products } = useGlobalState();
  const { t } = useTranslation();

  const { phonesAmount, tabletsAmount, accessoriesAmount } = useMemo(() => {
    const phones = products.filter(
      product => product.category === 'phones',
    ).length;

    const tablets = products.filter(
      product => product.category === 'tablets',
    ).length;

    const accessories = products.filter(
      product => product.category === 'accessories',
    ).length;

    return {
      phonesAmount: phones,
      tabletsAmount: tablets,
      accessoriesAmount: accessories,
    };
  }, [products]);
  //#endregion

  return (
    <section className={styles.content}>
      <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>

      <div className={styles.categories}>
        <Link to="/phones" className={styles.link}>
          <article className={styles.category}>
            <img
              src="./img/shop-by-category/phones.png"
              alt="category photo"
              className={styles.categoryPhoto}
            />

            <div className={styles.info}>
              <h3 className={styles.categoryTitle}>
                {t('categoryTitle.phones')}
              </h3>

              <div className={styles.amount}>
                {t('models', { count: phonesAmount })}
              </div>
            </div>
          </article>
        </Link>

        <Link to="/tablets" className={styles.link}>
          <article className={styles.category}>
            <img
              src="./img/shop-by-category/tablets.png"
              alt="category photo"
              className={styles.categoryPhoto}
            />

            <div className={styles.info}>
              <h3 className={styles.categoryTitle}>
                {t('categoryTitle.tablets')}
              </h3>

              <div className={styles.amount}>
                {t('models', { count: tabletsAmount })}
              </div>
            </div>
          </article>
        </Link>

        <Link to="/accessories" className={styles.link}>
          <article className={styles.category}>
            <img
              src="./img/shop-by-category/accessories.png"
              alt="category photo"
              className={styles.categoryPhoto}
            />

            <div className={styles.info}>
              <h3 className={styles.categoryTitle}>
                {t('categoryTitle.accessories')}
              </h3>

              <div className={styles.amount}>
                {t('models', { count: accessoriesAmount })}
              </div>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
};
