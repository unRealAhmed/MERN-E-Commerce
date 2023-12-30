import { useState } from "react";
import styles from "./PriceFilter.module.css";

function PriceFilter() {
  const [minVal, setMinVal] = useState(500);
  const [maxVal, setMaxVal] = useState(4500);

  const maxRange = 5000;
  const minPercentage = (minVal / maxRange) * 100;
  const maxPercentage = (maxVal / maxRange) * 100;

  const handleMaxInput = (e) => {
    if (minVal + 100 >= e.target.value) return setMaxVal(+minVal + 100);

    setMaxVal(+e.target.value);
  };

  const handleMinInput = (e) => {
    if (100 >= e.target.value) return setMinVal(100);
    if (+e.target.value + 100 >= maxVal) return setMinVal(maxRange - 100);

    setMinVal(+e.target.value);
  };

  return (
    <div className={styles.priceContainer}>
      <h3 className={styles.pricetag}>Price</h3>

      <div className={styles.pricebody}>
        <div className={styles.rangInput}>
          <div
            className={styles.progress}
            style={{
              left: `${minPercentage}%`,
              right: `${100 - maxPercentage}%`,
            }}
          ></div>

          <input
            className={styles.minRange}
            type="range"
            max={maxRange}
            min="0"
            value={minVal}
            onChange={handleMinInput}
          />

          <input
            className={styles.maxRange}
            onChange={handleMaxInput}
            type="range"
            max={maxRange}
            min="0"
            value={maxVal}
          />
        </div>

        <div className={styles.rangPrice}>
          <span>{minVal}$</span>
          <span>{maxVal}$</span>
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;
