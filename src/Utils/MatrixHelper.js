const MatrixHelper = {
  merge(rowValues, towardsLeft) {
    const totalSize = rowValues.length;
    if (!towardsLeft) {
      rowValues.reverse();
    }
    const nonZeroValues = rowValues.filter(value => value !== 0);
    const rawRowValues = [];
    let previousValue = nonZeroValues.shift();
    while (nonZeroValues.length) {
      const value = nonZeroValues.shift();
      if (value === previousValue) {
        rawRowValues.push(value * 2);
        previousValue = null;
      } else {
        if (previousValue != null) {
          rawRowValues.push(previousValue);
        }
        previousValue = value;
      }
    }
    if (previousValue != null) {
      rawRowValues.push(previousValue);
    }
    if (towardsLeft) {
      return rawRowValues.concat(Array((totalSize - rawRowValues.length)).fill(0));
    }
    rawRowValues.reverse();
    return Array((totalSize - rawRowValues.length)).fill(0).concat(rawRowValues);
  },

  transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
  }
}

module.exports = MatrixHelper;
