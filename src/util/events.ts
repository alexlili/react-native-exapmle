// 这是events.js
import {EventEmitter} from 'events';
const Events = new EventEmitter();

// loading
const Loading = () => {
  Events.emit('loading', true);
};
// cancel loading
const CancelLoading = () => {
  Events.emit('loading', false);
};
// toast
const Toast = (text: string) => {
  Events.emit('toast', text);
};

export {Loading, CancelLoading, Toast, Events};
