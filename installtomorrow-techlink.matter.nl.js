/*
   Requirisites:
        - <button> element with id="start-matter"
        - <div> element with id="matter" and sized

*/

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

window.addEventListener("load", (event) => {
  var vector = new Two.Vector();
  var entities = [];
  var mouse;
  var copy = [
    "Idea",
    "Idea",
    "Idea",
    "Money",
    "Money",
    "Tech",
    "Concept",
    "Business",
    "Design",
    "MVP",
    "Roadmap",
    "Testing",
  ];

  var two = new Two({
    type: Two.Types.canvas,
    fitted: true,
    autostart: false,
  }).appendTo(document.getElementById("matter"));

  var copy =
    two.width > 1000
      ? [
          "Technicus hernieuwbare energie",
          "Onderhoudstechnicus",
          "Industrieel elektrotechnisch installateur",
          "Servicetechnieker",
          "Verwarmingsspecialist",
          "Technicus lichtreclame",
          "Koeltechnicus",
          "Technicus inbraakbeveiligingssystemen",
          "Installateur zonnepanelen",
          "Loodgieter",
          "Klimatisatietechnicus",
          "Elektrotechnicus",
        ]
      : [
          "Koeltechnicus",
          "Servicetechnieker",
          "Loodgieter",
          "Onderhoudstechnicus",
          "Elektrotechnicus",
          //"Industrieel elektrotechnisch installateur",
          "Technicus hernieuwbare energie",
          "Klimatisatietechnicus",
          "Technicus lichtreclame",
          "Installateur zonnepanelen",
          "Verwarmingsspecialist",
          //"Technicus inbraakbeveiligingssystemen",
        ];

        // [
        //   "Installateur zonnepanelen",
        //   "Technicus hernieuwbare energie",
        //   "Verwarmingsspecialist",
        //   "Onderhoudstechnicus",
        //   "Klimatisatietechnicus",
        //   "Technicus inbraakbeveiligingssystemen",
        //   "Elektrotechnicus",
        //   "Servicetechnieker",
        //   "Technicus lichtreclame",
        //   "Loodgieter",
        //   "Koeltechnicus",
        //   "Industrieel elektrotechnisch installateur",
        // ];

        // [
        //   "Koeltechnicus",
        //   "Servicetechnieker",
        //   "Loodgieter",
        //   "Onderhoudstechnicus",
        //   "Elektrotechnicus",
        //   "Industrieel elektrotechnisch installateur",
        //   "Technicus hernieuwbare energie",
        //   "Klimatisatietechnicus",
        //   "Technicus lichtreclame",
        //   "Installateur zonnepanelen",
        //   "Verwarmingsspecialist",
        //   "Technicus inbraakbeveiligingssystemen",
        // ];

  //console.log(copy);

  var solver = Matter.Engine.create();
  solver.world.gravity.y = 1;

  var bounds = {
    length: 5000,
    thickness: 50,
    properties: {
      isStatic: true,
    },
  };

  // bounds.top = createBoundary(bounds.length, bounds.thickness);
  bounds.left = createBoundary(bounds.thickness, bounds.length);
  bounds.right = createBoundary(bounds.thickness, bounds.length);
  bounds.bottom = createBoundary(bounds.length, bounds.thickness);

  Matter.World.add(solver.world, [
    /*bounds.top.entity,*/ bounds.left.entity,
    bounds.right.entity,
    bounds.bottom.entity,
  ]);

  var defaultStyles = {
    size: two.width * 0.01,
    weight: 700,
    fill: "black",
    leading: two.width > 1000 ? two.width * 0.000001 : two.width * 0.0001,
    family: "Angus, Arial, sans-serif",
    alignment: "center",
    baseline: "baseline",
    margin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };

  addSlogan();
  resize();
  mouse = addMouseInteraction();
  two.bind("resize", resize).bind("update", update);

  const runMatter = function () {
    two.play();
  };

  document.getElementById("start-matter").onclick = runMatter;

  function addMouseInteraction() {
    // add mouse control
    var mouse = Matter.Mouse.create(document.getElementById("matter"));
    var mouseConstraint = Matter.MouseConstraint.create(solver, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
      },
    });

    // Enables page scrolling by dissabling scroll capture by mouseconstraint.
    // https://github.com/liabru/matter-js/issues/929#issuecomment-720124704
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    );

    Matter.World.add(solver.world, mouseConstraint);

    return mouseConstraint;
  }

  function resize() {
    var length = bounds.length;
    var thickness = bounds.thickness;

    // vector.x = two.width / 2;
    // vector.y = - thickness / 2;
    // Matter.Body.setPosition(bounds.top.entity, vector);

    vector.x = -thickness / 2;
    vector.y = two.height / 2;
    Matter.Body.setPosition(bounds.left.entity, vector);

    vector.x = two.width + thickness / 2;
    vector.y = two.height / 2;
    Matter.Body.setPosition(bounds.right.entity, vector);

    vector.x = two.width / 2;
    vector.y = two.height + thickness / 2;
    Matter.Body.setPosition(bounds.bottom.entity, vector);

    var size;

    if (two.width < 480) {
      size = two.width * 0.12;
    } else if (two.width > 1080 && two.width < 1600) {
      size = two.width * 0.07;
    } else if (two.width > 1600) {
      size = two.width * 0.06;
    } else {
      size = two.width * 0.08;
    }

    size = two.width > 1000 ? size / 3 : size / 2.2;

    var leading = size;

    for (var i = 0; i < two.scene.children.length; i++) {
      var child = two.scene.children[i];

      if (!child.isWord) {
        continue;
      }

      var text = child.text;
      var rectangle = child.rectangle;
      var entity = child.entity;

      text.size = size;
      text.leading = leading;

      var rect = text.getBoundingClientRect(true);
      // Change rect size here
      rect = {
        width: rect.width,
        height: two.width > 1000 ? 60 : 50,
      };
      rectangle.width = rect.width;
      rectangle.height = rect.height;

      Matter.Body.scale(entity, 1 / entity.scale.x, 1 / entity.scale.y);
      Matter.Body.scale(entity, rect.width, rect.height);
      entity.scale.set(rect.width, rect.height);

      // Change text size here
      text.size = two.width > 1000 ? size * 0.8 : size * 0.95;
    }
  }

  function addSlogan() {
    var x = defaultStyles.margin.left;
    var y = -two.height; // Header offset

    for (var i = 0; i < copy.length; i++) {
      var word = copy[i];
      var group = new Two.Group();
      var text = new Two.Text("", 0, 0, defaultStyles);

      group.isWord = true;

      // Override default styles
      if (word.value) {
        text.value = word.value;

        for (var prop in word.styles) {
          text[prop] = word.styles[prop];
        }
      } else {
        text.value = word;
      }

      var rect = text.getBoundingClientRect();
      var ox = x + rect.width / 2;
      var oy = y + rect.height / 2;

      var ca = x + rect.width;
      var cb = two.width;

      // New line
      if (ca >= cb) {
        x = defaultStyles.margin.left;
        y +=
          defaultStyles.leading +
          defaultStyles.margin.top +
          defaultStyles.margin.bottom;

        ox = x + rect.width / 2;
        oy = y + rect.height / 2;
      }

      group.translation.x = ox;
      group.translation.y = oy;
      text.translation.y = two.width > 1000 ? 10 : 12;

      var rectangle = new Two.Rectangle(0, 0, rect.width, rect.height);
      rectangle.fill = "rgb(255, 255, 255)";
      // rectangle.fill =
      //   "rgba(" +
      //   255 +
      //   "," +
      //   Math.floor(Math.random() * 255) +
      //   "," +
      //   Math.floor(Math.random() * 255) +
      //   "," +
      //   0.85 +
      //   ")";

      rectangle.noStroke();
      // rectangle.opacity = 0.75;
      rectangle.visible = true;

      // Change friction and margin here
      var entity = Matter.Bodies.rectangle(ox, oy, 1, 1, { friction: 0.5 });
      Matter.Body.scale(entity, rect.width + 1, rect.height + 1);

      entity.scale = new Two.Vector(rect.width, rect.height);
      entity.object = group;
      entities.push(entity);

      x += rect.width + defaultStyles.margin.left + defaultStyles.margin.right;

      group.text = text;
      group.rectangle = rectangle;
      group.entity = entity;

      group.add(rectangle, text);
      two.add(group);
    }

    Matter.World.add(solver.world, entities);
  }

  function update(frameCount, timeDelta) {
    var allBodies = Matter.Composite.allBodies(solver.world);
    Matter.MouseConstraint.update(mouse, allBodies);
    Matter.MouseConstraint._triggerEvents(mouse);

    Matter.Engine.update(solver);

    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      entity.object.position.copy(entity.position);
      entity.object.rotation = entity.angle;
    }
  }

  function createBoundary(width, height) {
    var rectangle = two.makeRectangle(0, 0, width, height);
    rectangle.visible = false;

    rectangle.entity = Matter.Bodies.rectangle(
      0,
      0,
      width,
      height,
      bounds.properties
    );
    rectangle.entity.position = rectangle.position;

    return rectangle;
  }
});
