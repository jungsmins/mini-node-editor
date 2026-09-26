const workspaceEl = document.querySelector('.workspace');
const coordinateEl = document.querySelector('.coordinate');

const workspaceRect = workspaceEl.getBoundingClientRect();

workspaceEl.addEventListener('pointerdown', (e) => {
  const workspaceX = e.clientX - workspaceRect.x;
  const workspaceY = e.clientY - workspaceRect.y;

  coordinateEl.innerHTML = `
    <div>좌표 x: ${workspaceX}</div>
    <div>좌표 y: ${workspaceY}</div>
  `;
});
