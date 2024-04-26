import { Component, h } from '@stencil/core';

@Component({
  tag: 'child-home',
  shadow: true,
})
export class MyComponent {
  render() {
    return (
      <div>
        <p>Child Comp</p>
        <inner-child></inner-child>
      </div>
    );
  }
}
