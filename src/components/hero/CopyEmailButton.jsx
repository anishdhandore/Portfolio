import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'motion/react';
import { FiCopy, FiCheck } from 'react-icons/fi';

const CONFIRM_MS = 2000;

const CopyEmailButton = ({ email, className }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return undefined;
    const id = setTimeout(() => setIsCopied(false), CONFIRM_MS);
    return () => clearTimeout(id);
  }, [isCopied]);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
    } catch (error) {
      // Clipboard blocked (insecure context or permissions): open the mail client instead
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <Button type="button" onClick={handleClick} aria-label={`Copy email ${email}`} className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isCopied ? 'copied' : 'idle'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {isCopied ? (
            <>
              Email copied <FiCheck aria-hidden="true" />
            </>
          ) : (
            <>
              {email} <FiCopy aria-hidden="true" />
            </>
          )}
        </motion.span>
      </AnimatePresence>
      <span role="status" className="visually-hidden">
        {isCopied ? 'Email copied to clipboard' : ''}
      </span>
    </Button>
  );
};

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0 1.125rem;
  border: 0;
  border-radius: var(--radius-control);
  background: var(--color-ink);
  color: var(--color-paper);
  font: 500 var(--text-sm) / 1 var(--font-body);
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out-expo),
    background-color var(--duration-fast) ease;

  &:hover { background: #2a2a2a; }
  &:active { transform: scale(0.97); }
  &:focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 3px;
  }
`;

export default CopyEmailButton;
