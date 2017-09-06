/**
 * Created by lili on 2017/8/26.
 */
;(function (Game) {
    function Sky(option) {
      this.ctx = option.ctx;
      this.img = option.img;
      this.index = option.index;
      this.x = 0;
      this.y = 0;
      this.width = this.img.width;
      this.height = this.img.height;
      this.offset = 0;
      
      this.scaleWidth = this.ctx.canvas.height/this.img.height*this.img.width;
      this.x =this.index * this.scaleWidth;//最终图片的宽
    }
    Sky.prototype = {
      comstructor:Sky,
      draw:function () {
          this.offset -= 10;
        if(this.offset <-this.scaleWidth){
          this.offset = 0;
        }
        var x = this.x +this.offset;
        this.ctx.drawImage(this.img,0,0,this.width,this.height,x,this.y,this.scaleWidth,this.ctx.canvas.height);
      }
      
    }
    
    
   Game.Sky=Sky;
})(Game)