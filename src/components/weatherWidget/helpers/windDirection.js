function getWindDirection(d) {
  switch (true) {
    case 0:
    case 360:
      return "N";
    case 90:
      return "E";
    case 180:
      return "S";
    case 270:
      return "W";
    case d > 0 && d < 90:
      return "NE";
    case d > 90 && d < 180:
      return "SE";
    case d > 180 && d < 270:
      return "SW";
    case d > 270 && d < 360:
      return "NW";
    default:
      return "-";
  }
}
export default getWindDirection;
