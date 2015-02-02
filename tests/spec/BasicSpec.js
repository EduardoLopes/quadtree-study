describe("Basic", function() {

  var basic;

  beforeEach(function() {
    basic = new Basic();
  });

  it("should be dead", function() {
    basic.kill();

    expect(basic.alive).toBe(false);
    expect(basic.active).toBe(false);
    expect(basic.visible).toBe(false);

  });

  it("should be alive", function() {
    basic.revive();

    expect(basic.alive).toBe(true);
    expect(basic.active).toBe(true);
    expect(basic.visible).toBe(true);

  });

});