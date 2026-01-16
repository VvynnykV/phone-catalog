/* eslint-disable react/display-name */
import { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Cart } from '../../../../types/Cart';
import { useGlobalState } from '../../../../context/store';
import styles from './CartItem.module.scss';

type Props = {
  cartItem: Cart;
};

export const CartItem: FC<Props> = memo(({ cartItem }) => {
  //#region state & handlers
  const { setCart } = useGlobalState();

  const removeItem = useCallback(
    (selectedItemId: string) => {
      setCart(prevCart => prevCart.filter(item => item.id !== selectedItemId));
    },
    [setCart],
  );

  const updateQuantity = useCallback(
    (selectedItemId: string, newQuantity: number) => {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === selectedItemId && item.quantity > 0
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    },
    [setCart],
  );
  //#endregion

  return (
    <li className={styles.item}>
      <div className={styles.itemPart1}>
        <button
          onClick={() => removeItem(cartItem.id)}
          className={styles.itemBtnRemove}
        >
          <span className={styles.itemIconRemove}></span>
        </button>

        <Link
          to={`/${cartItem.product.category}/${cartItem.product.itemId}`}
          className={styles.itemLink}
        >
          <div className={styles.imgWrapper}>
            <img
              src={cartItem.product.image}
              alt={`product image ${cartItem.product.name}`}
              className={styles.itemImg}
            />
          </div>

          <div className={styles.itemName}>{cartItem.product.name}</div>
        </Link>
      </div>

      <div className={styles.itemPart2}>
        <div className={styles.itemCounter}>
          <button
            onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
            className={styles.itemCounterBtn}
            disabled={cartItem.quantity === 1}
          >
            <span className={styles.itemCounterIconMinus}></span>
          </button>

          <span className={styles.itemCounterValue}>{cartItem.quantity}</span>

          <button
            onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
            className={styles.itemCounterBtn}
          >
            <span className={styles.itemCounterIconPlus}></span>
          </button>
        </div>

        <div className={styles.itemPrice}>{`$${cartItem.product.price}`}</div>
      </div>
    </li>
  );
});
