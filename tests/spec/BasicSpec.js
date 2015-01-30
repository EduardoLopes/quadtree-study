describe("Basic", function() {

  var basic;

  beforeEach(function() {
    basic = new Basic();
  });

  it("should be invisible", function() {
    basic.kill();

    expect(basic.visible).toBe(false);

  });

  it("should be dead", function() {
    basic.kill();

    expect(basic.alive).toBe(false);

  });

  it("should be inactive", function() {
    basic.kill();

    expect(basic.active).toBe(false);

  });

});