const workspaceEl = document.querySelector('.workspace');
const coordinateEl = document.querySelector('.coordinate');

const workspaceRect = workspaceEl.getBoundingClientRect();

const nodeList = [];
let nodeId = 0;

function createNode(x, y) {
  const node = { x, y, nodeId };
  nodeList.push(node);
  nodeId++;

  const nodeListEl = nodeList.map((node) => {
    return `<div id="${node.id}" class="node" style="top: ${node.y}px; left: ${node.x}px"></div>`;
  });

  return nodeListEl.join('');
}

workspaceEl.addEventListener('pointerdown', (e) => {
  const workspaceX = e.clientX - workspaceRect.x;
  const workspaceY = e.clientY - workspaceRect.y;

  coordinateEl.innerHTML = `
    <div>좌표 x: ${workspaceX}</div>
    <div>좌표 y: ${workspaceY}</div>
  `;

  const nodeListEl = createNode(workspaceX, workspaceY);
  workspaceEl.innerHTML = nodeListEl;
});
