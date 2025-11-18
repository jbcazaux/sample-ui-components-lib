import styles from './style.module.css';

interface Props {
    text: string;
}

const Text = ({text}: Props) => {
    return <p className={styles.text}>{text}</p>
}

export {Text}