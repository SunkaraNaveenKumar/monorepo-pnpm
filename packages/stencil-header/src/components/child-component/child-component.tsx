import { Component, Fragment, Prop, h } from '@stencil/core';

@Component({
  tag: 'child-component',
  shadow: true,
})
export class MyFirstComponent {
  @Prop() count: number;
  render() {
    return (
      <Fragment>
        <inner-child count={this.count}>
          <slot name="inner-child" />
        </inner-child>
      </Fragment>
    );
  }
}
