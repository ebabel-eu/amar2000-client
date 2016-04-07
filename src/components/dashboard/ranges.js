export default class Ranges {
  constructor(lowest, low, high, highest) {
    this.lowest = lowest;
    this.low = low;
    this.high = high;
    this.highest = highest;

  }

  statusText(data, type){
    let text = '';

    switch (type) {
      case 'co2':
        if (this.isTooLow(data)) { text = 'very good'; }
        if (this.isLow(data)) { text = 'good'; }
        if (this.isSafe(data)) { text = 'normal'; }
        if (this.isHigh(data)) { text = 'ventilate'; }
        if (this.isTooHigh(data)) { text = 'open all windows'; }
        break;
      case 'temperature':
        if (this.isTooLow(data)) { text = 'too cold'; }
        if (this.isLow(data)) { text = 'cold'; }
        if (this.isSafe(data)) { text = 'ideal'; }
        if (this.isHigh(data)) { text = 'hot'; }
        if (this.isTooHigh(data)) { text = 'too hot'; }
        break;
      case 'humidity':
        if (this.isTooLow(data)) { text = 'too dry'; }
        if (this.isLow(data)) { text = 'dry'; }
        if (this.isSafe(data)) { text = 'ideal'; }
        if (this.isHigh(data)) { text = 'humid'; }
        if (this.isTooHigh(data)) { text = 'too humid'; }

        break;
      case 'noise':
        if (this.isTooLow(data)) { text = 'no noise'; }
        if (this.isLow(data)) { text = 'silent'; }
        if (this.isSafe(data)) { text = 'quiet'; }
        if (this.isHigh(data)) { text = 'noisy'; }
        if (this.isTooHigh(data)) { text = 'too noisy'; }
        break;
      default:
        throw new Error('Unexpected type');
        break;
    }

    return text
  }

  isWarning(data) {
    return data !== null && 
      (this.isHigh(data) || this.isLow(data));
  }

  isLow(data) {
    return data !== null &&
      (data <= this.low &&  data >= this.lowest);
  }

  isHigh(data) {
    return data !== null &&
      (data >= this.high && data <= this.highest);
  }

  isSafe(data) {
    return data !== null &&
      (data > this.low && data < this.high);
  }

  isDanger(data) {
    return data !== null &&
      (this.isTooHigh(data) ||  this.isTooLow(data));
  }

  isTooLow(data) {
    return data !== null && data <= this.lowest;
  }

  isTooHigh(data) {
    return data !== null && data >= this.highest;
  }


}