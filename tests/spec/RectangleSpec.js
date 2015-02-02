describe("Rectangle", function() {

  var rectangle;

  beforeEach(function() {

    rectangle = new Rectangle(10, 10, 50, 50);

  });

  it("should extend from class Point", function() {

    expect(Rectangle.superclass).toBe(Point);

  });

});