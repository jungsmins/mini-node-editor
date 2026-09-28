const workspaceEl = document.querySelector('.workspace');
const coordinateEl = document.querySelector('.coordinate');

const workspaceRect = workspaceEl.getBoundingClientRect();

let previousX;
let previousY;

function myNode() {
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

    seletedNode.element.style.top = `${seletedNode.y}px`;
    seletedNode.element.style.left = `${seletedNode.x}px`;
  }

  function render(node) {
    node.element.id = node.id;
    node.element.classList = 'node';
    node.element.style = `top: ${node.y}px; left: ${node.x}px`;

    node.element.addEventListener('pointerdown', handlePointerdown);
    node.element.addEventListener('pointerup', handlePointerup);

    workspaceEl.appendChild(node.element);
  }

  function handlePointerdown(e) {
    e.target.setPointerCapture(e.pointerId);

    previousX = e.clientX;
    previousY = e.clientY;
  }

  function handlePointerup(e) {
    e.target.releasePointerCapture(e.pointerId);
  }

  return { createNode, moveNode };
}

const node = myNode();

workspaceEl.addEventListener('pointerdown', (e) => {
  if (e.target.classList.contains('node')) {
    return;
  }

  const workspaceX = e.clientX - workspaceRect.x;
  const workspaceY = e.clientY - workspaceRect.y;

  node.createNode(workspaceX, workspaceY);
});

workspaceEl.addEventListener('pointermove', (e) => {
  const workspaceX = e.clientX - workspaceRect.x;
  const workspaceY = e.clientY - workspaceRect.y;

  coordinateEl.innerHTML = `
    <div>좌표 x: ${workspaceX}</div>
    <div>좌표 y: ${workspaceY}</div>
  `;

  if (
    e.target.classList.contains('node') &&
    e.target.hasPointerCapture(e.pointerId)
  ) {
    const deltaX = e.clientX - previousX;
    const deltaY = e.clientY - previousY;

    previousX = e.clientX;
    previousY = e.clientY;

    node.moveNode(e.target.id, deltaX, deltaY);
  }
});
