import { Container } from "pixi.js";

export interface TransformProps{
    /**
     * @default 0
     */
    x?: number;

    /**
     * @default 0
     */
    y?: number;

    /**
     * @default 1
     */
    scaleX?: number;

    /**
     * @default 1
     */
    scaleY?: number;

    /**
     * @default 0
     */
    rotation?: number;   //deg

    /**
     * @default 0
     */
    skewX?: number;  //deg

    /**
     * @default 0
     */
    skewY?: number;  //deg

    /**
     * @default 0
     */
    pivotX?: number; //0~1

    /**
     * @default 0
     */
    pivotY?: number; //0~1
}

export default class KuiComponent<Props = {}> extends Container {
    "constructor": typeof KuiComponent;

    /**
     * 定义组件的基本信息，默认配置
     */
    static readonly editorConfig = {
        movable: true,
        rotatable: true,
        scalable: true,
        skewable: true,
        defaultProps: {}
    };

    constructor(props: Props) {
        super();
        this.props = props;
        this.init();
        this.applyProps();
    }

    props: Props & TransformProps;

    /**
     * extend this to init UI
     */
    protected init(){}

    applyProps() {
        if (!this.props) {
            return;
        }
        
        //transform
        this.setTransform(
            this.props.x || 0,
            this.props.y || 0,
            this.props.scaleX == null ? 1 : this.props.scaleX,
            this.props.scaleY == null ? 1 : this.props.scaleY,
            (this.props.rotation || 0) / 180 * Math.PI,
            (this.props.skewX || 0) / 180 * Math.PI,
            (this.props.skewY || 0) / 180 * Math.PI,
            this.props.pivotX == null ? 0 : this.props.pivotX * this._boundsRect.width,
            this.props.pivotY == null ? 0 : this.props.pivotY * this._boundsRect.height
        )
    }

    static kuify(this: any, ctor: Function): any {
        const __extends =(function () {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d: any, b: any) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function (d: any, b: any) {
                extendStatics(d, b);
                let __: any = function(this: any) { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();

        let output = function (this: any, props?: any) {
            let self: any = ctor.call(this);
            self.props = props;
            self.init && self.init();
            self.applyProps();
            return self;
        }
        __extends(output, ctor);
        output.prototype.applyProps = ctor.prototype.applyProps || KuiComponent.prototype.applyProps;
        
        return output as any;
    }
}