class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

Point.name = 'point';

var point = new Point(2, 3);
