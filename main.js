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
      isDragging: false,
      element: document.createElement('div'),
    };

    nodeList.push(node);
    render(node);
    nodeId++;
  }

  function dragNode(id, x, y) {
    const seletedNode = nodeList.find((node) => node.id === Number(id));

    if (seletedNode.isDragging) {
      seletedNode.x += x;
      seletedNode.y += y;

      seletedNode.element.style.top = `${seletedNode.y}px`;
      seletedNode.element.style.left = `${seletedNode.x}px`;
    }
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
    const seletedNode = nodeList.find(
      (node) => node.id === Number(e.target.id),
    );
    seletedNode.isDragging = true;

    previousX = e.clientX;
    previousY = e.clientY;
  }

  function handlePointerup(e) {
    const seletedNode = nodeList.find(
      (node) => node.id === Number(e.target.id),
    );
    seletedNode.isDragging = false;
  }

  return { createNode, dragNode };
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

  if (e.target.classList.contains('node')) {
    const deltaX = e.clientX - previousX;
    const deltaY = e.clientY - previousY;

    previousX = e.clientX;
    previousY = e.clientY;

    node.dragNode(e.target.id, deltaX, deltaY);
  }
});
