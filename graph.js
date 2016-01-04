/*
 - nodes and edges are identified by their id property (not by object reference)
 */

var nextNodeId = 10000;
var nextEdgeId = 20000;


function Node() {
    this.neighbors = [];
    this.id = nextNodeId++;
}

Node.prototype.getDegree = function() {
    return this.neighbors.length;
};

Node.prototype.getNeighborhood = function() {
    return this.neighbors;
};

Node.prototype.addNeighbor = function(neighbor) {
	var found = 0;
	for(var i = 0; i < this.neighbors.length; i++) {
		if (this.neighbors[i].id == neighbor.id) {
			found = 1;
			break;
		}
	}
	if (found === 0) {
		this.neighbors.push(neighbor);
    }
};

Node.prototype.removeNeighbor = function(neighbor) {
	var index = -1;
	for(var i = 0; i < this.neighbors.length; i++) {
		if (this.neighbors[i].id == neighbor.id) {
			index = i;
			break;
		}
	}
	if (index > -1) {
		this.neighbors.splice(index, 1);
    }
};

Node.prototype.setData = function(data) {
    this.data = data;
};

Node.prototype.getData = function() {
    return this.data;
};

/*
 Class: Edge
 */

function Edge(_source, _sink) {
    // undirected edge

    this.source = _source;
    this.sink = _sink;
    this.id = nextEdgeId++;
}

Edge.prototype.adjacent = function(node) {
    var result = 0;
    if (this.source == node || this.sink == node) {
		result = 1;
    }
    return result;
};

/*
 Class: Graph
 */

function Graph() { 
    // undirected graph without multi-edges
    this.nodes = [];
    this.edges = [];
	this.selection = [];
};

Graph.prototype.clone = function() {
	var clone = new Graph();
	clone.nodes = this.nodes.slice();
	clone.edges = this.edges.slice();
	clone.selection = this.selection.slice();
	return clone;
};

Graph.prototype.createNode = function() {
    var newNode = new Node();
    this.nodes.push(newNode);
	
    return newNode;
};

Graph.prototype.removeNode = function(node) {
    this.removeNodeFromNodes(node);
    this.removeNodeFromEdges(node);
};

Graph.prototype.removeNodeFromNodes = function(node) {
    var index=this.nodes.indexOf(node);
    if (index > -1) {
		for(var i = 0; i < node.neighbors.length; i++) {
			node.neighbors[i].removeNeighbor(node);
		}
		this.nodes.splice(index, 1);
    } else {
		// node does not belong to this graph...
	}
};

Graph.prototype.removeNodeFromEdges = function(node) {
    var finished=0;
    while (finished != 1) {
		finished=1;
		for(var i = 0; i < this.edges.length; i++) {
			if (this.edges[i].adjacent(node) == 1) {
				finished=0;
				this.edges.splice(i, 1);
				break;
			}
		}
    }
};

Graph.prototype.removeNodeById = function(id) {
    var node = undefined;
    for(var i = 0; i < this.nodes.length; i++) {
		if (this.nodes[i].id == id) {
			node = this.nodes[i];
		}
    }
    if (node) {
		this.removeNode(node);
    }
};

Graph.prototype.findNodeById = function(id) {
	var result = undefined;
	for (var i=0; i<this.nodes.length; i++) {
		if (this.nodes[i].id === id) {
			result = this.nodes[i];
			break;
		}
	}
	return result;
}

Graph.prototype.insertEdge = function(node1, node2) {
    this.insertEdgeToEdges(node1, node2);
    var result = this.insertEdgeToNodes(node1, node2);
    return result;
};

Graph.prototype.insertEdgeToNodes = function(node1, node2) {
    var index1 = this.nodes.indexOf(node1);
    if (index1 > -1) {
		var index2 = this.nodes.indexOf(node2);
		if (index2 > -1) {
			node1.addNeighbor(node2);
			node2.addNeighbor(node1);
		}
    }
};

Graph.prototype.insertEdgeToEdges = function(node1, node2) {
	var result = -1;
	if (this.findEdge(node1, node2) == -1) {
		var edge = new Edge(node1, node2);
		this.edges.push(edge);
		result = edge.id;
	}
	return result;
};

/** Find index of edge that connects node1 and node2.
    Either "node1 -> node2" or "node1 <- node2"
*/
Graph.prototype.findEdge = function(node1, node2) {
    var result = -1;
    for (var i = 0; i < this.edges.length; i++) {
		var edge = this.edges[i];
		if ((edge.source == node2 && edge.sink == node1) ||
			(edge.source == node1 && edge.sink == node2)) {
			result = i;
			break;
		}
    }
    return result;
};

/** Remove all edges that originate at node and lead into nodeSet 
    or that originate in nodeSet and lead to node */

Graph.prototype.removeEdges = function(node, nodeSet) {
	var neighbor = undefined;
	var i, j, k;
	var nodeFound;
	
    for(i = 0; i < node.neighbors.length; i++) {
		neighbor = node.neighbors[i];
		nodeFound = 0;
		for(j = 0; j < nodeSet.length; j++) {
			if (nodeSet[j].id === neighbor.id) {
				nodeFound = 1;
				break;
			}
		}
		if (nodeFound) {
			this.removeEdge(node, neighbor);
		}
    }

	for (j=0; j < nodeSet.length; j++) {
		neighbor = nodeSet[j];
		for (k=0; k<neighbor.neighbors.length; k++) {
			if (neighbor.neighbors[k].id == node.id) {
				this.removeEdge(neighbor, node);
				break;
			}
		}
	}
};

/* Remove single edge between node1 and node2 */

Graph.prototype.removeEdge = function(node1, node2) {
    this.removeEdgeFromNodes(node1, node2);
    this.removeEdgeFromEdges(node1, node2);
};

/** Internal method */

Graph.prototype.removeEdgeFromNodes = function(node1, node2) {
    var index1 = this.nodes.indexOf(node1);
    if (index1 > -1) {
		var index2 = this.nodes.indexOf(node2);
		if (index2 > -1) {
			node1.removeNeighbor(node2);
			node2.removeNeighbor(node1);
		}
    }
}; 

/* Internal method */

Graph.prototype.removeEdgeFromEdges = function(node1, node2) {
    var index = this.findEdge(node1, node2);
    if (index > -1) {
		this.edges.splice(index, 1);
    }
};

Graph.prototype.removeEdgeById = function(id) {
    var edge = undefined;
    for(var i = 0; i < this.edges.length; i++) {
		if (this.edges[i].id == id) {
			edge = this.edges[i];
		}
    }
    if (edge) {
		this.removeEdge(edge);
    }
};	

/**
 Toggle selection for node.
*/

Graph.prototype.selectNode = function (node) {
	var found = 0;
	for(var i = 0; i < this.selection.length; i++) {
		if (node.id === this.selection[i].id) {
			this.selection.splice(node, 1);
			found = 1;
			break;
		}
	}
	if (found === 0) {
		this.selection.push(node);
	}
};

Graph.prototype.isSelected = function (node) {
	for(var i = 0; i < this.selection.length; i++) {
		if (node.id === this.selection[i].id) {
			return 1;
		}
	}
	return 0;
};

/**
 Remove node from graph if degree is zero.
*/

Graph.prototype.removeNodeIfDegreeIsZero = function(node) {
    var index = this.nodes.indexOf(node);
    if (index > -1 && node.getDegree() == 0) {
		this.nodes.splice(node, 1);
    }
};
