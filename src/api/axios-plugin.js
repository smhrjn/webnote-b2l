
// This can be used in Vue as plugin as follows.
/**
		import AxiosPlugin from './axios-plugin.js';
		Vue.use(AxiosPlugin, '$axios');
		new Vue({
			created() {
				console.log(this.$axios ? 'Axios works!' : 'Uh oh..');
			}
		})
 */

import axios from 'axios';
export default {
	install: function(Vue, name = '$http') {
		Object.defineProperty(Vue.prototype, name, { value: axios });
	}
};
