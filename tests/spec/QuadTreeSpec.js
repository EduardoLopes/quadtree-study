describe("QuadTree", function() {

  var quadTree;

  beforeEach(function() {
    var bounds = new AABB(0,0,1000, 1000);
    quadTree = new QuadTree(bounds, 0);

    quadTree.insert(new Entity(510,510,20,20));
    quadTree.insert(new Entity(515,515,20,20));
    quadTree.insert(new Entity(515,518,20,20));
    quadTree.insert(new Entity(525,525,20,20));
    quadTree.insert(new Entity(550,550,20,20));

    quadTree.insert(new Entity(500,483,20,20));

  });

  it("should extend from class Basic", function() {

    expect(QuadTree.superclass).toBe(Basic);

  });

  it("should be clear", function() {

    quadTree.clear();

    expect(quadTree.entities.length).toBe(0);
    expect(quadTree.nodes.length).toBe(0);

  });

  it("#insert should insert entities", function() {

    quadTree.clear();

    quadTree.insert(new Entity(600,700,20,20));
    quadTree.insert(new Entity(620,700,20,20));
    quadTree.insert(new Entity(630,700,20,20));
    quadTree.insert(new Entity(640,700,20,20));

    expect(quadTree.entities.length).toBe(1);
    expect(quadTree.nodes.length).toBe(4);
    expect(quadTree.nodes[2].entities.length).toBe(0);

  });


  it("level 0: should have 4 nodes", function() {

    expect(quadTree.nodes.length).toBe(4);

  });

  it("level 0: should have 1 entities", function() {

    expect(quadTree.entities.length).toBe(1);

  });

  it("level 1: should have 4 nodes", function() {

    expect(quadTree.nodes[2].nodes.length).toBe(4);

  });

  it("level 1: should have 2 entities", function() {

    expect(quadTree.nodes[2].entities.length).toBe(2);

  });

  it("level 2: should have 4 nodes", function() {

    expect(quadTree.nodes[2].nodes.length).toBe(4);

  });

  it("level 2: should have 0 entities", function() {

    expect(quadTree.nodes[2].nodes[0].entities.length).toBe(0);

  });

  it("level 3: should have 4 nodes", function() {

    expect(quadTree.nodes[2].nodes[0].nodes.length).toBe(4);

  });

  it("#query should return 1 entities", function() {

    var query = quadTree.query( new Rectangle(50, 50, 100, 400) );

    expect(query.length).toBe(1);

  });

  it("#divide should divide the next nodes", function() {

    quadTree.clear();

    quadTree.divide();
    quadTree.nodes[0].divide();

    expect(quadTree.nodes.length).toBe(4);
    expect(quadTree.nodes[0].nodes.length).toBe(4);

  });

});