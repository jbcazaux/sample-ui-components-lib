'use client'

import { useState } from 'react';
import styles from './style.module.scss';

interface Props {
  label: string;

}   

const Button = ({label}: Props) => {
  const [count, setCount] = useState<number>(0)

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  setCount(prev => prev + 1)
  e.preventDefault()

}

  return <button onClick={handleClick} className={styles.button}>{label} - {count}</button>
}

export {Button}
