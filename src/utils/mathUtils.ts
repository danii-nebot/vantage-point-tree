
// https://gist.github.com/caseyjustus/1166258
export function median(values: Array<number>) {
  values.sort(function(a, b) { return a - b; });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) {
    return values[half];
  } else {
    return (values[half - 1] + values[half]) / 2.0;
  }
}

// http://www.wikihow.com/Calculate-Variance
// $\mbox{2nd-Moment}_{d \in D}$  $(d(p,d)-\mbox{mu})$;
export function secondMoment(values: Array<number>, mu: number = 0) {
  if (isNaN(mu)) {
    return 0;
  }
  let mean: number = values.reduce((prev, curr) => prev + curr - mu) / values.length;
  return values.reduce((prev, curr) => prev + (curr - mu - mean) * (curr - mu - mean)) / (values.length - 1);
}
