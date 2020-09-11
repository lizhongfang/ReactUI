#### Buttom 按钮 组件功能Api描述

----------

样式规范： https://app.mockplus.cn/app/xSIVqCAMqaD/specs/mUSGhsTFfq
(初版只做 “常规主按钮” 和 “常规次按钮”)

##### PROPS

|  参数   | 说明  | 类型 | (可选)值(示例) |
|  ----  | ----  | ---- | ---- |
|  type  | 按钮类型 | String | 'primary': '常规主按钮', 不设置: '常规次按钮'。 详细设计样式遵照墨客设计规范 |
|  disabled  | 不可用状态 | Boolean | 默认 false |
|  loading | Loading状态 | Boolean | 默认 false |
|  onClick | 点击事件 | Function | function () {} |


##### Examples  

###### 用法 设置 type 属性
```javascript
    import { Button } from 'cc-ui';

    class App extends Component {
        constructor (props) {
            super(props);

            this.onClickBtn = this.onClickBtn.bind(this);
        }

        onClickBtn () {
            alert('Btn Clicked');
        }

        render () {
            return (
                <div>
                    <Button type="primary" onClick={this.onClickBtn}>常规主按钮</Button>
                    <Button onClick={this.onClickBtn}>常规次按钮</Button>
                </div>
            )
        }
        ...
    }
```

###### 用法 设置 disabled 属性
```javascript
    import { Button } from 'cc-ui';

    class App extends Component {
        constructor (props) {
            super(props);

            this.state = {
                btnDisabled: true
            };

            this.onClickBtn = this.onClickBtn.bind(this);
            this.toggleBtnDisable = this.toggleBtnDisable.bind(this);
        }

        onClickBtn () {
            alert('Btn Clicked');
        }

        toggleBtnDisable () {
            this.state.btnDisabled = !this.state.btnDisabled;
            this.setState({ btnDisabled: this.state.btnDisabled });
        }

        render () {
            return (
                <div>
                    <div><Button type="primary" disabled={this.state.btnDisabled} onClick={this.onClickBtn}>不可用常规主按钮</Button></div>

                    <div style={{ marginTop: 20px; }}>
                        CLICK <span onClick={this.toggleBtnDisable} style={{ fontWeight: 900 }}> HERE </span> TO Toggle Btn Disable: { this.state.btnDisabled }
                    </div>
                </div>
            );
        }
        ...
    }
```

###### 用法 设置 loading 属性
```javascript
    import { Button } from 'cc-ui';

    class App extends Component {
        constructor (props) {
            super(props);

            this.state = {
                btnLoading: false
            };

            this.onClickBtn = this.onClickBtn.bind(this);
        }

        onClickBtn () {
            this.state.btnLoading = true;
            this.setState({ btnLoading: this.state.btnLoading }, () => {
                setTimeout(() => {
                    this.state.btnLoading = false;
                    this.setState({ btnLoading: this.state.btnLoading });
                }, 5000); // 5秒后 Loading 结束
            });
        }

        render () {
            return (
                <div>
                    <div><Button type="primary" loading={this.state.btnLoading} onClick={this.onClickBtn}>确认</Button></div>
                </div>
            );
        }
        ...
    }
```
