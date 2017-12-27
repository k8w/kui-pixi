import KuiComponent from './src/KuiComponent';
import KuiPrefab from './src/KuiPrefab';

const KUI = {
    component: {} as { [key: string]: any },
    prefab: {},

    //TODO
    // registerComponent
};
export default KUI;

export { KuiComponent, KuiPrefab };

declare global {
    let IS_KUI_EDITOR: boolean;
}