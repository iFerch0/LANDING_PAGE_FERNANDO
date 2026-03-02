'use client';

import React from 'react';
import NavIcons from './navIcons';
import styles from '../Navbar.module.css';

interface NavbarCartButtonProps {
  cartItems: number;
  mounted: boolean;
  onClick: () => void;
}

export function NavbarCartButton({ cartItems, mounted, onClick }: NavbarCartButtonProps) {
  return (
    <button className={styles.cartBtn} onClick={onClick} aria-label="Ver carrito">
      {NavIcons.shoppingBag}
      {mounted && cartItems > 0 && <span className={styles.cartBadge}>{cartItems}</span>}
    </button>
  );
}
