'use strict';

import './notomic.scss';

class Notomic {
	constructor(options) {
		console.log(options);
		this.view = document.body.appendChild(document.createElement('div'));
		this.view.classList.add('notomic');
		this.isActive = false;
		this.queue = [];
		this.options = {};
		this.options.timeout = options.timeout ? options.timeout : 5000;
	}

	show(message, state) {
		if (this.isActive) {
			this.queue.push({message: message, state: state ? state : 'info' });
			return;
		}
		this.isActive = true;
		this.view.textContent = message;
		this.view.classList.add('notomic-visible');
		//Check if any state is supplied otherwise set it to info
		if (state) {
			this.view.classList.add(`notomic-${state}`);
		} else {
			this.view.classList.add('notomic-info');
		}

		this.queue.shift();
		setTimeout(() => this.hide(), this.options.timeout);
	}

	hide() {
		this.isActive = false;
		this.view.classList.remove('notomic-visible');
		this.view.classList.remove('notomic-info','notomic-error','notomic-success','notomic-warning');
		if (this.queue.length) {
			setTimeout(() => this.show(this.queue[0].message, this.queue[0].state), 250);
		}
	}
}

export default Notomic;