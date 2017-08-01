function DrawCanvas(id,options){
			var self = this;
			this.oCanvas = document.querySelector(id)
			this.oContex = this.oCanvas.getContext('2d')
			this.timer = null;
    		this.startNum = 1;
    		this.default = {
		        imgs: [],
		        startImgIndex: 1,
		        endImgIndex: 1,
		        isLoop: false,
		        fps: 1000 / 12.5,
		        endFn: function () {
		        },
		        currentFn: function (i,self) {
		        }
		    };
			(function(a,b){
	    		for(var attr in b){
	    			a[attr] = b[attr]
	    		}
	    	})(this.default,options)
		}

		DrawCanvas.prototype.init = function () {
			console.log(this.oCanvas.width)
		   	var self = this;
		    this.startNum = this.default.startImgIndex;
		    this.timer = setInterval(function () {

		       self.drawStart();

		    }, this.default.fps)
		}

		DrawCanvas.prototype.drawStart = function(){
			var self = this;
			this.drawCurrentFn(this.startNum);
			this.oContex.save();
		    this.oContex.clearRect(0, 0, self.oCanvas.width, self.oCanvas.height);
		    this.oContex.drawImage(self.default.imgs[self.startNum-1], 0, 0, self.default.imgs[self.startNum-1].width, self.default.imgs[self.startNum-1].height, 0, 0, self.oCanvas.width, self.oCanvas.height);
		    //console.log(this.startNum)
		    if (parseInt(self.startNum) >= parseInt(this.default.endImgIndex)) {

		        if (this.default.isLoop == true) {

		            this.startNum = this.default.startImgIndex - 1;

		        }else {
		            clearInterval(this.timer);
		            this.default.endFn();
		            return false;
		        }
		    }

   			self.startNum++;
		}
		DrawCanvas.prototype.stopFn = function () {

		    clearInterval(this.timer);
		}

		DrawCanvas.prototype.continue = function(){
	    	var self = this;
	    	this.timer = setInterval(function(){
	    		self.drawStart();
	    	},this.default.fps)
	    }
		 
		DrawCanvas.prototype.drawCurrentFn = function (i) {
		    this.default.currentFn(i, this);
		}