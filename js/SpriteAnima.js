

	    function SpritesAnima(id,options){
	    	this.sprites = document.getElementById(id);
	    	this.timer = null;
	    	this.animaIndex = 1; //表示当前的帧数
	    	this.default = {
	    		startSpritesIndex:1,//开始序号
	    		endSpritesIndex:1,//结束序号
	    		class:"sprites_",//默认class前缀
	    		isLoop:false,//默认不循环
	    		fps:1000/12.5,//默认1秒12张
	    		loopNum:1,//循环次数
	    		endFn:function(){},//结束函数处理
	    		currentFn:function(i,self){}//播放到指定位置的处理
	    	};

	    	//传入参数
	    	(function(a,b){
	    		for(var attr in b){
	    			a[attr] = b[attr]
	    		}
	    	})(this.default,options)

	    }
	    //初始化
	    SpritesAnima.prototype.init = function(){
	    	var self = this ;
	    	this.animaIndex = this.default.startSpritesIndex;

	    	this.timer = setInterval(function(){
	    		self.startAnima()
	    	},this.default.fps)
	    }

	    SpritesAnima.prototype.startAnima = function(){
	    	var slef = this;

	    	if( parseInt(this.animaIndex) !== parseInt(this.default.endSpritesIndex) ){ //正常情况
	    		
	    		this.sprites.classList.remove(this.default.class+this.animaIndex)

    			this.animaIndex ++;

    			this.sprites.classList.add(this.default.class+this.animaIndex)

    			this.currentFn(this.animaIndex)



	    	}else{//到最后一帧的处理

    			if(this.default.isLoop==true){//如果循环

	    			this.sprites.classList.remove(this.default.class+this.animaIndex)
	    			
	    			this.animaIndex = this.default.startSpritesIndex

	    			this.sprites.classList.add(this.default.class+this.animaIndex)

	    			this.currentFn(this.animaIndex)

	    		}else{//不循环 终止定时器，并且执行动画结束函数，终止本方法

	    			clearInterval(this.timer);
            		this.default.endFn();
            		return false
	    		}
	    	}

	    	//console.log(this.animaIndex)
	    }
	    SpritesAnima.prototype.stopFn= function(){
	    	clearInterval(this.timer)
	    }
	    SpritesAnima.prototype.continue = function(){
	    	var self = this;
	    	this.timer = setInterval(function(){
	    		self.startAnima(self.animaIndex)
	    	},this.default.fps)
	    }
	    SpritesAnima.prototype.currentFn = function(n){
	    	this.default.currentFn(n,this)
	    }