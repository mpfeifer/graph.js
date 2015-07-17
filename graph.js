/**
 Software-architecture

 GraphCanvas
 - LogBook
 - open
 - close
 - export to text
 
 - Graph Design Functionality
 - Line Mode
 - Node/Edge Mode
 - Reset
 - Undo
 - Import
 - Export

 Graph (undirected, no multiple edges)
 - Nodes (nodes have ids (not names))
 - Edges (edges have ids)
 - properties for nodes and edges and graphs

 */

var nextNodeId = 10000;
var nextEdgeId = 20000;

function Node() {
	var neighbors = [];
	var data;
	var id = nextNodeId++;
}

Node.prototype.getDegree = function() {
	return this.neighbors.length;
};

Node.prototype.getNeighborhood = function() {
	return neighbors;
};

Node.prototype.addNeighbor = function(neighbor) {
	var index = this.neighbors.indexOf(neighbor);
	if (index > -1) {
		this.neighbors.push(neighbor);
	}
};

Node.prototype.removeNeighbor = function(neighbor) {
	var index = this.neighbors.indexOf(neighbor);
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

function Edge(_source, _sink) {
	var source = _source;
	var sink = _sink;
	var id = nextEdgeId++;
}

function Graph() { 
	// undirected graph without multi-edges

	var nodes = [];

	this.prototype.createNode = function() {
		var newNode = new Node();
		nodes.push(newNode);
		return newNode;
	};

	this.prototype.removeNode = function(node) {
		var index=nodes.indexOf(node1);
		if (index > -1) {
			
		}		
	}

	this.prototype.insertEdge = function(node1, node2) {
		var index1=nodes.indexOf(node1);
		if (index1 > -1) {
			var index2 = nodes.indexOf(node2);
			if (index2 > -1) {
				node1.addNeighbor(node2);
				node2.addNeighbor(node1);
			}
		}
	};

	this.prototype.checkDegree = function(node) {
		var index = nodes.indexOf(node);
		if (index > -1) {
			nodes.splice(node, 1);
		}
	};

	this.prototype.removeEdge = function(node1, node2) {
		var index1 = nodes.indexOf(node1);
		if (index1 > -1) {
			var index2 = nodes.indexOf(node2);
			if (index2 > -1) {
				node1.removeNeighbor(node2);
				node2.removeNeighbor(node1);
				this.checkDegree(node1);
				this.checkDegree(node2);
			}
		}
	};

};
