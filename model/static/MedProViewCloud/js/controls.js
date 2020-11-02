var loading = new Vue({
	el: '#loading',
	data: {
		done: false,
		size: 0,
		allTotal: 0,
		proessString: '-- / --',
	},
	methods: {
		loadedPercent() {
			var allLoaded = 0;
			var total = 0;
			for (var i = 0; i < parts.length; ++i) {
				allLoaded += parseInt(parts[i].loaded);
			}
			this.size = ~~(allLoaded / this.allTotal * 100);
			total = this.allTotal;
			if (allLoaded < 1024 * 1024) {
				allLoaded = (allLoaded / 1024).toFixed(2) + "KB";
			} else {
				allLoaded = (allLoaded / 1024 / 1024).toFixed(2) + "MB";
			}
			if (total < 1024 * 1024) {
				total = (total / 1024).toFixed(2) + "KB";
			} else {
				total = (total / 1024 / 1024).toFixed(2) + "MB";
			}
			this.proessString = allLoaded + " / " + total;
		}
	},
});

var mixin = {
	props: ['allParts', 'colors'],
	data: function () {
		return {
			selectedPart: null,
			selectedObject: null,
		}
	},
	methods: {
		partShowChange: function (part) {

			part.show = !part.show;
			group.getObjectByName(part.id).material.visible = part.show;
		},
		viewReset: function () {
			orbitControls.reset();
		}
	}
};

