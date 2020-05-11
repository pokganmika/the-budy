/**
 *
 * @param {string || number} value
 */
export default function countTransfer(value) {
  // if (typeof value === 'string') {
  //   const temp = Number(value);
  //   return transferSupporter(temp);
  // } else if (typeof value === 'number') {
  //   const temp = value;
  //   return transferSupporter(temp);
  // }
  return typeof value === 'string'
    ? transferSupporter(Number(value))
    : transferSupporter(value);
}

const transferSupporter = num => {
  if (num > 999999) {
    const temp = String(num);
  } else if (num > 999) {
    const temp = String(num);
  }
};
