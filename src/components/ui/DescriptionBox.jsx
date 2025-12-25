import React from 'react';
import styles from './DescriptionBox.module.css';

function DescriptionBox(props) {
  return (
    <div className={styles.descriptionContainer}>
      <details>
        <summary>
          <span>📝 Description: </span>
          <span className={styles.arrow}>▼</span>
        </summary>
        <div className={styles.descriptionContent}>{props.data}</div>
      </details>
    </div>
  );
};

export default DescriptionBox;