var pcControls = {
	template: '#pc-controls',
	mixins: [mixin],
	data: function () {
		return {
			sliceBegin: 0,
			controlsItemLimit: 8,
			diff: 258,
			barWidth: 0, //需动态取得移动端透明度条的长度
			sliderLeft: 0, //取得e.clientX与slider的x差值
			color1: '#409EFF',
			partShow: true,

		}
	},


	computed: {
		isUpbtnShow: function () {
			return this.allParts.length > this.controlsItemLimit;
		},
		parts: function () {
			return this.allParts.slice(this.sliceBegin, this.sliceBegin + this.controlsItemLimit);
		}
	},
	mounted: function () {
		this._controlsResize();
		window.addEventListener('resize', this._controlsResize);

	},
	beforeDestroy: function () {
		window.removeEventListener('resize', this._controlsResize);
	},
	methods: {

		_controlsResize: function () {
			var limit = ~~((window.innerHeight - this.diff) / 85);
			if (limit !== this.controlsItemLimit) {
				// 当limit变动时，为防止出现各种错误，将以下参数重置就解决
				this.allParts.forEach(function (item) {
					item.colorPanShow = false;
				});
				this.sliceBegin = 0;
				this.controlsItemLimit = limit;
			}
		},
		colorPanbtnClick: function (part) {

			part.colorPanShow = !part.colorPanShow;
		},
		onchange: function (part) {

			document.querySelector(".colorBox").style.display = "block";
			var img = new Image();
			img.src = "./static/MedProViewCloud/img/main_color_bg2.png"
			var canvas = document.getElementById('MyCanvas');
			// var color = document.getElementById('color');

			canvas.width = 250;
			canvas.height = 250;
			var ctx = canvas.getContext('2d');
			img.onload = function () {
				// 在canvas上画图片
				ctx.drawImage(img, 0, 0, 250, 250);
			};
			var rgba;
			var _this = this;

			function pick(event) {

				// 获取鼠标坐标
				var x = event.layerX;
				var y = event.layerY;
				// 获取图片像素信息
				var pixel = ctx.getImageData(x, y, 1, 1);
				var data = pixel.data;
				// 获取rgba值
				rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + (data[3] / 255) + ')';

				// 设置小正方形的背景颜色
				// color.style.background = rgba;
				document.querySelector(".colorShow").style.background = rgba;

				_this.colorSelectings(rgba, part)
			}
			canvas.addEventListener('click', pick);

			//自定义颜色盘拖动
			var dv = document.querySelector(".colorBox");
			var x = 0;
			var y = 0;
			var l = 0;
			var t = 0;
			var isDown = false;
			//鼠标按下事件
			dv.onmousedown = function (e) {
				//获取x坐标和y坐标
				x = e.clientX;
				y = e.clientY;

				//获取左部和顶部的偏移量
				l = dv.offsetLeft;
				t = dv.offsetTop;
				//开关打开
				isDown = true;
				//设置样式  
				dv.style.cursor = 'move';
			}
			//鼠标移动
			window.onmousemove = function (e) {
				if (isDown == false) {
					return;
				}
				//获取x和y
				var nx = e.clientX;
				var ny = e.clientY;
				//计算移动后的左偏移量和顶部的偏移量
				var nl = nx - (x - l);
				var nt = ny - (y - t);

				dv.style.left = nl + 'px';
				dv.style.top = nt + 'px';
			}
			//鼠标抬起事件
			dv.onmouseup = function () {
				//开关关闭
				isDown = false;
				dv.style.cursor = 'default';
			}


		},
		showX: function (part) {
			document.querySelector(".colorBox").style.display = "none";
			part.colorPanShow = false;
		},
		colorSelecting: function (color, part) {
			part.color = color;
			part.colorPanShow = false;
			group.getObjectByName(part.id).material.color = new THREE.Color(color);
		},
		colorSelectings: function (color, part) {
			part.color = color;
			// part.colorPanShow = false;
			group.getObjectByName(part.id).material.color = new THREE.Color(color);
		},
		//pc
		sliderMouseDown: function (refName, part) {
			this.selectedPart = part;
			this.selectedObject = group.getObjectByName(part.id);
			var slider = this.$refs[refName][0];
			this.barWidth = this.$refs.pcbar[0].offsetWidth - slider.offsetWidth;
			if (event.type == 'touchstart') {
				this.sliderLeft = event.changedTouches[0].clientX - slider.offsetLeft + slider.offsetWidth / 2;
			} else {
				this.sliderLeft = event.clientX - slider.offsetLeft + slider.offsetWidth / 2;
			}
			
			// this.sliderLeft = slider.x - slider.offsetLeft + slider.offsetWidth / 2;
			console.log(this.sliderLeft);
			window.addEventListener('touchmove', this._windwoMouseMove);
			window.addEventListener('touchend', this._windwoMouseUp);
			window.addEventListener('mousemove', this._windwoMouseMove);
			window.addEventListener('mouseup', this._windwoMouseUp);
		},

		_windwoMouseMove: function (e) {

			var x = 0;
			if (typeof e.clientX === 'number') {
				x = e.clientX;
			} else if (e.targetTouches) {
				x = e.targetTouches[0].clientX;
			}
			var opacity = (x - this.sliderLeft) / this.barWidth;

			if (opacity < 0) {
				opacity = 0;
			} else if (opacity > 1) {
				opacity = 1;
			}

			this.selectedPart.opacity = opacity;

			this.selectedObject.material.opacity = opacity;
			if (opacity <= 0.75) {
				this.selectedObject.material.transparent = true;
				// this.selectedObject.material.depthWrite=false;
			} else {
				this.selectedObject.material.transparent = false;
				// this.selectedObject.material.depthWrite=true;
			}
		},

		_windwoMouseUp: function (e) {
			window.removeEventListener('mousemove', this._windwoMouseMove);
			window.removeEventListener('touchmove', this._windwoMouseMove);
			window.removeEventListener('mouseup', this._windwoMouseUp);
			window.removeEventListener('touchend', this._windwoMouseUp);
		},


		upbtnClick: function (dir) {
			this.sliceBegin += dir;
			if (this.sliceBegin < 0) {
				this.sliceBegin = 0;
			} else if (this.sliceBegin > this.allParts.length - this.controlsItemLimit) {
				this.sliceBegin = this.allParts.length - this.controlsItemLimit;
			}
		},
	}
};
var studyInfo = new Vue({
	el: '#study_info',
	data: {
		id: 13,
		patientName: '张大弟',
		recordNumber: 99911
	}
});

var header = new Vue({
	el: '#header',
	data: {
		operationShow: false,
	},
	methods: {
		operationbtnClick: function () {
			this.operationShow = !this.operationShow;
		},
	}
});




