describe("Entity", function() {

  var entiry;

  beforeEach(function() {

    entiry = new Entity(10,10,20,40);

  });

  it("should extend from class Basic", function() {

    expect(Entity.superclass).toBe(AABB);

  });

});