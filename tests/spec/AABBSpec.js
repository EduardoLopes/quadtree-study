
describe("AABB", function() {

  var aabb;

  beforeEach(function() {
    aabb = new AABB(10,10,10,10);
  });

  it("should extend from class Rectangle", function() {

    expect(AABB.superclass).toBe(Rectangle);

  });

  it("#intersectsAABB should intersect another AABB object", function() {

    expect(aabb.intersectsAABB(new AABB(5,5,10,10))).toBeTruthy();

  });

  it("#intersectsAABB should intersect a Rectangle object", function() {

    expect(aabb.intersectsAABB(new Rectangle(5,5,10,10))).toBeTruthy();

  });

  it("#intersectsAABB should not intersect", function() {

    expect(aabb.intersectsAABB(new AABB(20,10,10,10))).toBeFalsy();

  });

  it("#intersectRect should intersect", function() {

    expect(aabb.intersectRect(15,15,20,20)).toBeTruthy();

  });

  it("#getCenterX should return the x axis of the center of the rectangle", function() {

    expect(aabb.getCenterX()).toBe(15);

  });

  it("#getCenterY should return the y axis of the center of the rectangle", function() {

    expect(aabb.getCenterY()).toBe(15);

  });

  it("#getHalfXDimention should return the half width dimention of a rectangle", function() {

    expect(aabb.getHalfXDimention()).toBe(5);

  });

    it("#getHalfYDimention should return the half height dimention of a rectangle", function() {

    expect(aabb.getHalfYDimention()).toBe(5);

  });

});