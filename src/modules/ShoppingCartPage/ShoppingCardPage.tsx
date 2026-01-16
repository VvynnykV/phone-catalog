import { useMemo, useState } from 'react';
import styles from './ShoppingCardPage.module.scss';
import { BackButton } from '../shared/BackButton';
import { useGlobalState } from '../../context/store';
import { CheckoutModal } from './components/CheckoutModal/CheckoutModal';
import { useTranslation } from 'react-i18next';
import { InView } from 'react-intersection-observer';
import cn from 'classnames';
import { CartItem } from './components/CartItem/CartItem';

export const ShoppingCartPage = () => {
  //#region state & handlers
  const { cart } = useGlobalState();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalAmount = useMemo(
    () =>
      cart.reduce(
        (initialAmount, cartItem) =>
          initialAmount + cartItem.product.price * cartItem.quantity,
        0,
      ),
    [cart],
  );

  const totalQuantity = useMemo(
    () =>
      cart.reduce((prevValue, curValue) => prevValue + curValue.quantity, 0),
    [cart],
  );
  //#endregion

  return (
    <div className={styles.body}>
      <div className={styles.backBtn}>
        <BackButton />
      </div>

      {cart.length ? (
        <div className={styles.content}>
          <h1 className={styles.cartTitle}>{t('cartTitle')}</h1>

          <ul className={styles.items}>
            {cart.map(item => (
              <InView key={item.id} triggerOnce rootMargin="-100px 0px">
                {({ inView, ref }) => (
                  <li
                    ref={ref}
                    className={cn('fadeEffect', { fadeEffectActive: inView })}
                  >
                    <CartItem cartItem={item} />
                  </li>
                )}
              </InView>
            ))}
          </ul>

          <div className={styles.cardTotal}>
            <div className={styles.cardTotalValues}>
              <span className={styles.cardTotaPrice}>{`$${totalAmount}`}</span>

              <span className={styles.cardTotaItems}>
                {totalQuantity === 1
                  ? `Total for ${totalQuantity} item`
                  : `Total for ${totalQuantity} items`}
              </span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.checkoutBtn}
            >
              {t('checkoutBtn')}
            </button>

            {isModalOpen && <CheckoutModal setIsModalOpen={setIsModalOpen} />}
          </div>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartText}>Your cart is empty</div>

          <img
            src="./img/cart-is-empty.png"
            alt="cart-is-empty"
            className={styles.emptyCartImg}
          />
        </div>
      )}
    </div>
  );
};
