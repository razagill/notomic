'use strict';
import Notomic from './notomic';

let notomicInstance = null;

export default function(options) {
	if (!notomicInstance) {
		notomicInstance = new Notomic(options);
	}
	return notomicInstance;
}