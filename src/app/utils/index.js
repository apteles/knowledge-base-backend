/* eslint-disable no-param-reassign */
function generatePath(data) {
  const getParent = (categories, parent_id) => {
    const parent = categories.filter((v) => v.id === parent_id);

    return parent.length ? parent[0] : null;
  };
  const categoryWithPath = data.map((category) => {
    let path = category.name;
    let parent = getParent(data, category.parent_id);

    while (parent) {
      path = `${parent.name} > ${path}`;
      parent = getParent(data, parent.parent_id);
    }
    return { ...category, path };
  });

  categoryWithPath.sort((a, b) => {
    if (a.path < b.path) return -1;
    if (a.path > b.path) return 1;
    return 0;
  });

  return categoryWithPath;
}

const toTree = (categories, tree) => {
  if (!tree) tree = categories.filter((c) => !c.parent_id);
  tree = tree.map((parentNode) => {
    const isChild = (node) => node.parent_id === parentNode.id;
    parentNode.children = toTree(categories, categories.filter(isChild));
    return parentNode;
  });
  return tree;
};
export { toTree, generatePath };
