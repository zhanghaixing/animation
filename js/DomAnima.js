function DomAnima(id,options){
			this.container = document.querySelector(id);
			this.id  = id;
			this.timer = null;
			this.animaIndex = 1;
			this.default = {
				startDomIndex:1,
				endDomIndex:1,
				class:"index-",
				isLoop:false,
				fps:1000/12.5,
				loopNum:1,
				endFn:function(){},
				currentFn:function(i,self){}
			},

			(function(a,b){
	    		for(var attr in b){
	    			a[attr] = b[attr]
	    		}
	    	})(this.default,options)

		}

		DomAnima.prototype.init = function(){
			var self = this ;
			this.animaIndex = this.default.startDomIndex;
			this.timer = setInterval(function(){
				self.startAnima()
			},this.default.fps)
		}

		DomAnima.prototype.startAnima= function(){
			var self = this;

			if(parseInt(this.animaIndex) !== parseInt(this.default.endDomIndex)){

				

				if(!this.default.isLoop){
					
					this.container.removeChild(document.querySelector(this.id +">img"))
					
				}else{

					document.querySelector(this.id+">img." + this.default.class+this.animaIndex).classList.add("hide")
				}
				
				this.animaIndex ++;

				document.querySelector(this.id+">img." + this.default.class+this.animaIndex).classList.remove("hide")
				
				this.currentFn(this.animaIndex)

			}else{

				if(this.default.isLoop){

					this.container.lastChild.classList.add("hide")

					this.animaIndex = this.default.startDomIndex;

					this.container.children[0].classList.remove("hide")

					this.currentFn(this.animaIndex)

				}else{

					clearInterval(this.timer);
            		this.default.endFn();
            		return false
				}
			}
		}

		DomAnima.prototype.stopFn= function(){
	    	clearInterval(this.timer)
	    }
	    DomAnima.prototype.continue = function(){
	    	var self = this;
	    	this.timer = setInterval(function(){
	    		self.startAnima()
	    	},this.default.fps)
	    }
	   	DomAnima.prototype.currentFn = function(n){
	    	this.default.currentFn(n,this)
	    }
