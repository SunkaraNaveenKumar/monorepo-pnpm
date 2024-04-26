import { Component, h, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'inner-child',
})
export class MyInnerChild {
  @Prop() count: number;
  @Event() IncreaseCount: EventEmitter<void>;
  handleInc = () => {
    this.IncreaseCount.emit();
  };
  render() {
    return (
      <div>
        <slot name="inner-child"/>
        <p>{this.count}</p>
        <button onClick={this.handleInc}>Inc</button>
      </div>
    );
  }
}
