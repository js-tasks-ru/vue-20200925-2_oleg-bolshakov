import TopProgressBar from './index';
import TheTopProgressBar from './TheTopProgressBar';

export default {
  install(Vue, options) {

    const ComponentClass = Vue.extend(TheTopProgressBar);
    const instance = new ComponentClass();
    TopProgressBar.setInstance(instance);
    
    let { container, router } = options;
    if (!container) {
      container = document.createElement('div');
      document.body.appendChild(container);
    }

    if ( router ) {
      router.beforeEach((to, from, next) => {
        TopProgressBar.start();
        next();
      })
      router.afterEach((to, from) => {
        TopProgressBar.finish();
      })
      router.onError(() => {
        TopProgressBar.fail();
      })
    }

    Vue.prototype.$progress = instance.$mount(container);
  },
};