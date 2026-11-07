// Floating "eye follow" navbar, rebuilt from the Framer component of the same name.
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'motion/react';
import FollowEyes from './FollowEyes';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { LOGO, NAV_CTA, NAV_LINKS } from './navContent';

const PHONE_QUERY = '(max-width: 809px)';
const ABOVE_PHONE_QUERY = '(min-width: 810px)';
const TABLET_QUERY = '(max-width: 1199px)';
const SPRING = { type: 'spring', bounce: 0.2, duration: 0.4 };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isPhone = useMediaQuery(PHONE_QUERY);
  const isTablet = useMediaQuery(TABLET_QUERY);

  // The drawer only exists on phones; close it if the viewport grows
  useEffect(() => {
    if (!isPhone) setIsOpen(false);
  }, [isPhone]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <Header>
      <Bar aria-label="Main">
        <Row>
          <HomeLink href={LOGO.href} aria-label={LOGO.label}>
            <FollowEyes eyeSize={isTablet && !isPhone ? 22 : 26} />
          </HomeLink>

          <Right>
            <DesktopOnly>
              {NAV_LINKS.map(({ label, href }) => (
                <NavLink key={href} href={href}>
                  {label}
                </NavLink>
              ))}
              <Spacer aria-hidden="true" />
              <CtaLink href={NAV_CTA.href} data-cta>
                {NAV_CTA.label}
              </CtaLink>
            </DesktopOnly>

            <MenuButton
              type="button"
              aria-expanded={isOpen}
              aria-controls="nav-drawer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsOpen((open) => !open)}
            >
              <MenuLine animate={isOpen ? { top: 19, rotate: 45 } : { top: 15, rotate: 0 }} transition={SPRING} />
              <MenuLine animate={isOpen ? { top: 19, rotate: -45 } : { top: 23, rotate: 0 }} transition={SPRING} />
            </MenuButton>
          </Right>
        </Row>

        <AnimatePresence initial={false}>
          {isOpen && (
            <Drawer
              id="nav-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={SPRING}
            >
              <DrawerInner>
                <DrawerLinks>
                  {NAV_LINKS.map(({ label, href }) => (
                    <NavLink key={href} href={href} onClick={close}>
                      {label}
                    </NavLink>
                  ))}
                </DrawerLinks>
                <CtaLink href={NAV_CTA.href} data-cta onClick={close} $isBlock>
                  {NAV_CTA.label}
                </CtaLink>
              </DrawerInner>
            </Drawer>
          )}
        </AnimatePresence>
      </Bar>
    </Header>
  );
};

const Header = styled.header`
  position: fixed;
  top: var(--nav-offset);
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  font-family: var(--font-body);
  pointer-events: none;

  @media ${PHONE_QUERY} {
    top: 12px;
    padding: 0 16px;
  }
`;

const Bar = styled.nav`
  position: relative;
  width: fit-content;
  max-width: 100%;
  padding: 10px;
  border: 1px solid var(--nav-border);
  border-radius: 999px;
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 12px 32px -8px rgba(0, 0, 0, 0.22);
  overflow: clip;
  pointer-events: auto;

  @media ${PHONE_QUERY} {
    width: 100%;
    padding: 8px;
    border-radius: 28px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;

  @media ${PHONE_QUERY} {
    gap: 16px;
  }
`;

const HomeLink = styled.a`
  display: flex;
  align-items: center;
  padding: 0 4px 0 10px;
  border-radius: 999px;

  &:focus-visible {
    outline: 2px solid var(--nav-ink);
    outline-offset: 4px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
`;

const DesktopOnly = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media ${PHONE_QUERY} {
    display: none;
  }
`;

const NavLink = styled.a`
  padding: 9px 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  color: var(--nav-ink-muted);
  text-decoration: none;
  transition: color 0.22s cubic-bezier(0.25, 0.1, 0.25, 1);

  &:hover {
    color: var(--nav-ink);
  }

  &:focus-visible {
    color: var(--nav-ink);
    outline: 2px solid var(--nav-ink);
    outline-offset: -2px;
  }
`;

const Spacer = styled.span`
  width: 4px;
  height: 4px;
`;

const CtaLink = styled.a`
  display: inline-flex;
  justify-content: center;
  padding: 11px 17px;
  width: ${({ $isBlock }) => ($isBlock ? '100%' : 'auto')};
  border-radius: 999px;
  background: var(--nav-cta-fill);
  color: var(--nav-cta-ink);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  text-decoration: none;
  transition: background-color 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform var(--duration-fast) var(--ease-out-expo);

  &:hover {
    background: var(--nav-cta-hover);
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid var(--nav-ink);
    outline-offset: 2px;
  }
`;

const MenuButton = styled.button`
  display: block;
  position: relative;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;

  @media ${ABOVE_PHONE_QUERY} {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid var(--nav-ink);
    outline-offset: -2px;
  }
`;

const MenuLine = styled(motion.span)`
  position: absolute;
  left: 11px;
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background: var(--nav-ink);
`;

const Drawer = styled(motion.div)`
  overflow: hidden;
`;

const DrawerInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 0 8px;
`;

const DrawerLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export default Navbar;
