import { Component, Fragment, Prop, h, Watch, State, EventEmitter, Event } from '@stencil/core';
import { format } from '../../utils/utils';
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
})
export class MyComponent {
  // @Event() dataChanged: EventEmitter<string>;
  // @Prop({reflect:true}) handleclick: (name: string) => void;
  //  * The first name
  //  */
  @Event() handleEvent: EventEmitter<string>;
  @Prop() first: string;
  @Prop() data: string;
  @Prop() myInnerArray: Array<string>;
  // /**
  //  * The middle name
  //  */
  @Prop() middle: string;

  // /**
  //  * The last name
  //  */
  @Prop() last: string;
  // @Prop() handleClick: (name: string) => void;
  @Prop({ mutable: true }) useauth: string;
  @State() useAuthState: { name: string };
  @State() count: number = 0;

  @Watch('useAuthState')
  handleSeeUseAuthState(newVal: Boolean) {
    if (newVal) console.log('useAuthState', newVal);
  }
  componentWillLoad() {
    console.log('componentWillLoad', this.useauth);
    this.parseMyObjectProp(this.useauth);
    this.parseMyArrayProp(this.data);
  }
  @Watch('useauth')
  parseMyObjectProp(newValue: string) {
    // console.log('newvalue', newValue);
    if (newValue) this.useAuthState = JSON.parse(newValue);
  }
  @Watch('myArray')
  parseMyArrayProp(newValue: string) {
    if (newValue) this.myInnerArray = JSON.parse(newValue);
  }
  private getText(): string {
    return format(this.first, this.middle, this.last);
  }
  // handleClick = (val: string) => {
  //   this.dataChanged.emit(val);
  // };

  // @Listen('IncreaseCount')
  // handleIncCount() {
  //   this.count = this.count + 1;
  // }

  handleClick = (val: string) => {
    this.handleEvent.emit(val);
  };
  render() {
    return (
      <Fragment>
        <slot name="nav"></slot>
        <div>Hello, World! I'm {this.getText()}</div>
        {this.useAuthState ? <p>{this.useAuthState?.name}</p> : <p>The useState value that you sent is :{this.useauth}</p>}

        <div class="header-main">
          <nav>
            <button onClick={this.handleClick.bind(this, 'Home')}>Home</button>
            <button>Register</button>
            <button>login</button>
            <button>Admin</button>
            <button>AboutUs</button>
            <button>Contact Us</button>
          </nav>
        </div>
        {/* <child-component count={this.count}>
          <p slot="inner-child">Inner Child Slot from my Component</p>
        </child-component> */}
      </Fragment>
    );
  }
}
