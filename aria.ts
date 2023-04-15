// #region  TYPE
type NodeId = string;

type NodeType = {
  id: NodeId;
  firstChild: NodeType | null;
  siblings: NodeType[] | null;
};

//#endregion

// #region CREATE NODE

function createNewNode(id: NodeId): NodeType {
  const newNode: NodeType = {
    id,
    firstChild: null,
    siblings: null,
  };

  return newNode;
}

// #endregion

// #region FIND A NODE
function findNode(id: NodeId, root: NodeType): NodeType | undefined {
  if (!root) return;
  if (root.id === id) return root;

  const { firstChild } = root;

  if (!firstChild) return;

  const node = findNode(id, firstChild);
  if (node) return node;

  if (firstChild.siblings?.length) {
    for (const child of firstChild.siblings) {
      const node = findNode(id, child);
      if (node) return node;
    }
  }

  return;
}
// #endregion

// #region INSERTION
function insert(root: NodeType, id: NodeId, parentKey: NodeId) {
  const parent = findNode(parentKey, root);

  if (!parent) return;

  const child = createNewNode(id);

  const { firstChild } = parent;

  if (!firstChild) {
    parent.firstChild = child;
  } else {
    if (!parent.firstChild) return;
    if (parent.firstChild.siblings) parent.firstChild.siblings.push(child);
    else parent.firstChild.siblings = [child];
  }

  return true;
}

function displayTree(root: NodeType): NodeType[] {
  let tree: NodeType[] = [];

  // render node
  tree.push(root);

  const { firstChild, siblings } = root;

  if (firstChild) {
    tree.splice(tree.length, 0, ...displayTree(firstChild));
    if (siblings && siblings.length) {
      siblings.forEach((sibling) => {
        tree.splice(tree.length, 0, ...displayTree(sibling));
      });
    }
  }
  return tree;
}
// #endregion

//#region INIT

function initiate(id: NodeId): NodeType {
  return createNewNode(id);
}

const tree = initiate("key1");

insert(tree, "key2", "key1");
insert(tree, "key3", "key2");
insert(tree, "key4", "key3");
insert(tree, "key5", "key4");
insert(tree, "key6", "key5");
insert(tree, "key7", "key5");

console.log(displayTree(tree));

console.log(findNode("key7", tree))


// console.log(JSON.stringify(tree));

// #endregion
