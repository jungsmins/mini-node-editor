const viewportEl = document.querySelector('.viewport');
const worldEl = document.querySelector('.world');
const coordinateEl = document.querySelector('.coordinate');
const buttonEl = document.querySelector('button');

const viewportRect = viewportEl.getBoundingClientRect();

let previousX;
let previousY;

const world = {
  panX: 0,
  panY: 0,
  scale: 1,
};

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

    seletedNode.element.style.transform = `translate(${seletedNode.x}px, ${seletedNode.y}px)`;
  }

  function render(node) {
    node.element.id = node.id;
    node.element.classList = 'node';
    node.element.style = `top: ${node.y}px; left: ${node.x}px`;

    worldEl.appendChild(node.element);
  }

  return { createNode, moveNode };
}

const node = nodes();

buttonEl.addEventListener('click', () => {
  node.createNode(0, 0);
});

viewportEl.addEventListener('pointerdown', (e) => {
  e.target.setPointerCapture(e.pointerId);

  previousX = e.clientX;
  previousY = e.clientY;
});

viewportEl.addEventListener('pointermove', (e) => {
  const workspaceX = e.clientX - viewportRect.x;
  const workspaceY = e.clientY - viewportRect.y;

  coordinateEl.innerHTML = `
    <div>좌표 x: ${workspaceX}</div>
    <div>좌표 y: ${workspaceY}</div>
  `;

  const deltaX = e.clientX - previousX;
  const deltaY = e.clientY - previousY;

  previousX = e.clientX;
  previousY = e.clientY;

  if (e.target.closest('.node') && e.target.hasPointerCapture(e.pointerId)) {
    node.moveNode(e.target.id, deltaX, deltaY);
    return;
  }

  if (e.target.hasPointerCapture(e.pointerId)) {
    world.panX += deltaX;
    world.panY += deltaY;

    worldEl.style.transform = `translate(${world.panX}px, ${world.panY}px)`;
  }
});

viewportEl.addEventListener('wheel', (e) => {
  world.scale += e.deltaY * -0.01;

  worldEl.style.transform = `scale(${world.scale})`;
});
