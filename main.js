const workspaceEl = document.querySelector('.workspace');
const coordinateEl = document.querySelector('.coordinate');

const workspaceRect = workspaceEl.getBoundingClientRect();

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
    console.log(seletedNode);
    if (seletedNode.isDragging) {
      seletedNode.x = x;
      seletedNode.y = y;

      seletedNode.element.style.top = `${y}px`;
      seletedNode.element.style.left = `${x}px`;
    }
  }

  function render(node) {
    node.element.id = node.id;
    node.element.classList = 'node';
    node.element.style = `top: ${node.y}px; left: ${node.x}px`;

    node.element.addEventListener('pointerdown', handlePointerDown);
    node.element.addEventListener('pointerup', handlePointerUp);

    workspaceEl.appendChild(node.element);
  }

  function handlePointerDown(e) {
    const seletedNode = nodeList.find(
      (node) => node.id === Number(e.target.id),
    );
    seletedNode.isDragging = true;
  }

  function handlePointerUp(e) {
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
    node.dragNode(e.target.id, workspaceX, workspaceY);
  }
});
