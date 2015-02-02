describe("Point", function() {

  var point;

  beforeEach(function() {

    point = new Point(10,20);

  });

  it("should extend class Basic", function() {

    expect(Point.superclass).toBe(Basic);

  });

});