const workspaceEl = document.querySelector('.workspace');
const coordinateEl = document.querySelector('.coordinate');

const workspaceRect = workspaceEl.getBoundingClientRect();

const nodeList = [];
let nodeId = 0;

function createNode(x, y) {
  const node = { x, y, id: nodeId, isDragging: false };
  nodeList.push(node);
  nodeId++;
}

function renderNode() {
  const nodeListEl = nodeList.map((node) => {
    return `<div id="${node.id}" class="node" style="top: ${node.y}px; left: ${node.x}px"></div>`;
  });

  return nodeListEl.join('');
}

workspaceEl.addEventListener('pointerdown', (e) => {
  if (e.target.classList.contains('node')) {
    const seletedNode = nodeList.find(
      (node) => node.id === Number(e.target.id),
    );

    seletedNode.isDragging = true;
    console.log(seletedNode);
    return;
  }

  const workspaceX = e.clientX - workspaceRect.x;
  const workspaceY = e.clientY - workspaceRect.y;

  coordinateEl.innerHTML = `
    <div>좌표 x: ${workspaceX}</div>
    <div>좌표 y: ${workspaceY}</div>
  `;

  createNode(workspaceX, workspaceY);
  workspaceEl.innerHTML = renderNode();
});

workspaceEl.addEventListener('pointermove', (e) => {
  const seletedNode = nodeList.find((node) => node.isDragging);

  if (!seletedNode) return;

  const workspaceX = e.clientX - workspaceRect.x;
  const workspaceY = e.clientY - workspaceRect.y;

  seletedNode.x = workspaceX;
  seletedNode.y = workspaceY;

  workspaceEl.innerHTML = renderNode();
});

workspaceEl.addEventListener('pointerup', (e) => {
  if (e.target.classList.contains('node')) {
    const seletedNode = nodeList.find(
      (node) => node.id === Number(e.target.id),
    );

    seletedNode.isDragging = false;
    console.log(seletedNode);
    return;
  }
});
