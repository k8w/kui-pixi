import * as PIXI from 'pixi.js';
import KuiComponent from '../src/KuiComponent';
import { TransformProps } from '../src/KuiComponent';
import KuiPrefab from '../src/KuiPrefab';
import KUI from '../index';

//设置这个 才能在Chrome里用devTool调试
(window as any).PIXI = PIXI;

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
    graphics: PIXI.Graphics;

    protected init() {
        this.interactive = this.interactiveChildren = true;
        this.graphics = new PIXI.Graphics();
        this.graphics.interactive = true;
        this.addChild(this.graphics);

        this.on('mouseover', () => {
            this.props.color = 0xff0f00;
            this.applyProps();
        })

        this.on('mouseout', () => {
            this.props.color = 0x0000ff;
            this.applyProps();
        })
    }

    applyProps() {
        super.applyProps();

        if (this.graphics) {
            this.graphics.clear();
            
            this.graphics.beginFill(0, 0.1);
            this.graphics.drawRect(-25, -25, 50, 50);
            this.graphics.endFill();

            this.graphics.beginFill(0xff0000, 0.1);
            let bounds = this.getLocalBounds();
            this.graphics.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
            this.graphics.endFill();

            this.graphics.lineStyle(5, this.props.color, 1);
            this.graphics.moveTo(-25, 0);
            this.graphics.lineTo(25, 0);
            this.graphics.moveTo(0, -25);
            this.graphics.lineTo(0, 25);

            if (!this.hitArea) {
                this.hitArea = this.getLocalBounds();
            }
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
                rotation: 0
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
            compId: 'CustomCross',
            props: {
                x: 300,
                y: 300,
                rotation: -30,
                color: 0x00ff00
            }
        }
    ]
}

let pb = new TestPrefab({
    x: 300, y: -50
});
pb.interactive = pb.interactiveChildren = true;
app.stage.addChild(pb);

pb.on('click', () => {
    console.log('pb')
});

// app.stage.interactive = true;
// console.log(app.view.width, app.view.height)
// app.stage.hitArea = new PIXI.Rectangle(0, 0, app.view.width, app.view.height);
// app.stage.on('click', () => {
//     console.log('STAGE CLICKED');
// })

(window as any).app = app;
app.renderer.plugins.interaction.on('click', () => {
    console.log('RClick')
});
