/** @jsxImportSource @emotion/react */
import { PropsWithChildren } from 'react';
import Link from 'next/link';

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
  if (href[0] === '/') {
    const activeClassName = isMobile
      ? 'active-mobile-menu-item'
      : 'active-menu-item';

    return (
      <Link
        href={href}
        // exact={href === '/'}
        // isActive={(_match, location) => {
        //   // Handle home page
        //   if (location.pathname === "/" && href !== "/") {
        //     return false;
        //   }

        //   // Only match against the first part of the pathname since the sidebar
        //   // nav items represent the top level pages
        //   const formattedPathname = location.pathname
        //     .split("/")
        //     .slice(0, 2)
        //     .join("/");
        //   return !!matchPath(href, formattedPathname);
        // }}
        onClick={onClick}
        // activeClassName={activeClassName}
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

export default Link;
