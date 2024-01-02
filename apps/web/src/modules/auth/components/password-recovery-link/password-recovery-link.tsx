import { cn } from '@/shared/lib/utils';
import { ClassValue } from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FrownIcon } from 'lucide-react';
import Link from 'next/link';

type PasswordRecoveryLinkProps = {
  className?: ClassValue;
};

export function PasswordRecoveryLink({ className }: PasswordRecoveryLinkProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        data-testid="password-recovery-link"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <Link
          className={cn('flex items-center text-sm', className)}
          href="/recuperar-senha"
        >
          Esqueci minha senha
          <m.div
            aria-hidden="true"
            variants={{
              rest: {
                x: -3,
                opacity: 0,
                transition: { duration: 0.15, ease: 'easeIn' },
              },
              hover: {
                x: 6,
                opacity: 1,
                transition: { duration: 0.1, ease: 'easeOut' },
              },
            }}
          >
            <FrownIcon size={14} />
          </m.div>
        </Link>
      </m.div>
    </LazyMotion>
  );
}
