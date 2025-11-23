'use client'

import cn from 'classnames'

import styles from './style.module.scss'

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large'
  /** Button contents */
  label: string
  /** Optional click handler */
  onClick?: () => void
}

/** Primary UI component for user interaction */
const Button = ({
  primary = false,
  size = 'medium',
  label,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    className={cn(styles.button, styles[size], {
      [styles.primary]: primary,
      [styles.secondary]: !primary,
    })}
    {...props}
  >
    {label}
  </button>
)

export { Button }
