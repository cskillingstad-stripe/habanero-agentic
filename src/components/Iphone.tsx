'use client';

import styles from './Iphone.module.css';

export const Iphone = ({
  children,
  boxShadow,
  width = 390,
}: {
  children?: React.ReactNode;
  boxShadow?: string;
  width?: number;
}) => {
  return (
    <div
      className={styles.root}
      style={
        {
          '--iphone-width': `${width}px`,
          '--iphone-shadow': boxShadow ?? undefined,
        } as React.CSSProperties
      }
    >
      <div className={styles.wrapper}>
        <div className={styles.screen}>
          <div className={styles.content}>{children}</div>
          <div id="iphone-drawer-portal" className={styles.drawerPortal} />
        </div>
      </div>
    </div>
  );
};