var mobileControls = {
	template: '#mobile-controls',
	props: ['verticesLimit'],
	mixins: [mixin],
	data: function () {
		return {
			controlsShow: false,
			modalShow: false,
			colorPanShow: false,
			barWidth: 0, //需动态取得移动端透明度条的长度
			sliderLeft: 0, //取得e.clientX与slider的x差值
		}
	},
	computed: {
		parts: function () {

			return this.allParts;
		}
	},
	methods: {

		modalClick: function (e) {
			// 排除点击到控件也会关闭
			if (e.target === e.currentTarget) {
				this.controlsShow = false;
			}
		},
		controlsTransitionEnd: function () {
			if (!this.controlsShow) {
				this.modalShow = false;
				this.colorPanShow = false;
				this.selectedPart = null;
			}
		},
		controlsExpand: function () {
			header.operationShow = false,
				this.modalShow = true;
			this.controlsShow = !this.controlsShow;
		},
		colorPanbtnClick: function (part) {
			if (this.selectedPart === part) {
				this.selectedPart = null;
				this.colorPanShow = false;
			} else {
				this.selectedPart = part;
				this.colorPanShow = true;
			}
		},
		colorSelecting: function (color) {
			this.selectedPart.color = color;
			group.getObjectByName(this.selectedPart.id).material.color = new THREE.Color(color);
			this.selectedPart = null;
			this.colorPanShow = false;
		},
		sliderMouseDown: function (e) {

			this.selectedObject = group.getObjectByName(this.selectedPart.id);
			var slider = this.$refs.slider;
			this.barWidth = this.$refs.bar.clientWidth - slider.clientWidth;
			this.sliderLeft = slider.x - slider.offsetLeft + slider.clientWidth / 2;
			window.addEventListener('touchmove', this._windwoMouseMove);
			window.addEventListener('touchend', this._windwoMouseUp);
			window.addEventListener('mousemove', this._windwoMouseMove);
			window.addEventListener('mouseup', this._windwoMouseUp);
		},
		_windwoMouseMove: function (e) {

			var x = 0;
			if (typeof e.clientX === 'number') {
				x = e.clientX;
			} else if (e.targetTouches) {
				x = e.targetTouches[0].clientX;
			}
			var opacity = (x - this.sliderLeft) / this.barWidth;
			if (opacity < 0) {
				opacity = 0;
			} else if (opacity > 1) {
				opacity = 1;
			}
			this.selectedPart.opacity = opacity;
			this.selectedObject.material.opacity = opacity;
			if (opacity <= 0.75) {
				this.selectedObject.material.transparent = true;
				// this.selectedObject.material.depthWrite=false;
			} else {
				this.selectedObject.material.transparent = false;
				// this.selectedObject.material.depthWrite=true;
			}

		},
		_windwoMouseUp: function (e) {

			window.removeEventListener('mousemove', this._windwoMouseMove);
			window.removeEventListener('touchmove', this._windwoMouseMove);
			window.removeEventListener('mouseup', this._windwoMouseUp);
			window.removeEventListener('touchend', this._windwoMouseUp);
		},

		//移动端点击显示
		verticesLimitOpen: function () {
			app.verticesLimit = false;
		}

	}
};

var app = new Vue({
	el: '#main',
	components: {
		'pc-controls': pcControls,
		'mobile-controls': mobileControls
	},
	data: {
		isMobile: false,
		loaded: false,
		verticesLimit: false,
		colors: [],
		allParts: [],
	},
	mounted: function () {
		window.addEventListener('resize', this._resetControlType);
	},
	methods: {
		loadingComplete: function () {
			this.loaded = true;
		},
		init: function () {
			this._resetControlType();

			parts.forEach(function (item) {
				item.show = true;
				item.colorPanShow = false;
			});

			this.allParts = parts;
			this.colors = colors;
		},
		_resetControlType: function () {
			this.isMobile = window.innerWidth <= 900;
		},
		//隐藏弹出框
		operationShow() {
			header.operationShow = false;
		}

	}
});