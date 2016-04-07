export default class Ranges {
  constructor(lowest, low, high, highest) {
    this.lowest = lowest;
    this.low = low;
    this.high = high;
    this.highest = highest;
  }

  isWarning(data) {
    return data !== null && 
      (data >= this.high && data <= this.highest ||  
      data <= this.low &&  data >= this.lowest);
  }

  isSafe(data) {
    return data !== null &&
      (data > this.low && data < this.high);
  }

  isDanger(data) {
    return data !== null &&
      (data > this.highest ||  data < this.lowest);
  }
}