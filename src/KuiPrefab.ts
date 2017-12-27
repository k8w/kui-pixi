import KuiComponent from './KuiComponent';
import { Container } from 'pixi.js';
import KUI from '../index';

export interface PrefabChild {
    name?: string;
    props: any;
    children?: PrefabChild[];
    compId?: string
}

export default class KuiPrefab extends KuiComponent {
    "constructor": typeof KuiPrefab & typeof KuiComponent;

    static children: PrefabChild[] = []

    protected init() {
        this.buildPrefabUI(this, this.constructor.children);
    }

    protected buildPrefabUI(container: Container, children: PrefabChild[]) {
        for (let child of children) {
            if (child.children) {
                let group = new KuiComponent(child.props);
                this.buildPrefabUI(group, child.children);
                container.addChild(group);
            }
            else if(child.compId){
                let CompClass = KUI.component[child.compId];
                let comp = new CompClass(child.props);
                container.addChild(comp);
            }
        }
    }
}