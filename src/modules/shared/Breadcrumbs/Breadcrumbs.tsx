import { FC, Fragment } from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line max-len
import { capitalizeFirstCharacter } from '../../../utils/capitalizeFirstCharacter';
import cn from 'classnames';
import { useGlobalState } from '../../../context/store';

export const Breadcrumbs: FC = () => {
  const { theme } = useGlobalState();
  const location = useLocation();
  // .filter(Boolean) removes all "falsy" values
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link
            to="/"
            className={cn(styles.iconHome, {
              [styles.iconHomeLight]: theme === 'light',
            })}
          ></Link>
        </li>

        {pathnames.map((pathname, index) => {
          const isLast = pathnames.length - 1 === index;
          const path = `/${pathnames.slice(0, index + 1).join('/')}`;
          const pathLabel = pathname
            .split('-')
            .map(name => capitalizeFirstCharacter(name))
            .join(' ');

          return (
            <Fragment key={pathname}>
              <span className={styles.iconArrow}></span>

              <li
                className={cn(styles.navItem, {
                  [styles.navItemLabel]: isLast,
                })}
              >
                {isLast ? (
                  <span className={styles.label}>{pathLabel}</span>
                ) : (
                  <Link to={path}>{pathLabel}</Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};
