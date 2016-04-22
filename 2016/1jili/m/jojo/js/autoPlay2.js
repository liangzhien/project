'use strict';
var akong = window.akong || {};
akong.AutoPlay = function() {

}
akong.AutoPlay.prototype = {
	constructor: akong.AutoPlay,
	init: function(obj) {
		var self = this;
		self.callback = obj.callback || function(){},
		self.className = obj.className || 'hide',
		self.loop = obj.loop || false,
		self.curIndex = obj.curIndex || 0,
		self.limit = obj.limit || 5;
		self.orient = (obj.orient && obj.orient !== 'horizontal')?'vertical':'horizontal';
		self.time = obj.time || 500;
		self.dom = obj.dom;
		self.child = self.dom.children;
		self.maxIndex = self.child.length - 1;
		self.prevIndex = Math.min(self.maxIndex, self.curIndex);
		self.curIndex = self.prevIndex;
		self.direction = true;
		self.canPlay = true;
		self.end = function(target){
			var that = target,c = self.child,index = self.curIndex;
			if(that !== c[index]){
				return;
			}
			var c1S = c[self.prevIndex].style,
				c2S = c[index].style;
			requestAnimationFrame(function(){
				c1S.webkitTransition = '0s';
				c2S.webkitTransition = '0s';
				c[self.prevIndex].classList.add(self.className);
				c[self.prevIndex].classList.remove('active');
				c[self.curIndex].classList.add('active');
				self.canPlay = true;
				self.callback();
				self.prevIndex = index;
			});
		};
		Array.prototype.forEach.call(self.child, function(v, i) {
			if (i !== self.curIndex) {
				v.classList.add(self.className);
			}else{
				v.classList.add('active');
				v.classList.remove(self.className);
			}
			if (self.maxIndex < self.limit) {
				v.addEventListener('webkitTransitionEnd', function(e) {
					e.stopPropagation();
					self.end(v);
				});
			}
		});
		if (self.maxIndex >= self.limit) {
			self.dom.addEventListener('webkitTransitionEnd', function(e) {
				e.stopPropagation();
				self.end(e.target);
			});
		}
	},
	prev: function() {
		var i = this.curIndex,
			max = this.maxIndex;
		if(!this.loop && i === 0){
			return;
		}
		if (--i === -1) {
			i = max;
		}
		this.goto(i, false);
	},
	next: function() {
		var i = this.curIndex,
			max = this.maxIndex;
		if(!this.loop && i === max){
			return;
		}
		if (++i === max + 1) {
			i = 0;
		}
		this.goto(i, true);
	},
	goto: function(index, direction) {
		index = Math.min(index, this.maxIndex);
		if (!this.canPlay || this.prevIndex === index) {
			return;
		}
		this.canPlay = false;
		var c = this.child,
			c1S = c[this.prevIndex].style,
			c2S = c[index].style,
			time = this.time,
			cur = '0,0,0',prev = this.orient === 'horizontal'?'-100%,0,0':'0,-100%,0',next = this.orient === 'horizontal'?'100%,0,0':'0,100%,0';
		this.direction = typeof direction === 'boolean' ? direction : this.prevIndex < index;
		this.curIndex = index;
		if (this.direction) {
			c2S.webkitTransform = 'translate3d('+next+')';
			c[index].classList.remove(this.className);
			c[index].offsetHeight;
			requestAnimationFrame(function(){
				c1S.webkitTransition = '-webkit-transform ' + time + 'ms';
				c1S.webkitTransform = 'translate3d('+prev+')';
				c2S.webkitTransition = '-webkit-transform ' + time + 'ms';
				c2S.webkitTransform = 'translate3d('+cur+')';
			});
		} else {
			c2S.webkitTransform = 'translate3d('+prev+')';
			c[index].classList.remove(this.className);
			c[index].offsetHeight;
			requestAnimationFrame(function(){
				c1S.webkitTransition = '-webkit-transform ' + time + 'ms';
				c1S.webkitTransform = 'translate3d('+next+')';
				c2S.webkitTransition = '-webkit-transform ' + time + 'ms';
				c2S.webkitTransform = 'translate3d('+cur+')';
			});
		}
	}
}