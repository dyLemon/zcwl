var loading=new Vue({
	el:'#loading',
	data:{
		total:0,
		ratio:1,// 压缩文件的话就是0.49。在index.html里面直接改了
		percents:[0],
		done:false
	},
	computed:{
		loadedPercent:function(){
			var sum=this.percents.reduce(function(a,b){
				return a+b;
			});
			if (this.total){
				var percent=~~(sum*this.ratio/this.total*100)
				return percent>99?99:percent;
			} else {
				return 0;
			}
		}
	}
});

var mixin={
	props:['allParts','colors'],
	data:function(){
		return {
			selectedPart:null,
			selectedObject:null,
		}
	},
	methods:{
		partShowChange:function(part){
			part.show=!part.show;
			group.getObjectByName(part.name).material.visible=part.show;
		},
		viewReset:function(){
			orbitControls.reset();
		}
	}
};
var pcControls={
	template:'#pc-controls',
	mixins:[mixin],
	data:function(){
		return {
			sliceBegin:0,
			controlsItemLimit:8,
			diff:258
		}
	},
	computed:{
		isUpbtnShow:function(){
			return this.allParts.length>this.controlsItemLimit;
		},
		parts:function(){
			return this.allParts.slice(this.sliceBegin,this.sliceBegin+this.controlsItemLimit);
		}
	},
	mounted:function(){
		this._controlsResize();
		window.addEventListener('resize',this._controlsResize);
	},
	beforeDestroy:function(){
		window.removeEventListener('resize',this._controlsResize);
	},
	methods:{
		_controlsResize:function(){
			var limit=~~((window.innerHeight-this.diff)/85);
			if (limit!==this.controlsItemLimit){
				// 当limit变动时，为防止出现各种错误，将以下参数重置就解决
				this.allParts.forEach(function(item){
					item.colorPanShow=false;
				});
				this.sliceBegin=0;
				this.controlsItemLimit=limit;
			}
		},
		colorPanbtnClick:function(part){
			part.colorPanShow=!part.colorPanShow;
		},
		colorSelecting:function(color,part){
			part.color=color;
			part.colorPanShow=false;
			group.getObjectByName(part.name).material.color=new THREE.Color(color);
		},
		sliderMouseDown:function(refName,part){
			this.selectedPart=part;
			this.selectedObject=group.getObjectByName(part.name);
			var slider=this.$refs[refName][0];
			window.addEventListener('mousemove',this._windwoMouseMove);
			window.addEventListener('mouseup',this._windwoMouseUp);
		},
		_windwoMouseMove:function(e){
			var opacity=(248-window.innerWidth+e.clientX)/228;
			if (opacity<0){
				opacity=0;
			} else if (opacity>1){
				opacity=1;
			}
			this.selectedPart.opacity=opacity;
			this.selectedObject.material.opacity=opacity;
			if (opacity<=0.75){
				this.selectedObject.material.transparent=true;
				// this.selectedObject.material.depthWrite=false;
			} else {
				this.selectedObject.material.transparent=false;
				// this.selectedObject.material.depthWrite=true;
			}
		},
		_windwoMouseUp:function(e){
			window.removeEventListener('mousemove',this._windwoMouseMove);
			window.removeEventListener('mouseup',this._windwoMouseUp);
		},
		upbtnClick:function(dir){
			this.sliceBegin+=dir;
			if (this.sliceBegin<0){
				this.sliceBegin=0;
			} else if (this.sliceBegin>this.allParts.length-this.controlsItemLimit){
				this.sliceBegin=this.allParts.length-this.controlsItemLimit;
			}
		},
	}
};

var studyInfo=new Vue({
	el:'#study_info',
	data:{
		id:13,
		patientName:'张大弟',
		recordNumber:99911
	}
});

var header=new Vue({
	el:'#header',
	data:{
		operationShow:false,
	},
	methods:{
		operationbtnClick:function(){
			this.operationShow=!this.operationShow;
		}
	}
});

