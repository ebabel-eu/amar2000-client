export default function raiseEvent(eventName, detail) {
  const event = new CustomEvent(eventName, {
    detail,
  });

  document.dispatchEvent(event);
}

// IE polyfill for CustomEvent.
try {
  new window.CustomEvent('test');
} catch (e) {
  const CustomEvent = (event, params) => {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    };

    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}
