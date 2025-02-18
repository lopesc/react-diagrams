import { LayerModel, LayerModelGenerics } from '@projectstorm/react-canvas-core';
import { NodeModel } from '../node/NodeModel';
import { DiagramEngine } from '../../DiagramEngine';

export interface NodeLayerModelGenerics extends LayerModelGenerics {
	CHILDREN: NodeModel;
	ENGINE: DiagramEngine;
}

export class NodeLayerModel<G extends NodeLayerModelGenerics = NodeLayerModelGenerics> extends LayerModel<G> {
	constructor() {
		super({
			type: 'diagram-nodes',
			isSvg: false,
			transformed: true
		});
	}

	addModel(model: G['CHILDREN']): void {
		if (!(model instanceof NodeModel)) {
			throw new Error('Can only add nodes to this layer');
		}
		super.addModel(model);
	}

	getChildModelFactoryBank(engine: G['ENGINE']) {
		return engine.getNodeFactories();
	}

	getNodes() {
		return this.getModels();
	}
}
