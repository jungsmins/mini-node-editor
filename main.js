const viewportEl = document.querySelector('.viewport');
const worldEl = document.querySelector('.world');
const coordinateEl = document.querySelector('.coordinate');
const buttonEl = document.querySelector('button');

const viewportRect = viewportEl.getBoundingClientRect();

let previousX;
let previousY;

function createWorld() {
  let panX = 0;
  let panY = 0;
  let scale = 1;

  function pan(x, y) {
    panX += x;
    panY += y;

    render();
  }

  function zoom(deltaY, viewportX, viewportY) {
    const world = viewportToWorld(viewportX, viewportY);

    scale += deltaY * -0.01;
    panX = viewportX - world.x * scale;
    panY = viewportY - world.y * scale;

    render();
  }

  function viewportDeltaToWorldDelta(deltaX, deltaY) {
    return {
      x: deltaX / scale,
      y: deltaY / scale,
    };
  }

  function viewportToWorld(viewportX, viewportY) {
    return {
      x: (viewportX - panX) / scale,
      y: (viewportY - panY) / scale,
    };
  }

  function wolrdToViewport(worldX, worldY) {
    return {
      x: worldX * scale + panX,
      y: worldY * scale + panY,
    };
  }

  function render() {
    worldEl.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
  }

  return {
    pan,
    zoom,
    viewportDeltaToWorldDelta,
    viewportToWorld,
    wolrdToViewport,
  };
}

function nodes() {
  const nodeList = [];
  let nodeId = 0;

  function createNode(x, y) {
    const node = {
      x,
      y,
      id: nodeId,
      element: document.createElement('div'),
    };

    nodeList.push(node);
    render(node);
    nodeId++;
  }

  function moveNode(id, x, y) {
    const seletedNode = nodeList.find((node) => node.id === Number(id));

    seletedNode.x += x;
    seletedNode.y += y;

    console.log(x, y, seletedNode.x, seletedNode.y);

    seletedNode.element.style.transform = `translate(${seletedNode.x}px, ${seletedNode.y}px)`;
  }

  function render(node) {
    node.element.id = node.id;
    node.element.classList = 'node';
    node.element.style.transform = `translate(${node.x}px, ${node.y}px)`;

    worldEl.appendChild(node.element);
  }

  return { createNode, moveNode };
}

const world = createWorld();
const node = nodes();

buttonEl.addEventListener('click', () => {
  const viewportX = viewportRect.width / 2;
  const viewportY = viewportRect.height / 2;
  const worldPosition = world.viewportToWorld(viewportX, viewportY);

  node.createNode(worldPosition.x, worldPosition.y);
});

viewportEl.addEventListener('pointerdown', (e) => {
  e.target.setPointerCapture(e.pointerId);

  previousX = e.clientX;
  previousY = e.clientY;
});

viewportEl.addEventListener('pointermove', (e) => {
  const viewportX = e.clientX - viewportRect.x;
  const viewportY = e.clientY - viewportRect.y;

  coordinateEl.innerHTML = `
    <div>좌표 x: ${viewportX}</div>
    <div>좌표 y: ${viewportY}</div>
  `;

  const deltaX = e.clientX - previousX;
  const deltaY = e.clientY - previousY;

  previousX = e.clientX;
  previousY = e.clientY;

  const delta = world.viewportDeltaToWorldDelta(deltaX, deltaY);

  if (e.target.closest('.node') && e.target.hasPointerCapture(e.pointerId)) {
    node.moveNode(e.target.id, delta.x, delta.y);
    return;
  }

  if (e.target.hasPointerCapture(e.pointerId)) {
    world.pan(deltaX, deltaY);
  }
});

viewportEl.addEventListener('wheel', (e) => {
  const viewportX = e.clientX - viewportRect.x;
  const viewportY = e.clientY - viewportRect.y;

  world.zoom(e.deltaY, viewportX, viewportY);
});
