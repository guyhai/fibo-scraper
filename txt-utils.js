var indent = 1

function printTree(tree) {
    stringBuilder = ''
    tree.forEach(function (node) {
        stringBuilder = stringBuilder.concat(
            '<br>-&nbsp;' + Array(indent).join('&nbsp;&nbsp;'),
            node.name
        )
        if (node.children) {
            indent++
            stringBuilder = stringBuilder.concat(printTree(node.children))
        }
        if (tree.indexOf(node) === tree.length - 1) {
            indent--
        }
    })
    return stringBuilder
}
exports.printTree = printTree
