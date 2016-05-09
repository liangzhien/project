'use strict';
/*by akong*/
var En = window.En || {};
En.Loading = function() {

}
En.Loading.prototype = {
	constructor: En.Loading,
	init: function(obj) {
		var self = this;
		obj.searchImgs = obj.searchImgs !== undefined ? obj.searchImgs : true;
		self.imgs1 = obj.imgs || [];
		self.imgs2 = [];
		self.debug = obj.debug || false;
		self.imgs3 = [];
		self.imgDoms = [];
		self.bgDoms = [];
		self.imgList = [
			[],
			[],
			[]
		];

		self.callback = obj.callback;
		self.enterCallback = obj.enterCallback;
		self.count = 0;
		document.body.offsetHeight;
		if (obj.searchImgs) {
			(function() {
				var imgs, type = obj.searchImgs.type || 'src';
				if (obj.searchImgs.dom) {
					imgs = obj.searchImgs.dom.getElementsByTagName('img');
				} else {
					imgs = document.images;
				}
				var i = 0,
					l = imgs.length;
				while (i < l) {
					(function(index) {
						var imgDom = imgs[index],
							src = imgDom.getAttribute('data-' + type);
						if (src) {
							imgDom.removeAttribute('data-' + type);
							self.imgDoms.push(imgDom);
							self.imgs2.push(src);
						}
					})(i);
					i++;
				}
			})();
		}
		if (obj.searchBgs) {
			var bgs, type = obj.searchBgs.type || 'bg';
			if (obj.searchBgs.dom) {
				bgs = obj.searchBgs.dom.getElementsByTagName('*');
			} else {
				bgs = document.getElementsByTagName('*');
			}
			var i = 0,
				l = bgs.length;
			while (i < l) {
				(function(index) {
					var bgDom = bgs[index],
						src = bgDom.getAttribute('data-' + type);
					if (src) {
						bgDom.removeAttribute('data-' + type);
						self.bgDoms.push(bgDom);
						self.imgs3.push(src);
					}
				})(i);
				i++;
			}
		}
		self.length = self.imgs1.length + self.imgs2.length + self.imgs3.length;
		if (self.length > 0) {
			//加载第一种用户自定义的图片
			self.loadImgs(self.imgs1, 0);
			//加载第二种页面的图片
			self.loadImgs(self.imgs2, 1);
			//加载第三种背景图片
			self.loadImgs(self.imgs3, 2);
		} else if (obj.callback) {
			obj.callback();
		}
	},
	loadImgs: function(imgs, type) {
		var self = this,
			i = 0,
			l = imgs.length;
		for (; i < l; i++) {
			self.loadImage(imgs[i], type, i);
		}
	},
	loadImage: function(imgSrc, type, index) {
		var self = this,
			img;
		switch (type) {
			case 0:
				img = new Image();
				self.imgList[type].push(img);
				img.src = imgSrc;
				break;
			case 1:
				img = self.imgDoms[index];
				self.imgList[type].push(img);
				img.src = imgSrc;
				break;
			case 2:
				img = new Image();
				img.src = imgSrc;
				self.imgList[type].push(img);
				self.bgDoms[index].style.backgroundImage = 'url(' + imgSrc + ')';
				break;
		}
		img.errorCount = 0;
		if (img.complete) {
			self.enter(img);
		} else {
			img.onload = function() {
				img.onload = null;
				self.enter(img);
			}
			img.onerror = function() {
				img.errorCount++;
				if (img.errorCount > 10) {
					img.onerror = null;
					if(self.debug){
						alert('有图片加载失败,' + imgSrc);
					}
					self.enter(img);
				} else {
					img.src = imgSrc;
					if (type == 2) {
						self.bgDoms[index].style.backgroundImage = 'url(' + imgSrc + ')';
					}
				}
			}
		}
	},
	enter: function(img) {
		var self = this;
		self.count++;
		if (self.enterCallback) {
			self.enterCallback(img);
		}
		if (self.count == self.length && self.callback) {
			document.body.offsetHeight;
			self.callback(img);
		}
	}
}