var mobileControls={
	template:'#mobile-controls',
	props:['verticesLimit'],
	mixins:[mixin],
	data:function(){
		return {
			controlsShow:false,
			modalShow:false,
			colorPanShow:false,
			barWidth:0,//需动态取得移动端透明度条的长度
			sliderLeft:0,//取得e.clientX与slider的x差值
		}
	},
	computed:{
		parts:function(){
			return this.allParts;
		}
	},
	methods:{
		modalClick:function(e){
			// 排除点击到控件也会关闭
			if (e.target===e.currentTarget){
				this.controlsShow=false;
			}
		},
		controlsTransitionEnd:function(){
			if (!this.controlsShow){
				this.modalShow=false;
				this.colorPanShow=false;
				this.selectedPart=null;
			}
		},
		controlsExpand:function(){
			header.operationShow=false,
			this.modalShow=true;
			this.controlsShow=!this.controlsShow;
		},
		colorPanbtnClick:function(part){
			if (this.selectedPart===part){
				this.selectedPart=null;
				this.colorPanShow=false;
			} else {
				this.selectedPart=part;
				this.colorPanShow=true;
			}
		},
		colorSelecting:function(color){
			this.selectedPart.color=color;
			group.getObjectByName(this.selectedPart.name).material.color=new THREE.Color(color);
			this.selectedPart=null;
			this.colorPanShow=false;
		},
		sliderMouseDown:function(e){
			this.selectedObject=group.getObjectByName(this.selectedPart.name);
			var slider=this.$refs.slider;
			this.barWidth=this.$refs.bar.clientWidth-slider.clientWidth;
			this.sliderLeft=slider.x-slider.offsetLeft+slider.clientWidth/2;
			window.addEventListener('touchmove',this._windwoMouseMove);
			window.addEventListener('touchend',this._windwoMouseUp);
			window.addEventListener('mousemove',this._windwoMouseMove);
			window.addEventListener('mouseup',this._windwoMouseUp);
		},
		_windwoMouseMove:function(e){
			var x=0;
			if (typeof e.clientX==='number'){
				x=e.clientX;
			} else if (e.targetTouches){
				x=e.targetTouches[0].clientX;
			}
			var opacity=(x-this.sliderLeft)/this.barWidth;
			if (opacity<0){
				opacity=0;
			} else if (opacity>1){
				opacity=1;
			}
			this.selectedPart.opacity=opacity;
			this.selectedObject.material.opacity=opacity;
			if (opacity<=0.75){
				this.selectedObject.material.transparent=true;
				// this.selectedObject.material.depthWrite=false;
			} else {
				this.selectedObject.material.transparent=false;
				// this.selectedObject.material.depthWrite=true;
			}
		},
		_windwoMouseUp:function(e){
			window.removeEventListener('mousemove',this._windwoMouseMove);
			window.removeEventListener('touchmove',this._windwoMouseMove);
			window.removeEventListener('mouseup',this._windwoMouseUp);
			window.removeEventListener('touchend',this._windwoMouseUp);
		},
		verticesLimitOpen:function(){
			app.verticesLimit=false;
		}
	}
};

var app=new Vue({
	el:'#main',
	components:{
		'pc-controls':pcControls,
		'mobile-controls':mobileControls
	},
	data:{
		isMobile:false,
		loaded:false,
		verticesLimit:false,
		colors:[],
		allParts:[],
	},
	mounted:function(){
		window.addEventListener('resize',this._resetControlType);
	},
	methods:{
		loadingComplete:function(){
			this.loaded=true;
		},
		init:function(){
			this._resetControlType();
			parts.forEach(function(item){
			    item.show=true;
			    item.colorPanShow=false;
			});
			this.allParts=parts;
			this.colors=colors;
			loading.percents=parts.map(function(){return 0});
		},
		_resetControlType:function(){
            this.isMobile=window.innerWidth<=900;
        },
	}
});
