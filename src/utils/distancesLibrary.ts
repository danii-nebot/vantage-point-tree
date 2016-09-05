// http://www.movable-type.co.uk/scripts/latlong.html
// http://stackoverflow.com/questions/5260423/torad-javascript-function-throwing-error/21623256#21623256
export function haversineDistance(p1, p2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (p2.lat - p1.lat) * Math.PI / 180;  // deg2rad below
  var dLon = (p2.lon - p1.lon) * Math.PI / 180;

  var a =
    0.5 - Math.cos(dLat) / 2 +
    Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
    (1 - Math.cos(dLon)) / 2;

  return R * 2 * Math.asin(Math.sqrt(a));
}