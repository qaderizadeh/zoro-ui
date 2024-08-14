'use client';

/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface LinkProps {
  href: string;
  onClick?: () => void;
  isMobile?: boolean;
  target?: boolean;
}

export const LinkComponent = ({
  children,
  onClick,
  href,
  isMobile = false,
  target = true,
}: PropsWithChildren<LinkProps>) => {
  const pathname = usePathname();
  if (href === '/') {
    const activeClassName = isMobile
      ? 'active-mobile-menu-item'
      : 'active-menu-item';

    const isActive = pathname === href;

    return (
      <Link
        href={href}
        onClick={onClick}
        className={isActive ? activeClassName : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <>
      {!target ? (
        <a href={href} rel='noreferrer'>
          {children}
        </a>
      ) : (
        <a href={href} target='_blank' rel='noreferrer'>
          {children}
        </a>
      )}
    </>
  );
};
