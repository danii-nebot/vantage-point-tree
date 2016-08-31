export module MathUtils {

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
}
