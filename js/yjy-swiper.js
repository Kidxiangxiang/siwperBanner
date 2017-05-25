var Swiper = function(opts) {

	this.queryString = opts.dom.substring(1) || ''; //以id来查新的字符串， opts.dom="#swiper01"
	this.swiperLength = 0; //需要滑动的个数
	this.navigation = opts.navigation || false; //是否显示小图标
	this.activeIndex = 0; //个数索引
	this.navigationDom = ''; //小图标容器
	this.pageX = 0;
	this.autoTime = opts.autoTime || 4000;
	this.auto = opts.auto || false;
	this.trans = [-window.innerWidth, 0, window.innerWidth];
	this.queryDom();
	if(this.swiperLength<2){
		this.list[0].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[1]) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[1]) + "px,0,0);transition:transform 0s;-webkit-transition:-webkit-transform 0s");
	}else{
		this.initDom().renderNavigation().bindEvent();
	}
	

}
Swiper.prototype = {
	//查找出dom便于先一步操作
	queryDom: function() {
		var queryString = this.queryString;
		this.dom = document.getElementById(queryString);
		this.list = this.dom.getElementsByClassName("swiper-list");
		this.navigationDom = this.dom.getElementsByClassName("swiper-navigation")[0];
		this.swiperLength = this.list.length;
		return this;

	},
	initDom: function() {
		//判断swiper-list的数量,数量大于2才会进一步操作
		this.list[0].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[1]) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[1]) + "px,0,0);transition:transform 0s;-webkit-transition:-webkit-transform 0s");
		this.list[1].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[2]) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[2]) + "px,0,0);transition:transform 0s;-webkit-transition:-webkit-transform 0s");
		return this;

	},

	//渲染圆形下标
	renderNavigation: function() {
		//不显示图形下标处理
		if(!this.navigation) return this;
		//显示图形下标处理
		//判断是否存在小标容器
		if(!this.navigationDom) return this;
		var html = '';
		for(var i = 0; i < this.swiperLength; i++) {
			if(i == this.activeIndex) {
				html += '<div class="active"></div>';
				continue;
			}
			html += '<div></div>';
		}
		this.navigationDom.innerHTML = html;
		return this;
	},
	bindEvent: function() {
		var _this = this;
		this.dom.addEventListener("touchstart", startHander);
		this.dom.addEventListener("touchmove", moveHander);
		this.dom.addEventListener("touchend", endHander);

		function startHander(evt) {
			evt.preventDefault();
			this.pageX = evt.touches[0].pageX;
			if(!_this.auto) return;
			clearInterval(_this.setInt);
		}

		function moveHander(evt) {
			evt.preventDefault();
			var x = evt.touches[0].pageX;
			var difX = x - this.pageX; //x轴差值
			
			_this.moveDom(difX);
		}

		function endHander(evt) {
			var x = evt.changedTouches[0].pageX;
			var difX = x - this.pageX;
			_this.endDom(difX);
			if(!_this.auto) return;
			_this.setInt = setInterval(function() {
				_this.moveDom("-4");
			    _this.endDom("-4");
			}, _this.autoTime);
		}
		if(!_this.auto) {
			return;
		}
		_this.setInt = setInterval(function() {
			_this.moveDom("-4");
			_this.endDom("-4");
		}, _this.autoTime);

	},
	//移动dom处理
	moveDom: function(difX) {
		var a, b, c;
		a = this.activeIndex;
		b = a + 1;
		c = a - 1;
		if(this.activeIndex == 0) {
			a = 0;
			b = 1;
			c = this.swiperLength - 1;
		}
		if(this.activeIndex == (this.swiperLength - 1)) {

			b = 0;
			c = a - 1;
		}
		if(this.swiperLength == 2) {
			if(difX > 0) return;
			this.list[a].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[1]+difX) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[1]+difX) + "px,0,0);transition:transform 0s;-webkit-transition:-webkit-transform 0s");
			this.list[b].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[2]+difX) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[2]+difX) + "px,0,0);transition:transform 0s;-webkit-transition:-webkit-transform 0s");
			return;
		}
		this.list[a].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[1]+difX) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[1]+difX) + "px,0,0);transition:transform 0s;-webkit-transition:-webkit-transform 0s");
		this.list[b].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[2]+difX) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[2]+difX) + "px,0,0);transition:transform 0s;-webkit-transition:-webkit-transform 0s");			
		this.list[c].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[0]+difX) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[0]+difX) + "px,0,0);transition:transform 0s;-webkit-transition:-webkit-transform 0s");
	},
	endDom: function(difX) {
		var a, b, c;
		a = this.activeIndex; //当前图片
		b = a + 1; //后一张图片
		c = a - 1; //前一张图片
		if(this.activeIndex == 0) {
			a = 0;
			b = 1;
			c = this.swiperLength - 1;
		}
		if(this.activeIndex == (this.swiperLength - 1)) {

			b = 0;
			c = a - 1;
		}
		var _this = this;
		if(difX > 0) {
			//往右滑
			//当前图片往右滑一屏
			if(this.swiperLength == 2) {
				return;
			}
			this.list[a].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[2]) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[2]) + "px,0,0);transition:transform .4s;-webkit-transition:-webkit-transform .4s");
			//后一张图片隐藏
			this.list[b].setAttribute("style","");
			//前一张图片往右滑一屏
			this.list[c].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[1]) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[1]) + "px,0,0);transition:transform .4s;-webkit-transition:-webkit-transform .4s");
			if(this.activeIndex == 0) {
				this.activeIndex = this.swiperLength - 1;
			} else {
				this.activeIndex = this.activeIndex - 1;
			}
		} else {
			//往左滑
			if(this.swiperLength == 2) {
				this.list[a].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[0]) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[0]) + "px,0,0);transition:transform .4s;-webkit-transition:-webkit-transform .4s");			
				this.list[b].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[1]) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[1]) + "px,0,0);transition:transform .4s;-webkit-transition:-webkit-transform .4s");
				setTimeout(function() {
					_this.list[a].setAttribute("style","z-index:20;transform:translate3d(" + (_this.trans[2]) + "px,0,0);-webkit-transform:translate3d(" + (_this.trans[2]) + "px,0,0);transition:transform 0s;-webkit-transition:-webkit-transform 0s");			
		
					if(_this.activeIndex == 1) {
						_this.activeIndex = 0;
					} else {
						_this.activeIndex =1;
					}
					_this.renderNavigation();
				}, 400)
				return;
			}
			this.list[a].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[0]) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[0]) + "px,0,0);transition:transform .4s;-webkit-transition:-webkit-transform .4s");			
			this.list[b].setAttribute("style","z-index:20;transform:translate3d(" + (this.trans[1]) + "px,0,0);-webkit-transform:translate3d(" + (this.trans[1]) + "px,0,0);transition:transform .4s;-webkit-transition:-webkit-transform .4s");	
			this.list[c].setAttribute("style","");
			if(this.activeIndex == this.swiperLength - 1) {
				this.activeIndex = 0;
			} else {
				this.activeIndex = this.activeIndex + 1;
			}
		}
		this.renderNavigation();

	}

}
