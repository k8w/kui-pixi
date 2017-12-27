import * as PIXI from 'pixi.js';
import KuiComponent from '../src/KuiComponent';
import { TransformProps } from '../src/KuiComponent';
import KuiPrefab from '../src/KuiPrefab';
import KUI from '../index';

let app = new PIXI.Application({
    width: 720,
    height: 480,
    view: document.getElementById('stage') as HTMLCanvasElement,
    backgroundColor: 0xffffff,
    antialias: true,
    sharedLoader: true,
    sharedTicker: true
});

class Cross extends PIXI.Container {
    constructor() {
        super();
        let graphics = new PIXI.Graphics();
        graphics.lineStyle(5, 0xff0000, 1);
        graphics.moveTo(-25, 0);
        graphics.lineTo(25, 0);
        graphics.moveTo(0, -25);
        graphics.lineTo(0, 25);
        this.addChild(graphics);
    }
}


interface CProps extends TransformProps {
    color: number
}

class CustomCross extends KuiComponent<CProps> {
    graphics: PIXI.Graphics = undefined as any;

    protected init() {
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    }

    applyProps() {
        console.log('here')
        super.applyProps();

        if (this.graphics) {
            this.graphics.clear();
            console.log('up', this.props.color)
            this.graphics.lineStyle(5, this.props.color, 1);
            this.graphics.moveTo(-25, 0);
            this.graphics.lineTo(25, 0);
            this.graphics.moveTo(0, -25);
            this.graphics.lineTo(0, 25);
        }
    }
}

KUI.component = {
    Cross: KuiComponent.kuify(Cross),
    CustomCross: CustomCross
}

// let cross1 = new KUI.component.Cross({
//     x: 100,
//     y: 100,
//     rotation: 15
// });
// app.stage.addChild(cross1);

// let cross2 = new KUI.component.CustomCross({
//     x: 300,
//     y: 300,
//     rotation: 15,
//     color: 0x0000ff
// });
// app.stage.addChild(cross2);

class TestPrefab extends KuiPrefab {
    static children = [
        {
            compId: 'Cross',
            props: {
                x: 100,
                y: 100,
                rotation: 15
            }
        },
        {
            compId: 'Cross',
            props: {
                x: 200,
                y: 200,
                rotation: 30
            }
        },
        {
            compId: 'Cross',
            props: {
                x: 300,
                y: 300,
                rotation: 45
            }
        }
    ]
}

app.stage.addChild(new TestPrefab({}))