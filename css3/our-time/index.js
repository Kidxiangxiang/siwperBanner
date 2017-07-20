var bg = document.getElementById('bg');
var page = {
	x: 0,
	y: 0
}
var now = 0;
var wid = window.innerWidth;
console.log(wid);
bg.addEventListener("touchstart", function(evt) {
	//记录刚开始触摸的点，手指放上就触发
	page.x = evt.touches[0].pageX;
	page.y = evt.touches[0].pageY;
}, false); //事件在冒泡阶段执行

/*touches 当前位于屏幕上的所有手指的一个列表。
targetTouches 特定于事件目标的Touch对象的数组。[当前手指]
changeTouches 表示自上次触摸以来发生了什么改变的Touch对象的数组。*/

bg.addEventListener("touchmove", function(evt) {
	var x = evt.touches[0].pageX;
	var y = evt.touches[0].pageY;
	var difX = x - page.x; //x轴差值
	var difY = y - page.y; //y轴差值
	//垂直方向不做处理
	/*if(Math.abs(difX) < 40 && Math.abs(difY) > 100) {
		
		return;
	}*/
	//水平方向
	if(now == 0 && difX > 0) { //页面在初始位置还往右滑
		return;
	}
	if(now == (-wid * 3) && difX < 0) { //滑到最后还往左滑
		return;
	}
	if(Math.abs(difX) > 15 && Math.abs(difY) < 30) {
		evt.preventDefault();
		bg.style.transform = "translate3d(" + (now + Math.ceil(difX)) + "px,0,0)";
		bg.style.webkitTransform = "translate3d(" + (now + Math.ceil(difX)) + "px,0,0)";
		bg.style.transition = "transform 0s";
		bg.style.webkitTransition = "transform 0s";
		return;
	}

}, false);
bg.addEventListener("touchend", function(evt) {
	var x = evt.changedTouches[0].pageX;
	var y = evt.changedTouches[0].pageY;
	var difX = x - page.x; //x轴差值
	var difY = y - page.y; //y轴差值
	var jj = wid;
	//垂直方向不做处理
	/*if(Math.abs(difX) < 80 && Math.abs(difY) > 20) {
		bg.style.transform = "translate3d(" + now + "px,0,0)";
		bg.style.transition = "transform 0.3s";
		bg.style.webkitTransform = "translate3d(" + now + "px,0,0)";
		bg.style.webkitTransition = "transform 0.3s";
		return;
	}*/
	//水平方向
	if(Math.abs(difX) > 15 && Math.abs(difY) < 50) {
		if(difX < 0) {
			//往左滑动

			jj = (-wid);
		}
		if(now == 0 && difX > 0) { //页面在初始位置还往右滑
			bg.style.transform = "translate3d(" + now + "px,0,0)";
			bg.style.transition = "transform 0.3s";
			bg.style.webkitTransform = "translate3d(" + now + "px,0,0)";
			bg.style.webkitTransition = "transform 0.3s";
			return;
		}
		if(now == (-wid * 3) && difX < 0) { //滑到最后还往左滑
			bg.style.transform = "translate3d(" + now + "px,0,0)";
			bg.style.transition = "transform 0.3s";
			bg.style.webkitTransform = "translate3d(" + now + "px,0,0)";
			bg.style.webkitTransition = "transform 0.3s";
			return;
		}
		bg.style.transform = "translate3d(" + (now + jj) + "px,0,0)";
		bg.style.transition = "transform 0.3s";
		bg.style.webkitTransform = "translate3d(" + (now + jj) + "px,0,0)";
		bg.style.webkitTransition = "transform 0.3s";
		now = now + jj;

		return;
	} else { //滑动距离不够或者没有滑动
		bg.style.transform = "translate3d(" + now + "px,0,0)";
		bg.style.transition = "transform 0.3s";
		bg.style.webkitTransform = "translate3d(" + now + "px,0,0)";
		bg.style.webkitTransition = "transform 0.3s";

	}

}, false);