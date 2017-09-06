(function(window){
  function Game(option){
    //作用  控制整个游戏进程的
    this.ctx=option.ctx;
    this.cs=option.cs;
    //有需要的图片
    this.imgArr=['birds','land','pipe1','pipe2','sky'];
    //游戏是否开始
    this.isRun=false;
    //时间相隔的数据
    this.startTime=new Date();
    this.endTime=0;
    this.Dvalue=0; //时间差
    //场景中所有的游戏对象
    this.roles=[];
    this.hero=null;
  }
  
  Game.prototype={
    constructor:Game,
    //开始游戏的功能
    start:function(){
      var that=this;
      this.isRun=true;
      //加载资源（当资源完成才能进行后续操作）
      this.loadImage(function(imgList){
        console.log(imgList);
        //初始化游戏对象
        that.initGame(imgList);
        //渲染
        that.render();
        //用户控制
        that.control();
      });
    },
	
    gameover:function(){
      this.isRun=false;
    },
    
    loadImage:function(callback){ //加载图片的方法
      var  imgList={}; //对象键有意义
      var count=0;//计数器
      var length=this.imgArr.length;
      for (var i = 0; i < this.imgArr.length; i++) {
        var obj=this.imgArr[i];
        var img=new Image();
        img.src='imgs/'+obj+'.png';
        imgList[obj]=img;
        img.onload=function(){
          count++; //记录加载完成图片的数列
          if(count>=length){
            callback&&callback(imgList);
          }
        }
      }
    },
    
    initGame:function(imgs){ // 创建游戏所有的游戏对象
      //天空
      for (var i = 0; i < 3; i++) {
        var sky=new Game.Sky({
          ctx:this.ctx,
          img:imgs['sky'],
          index:i
        });
        this.roles.push(sky); //追加到 roles中
      }
	  
      for (var i = 0; i < 6; i++) {
        var p=new Game.Pipe({
          ctx:this.ctx,
          upImg:imgs['pipe2'],
          downImg:imgs['pipe1'],
          index:i+1
        });
        this.roles.push(p);
      }
      
      var bird=new Game.Bird({
        ctx:this.ctx,
        img:imgs['birds']
      });
      this.hero=bird;
      this.roles.push(bird); //追加
      
      //陆地
      for(var i=0;i<4;i++){
        var land=new Game.Land({
          ctx:this.ctx,
          img:imgs['land'],
          index:i
        });
        this.roles.push(land);
      }
    },
	
    render:function(){ //把所有的游戏对象 渲染在画布上
      var that=this;
      //需要所有的对象都是不断重绘，清空画布
      // requestAnimationFrame(render);
      setInterval(function(){
        if(that.isRun) {
          that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
          that.ctx.beginPath();
          //算时间差
          that.endTime = new Date();
          that.Dvalue = that.endTime - that.startTime;
          that.startTime = that.endTime;
          
          // that.roles[0].draw(that.Dvalue);
          
          that.roles.forEach(function (v) {
            v.draw(that.Dvalue); //遍历渲染所有的对象
          })
          
          that.check();//碰撞检测
        }
      },50);
    },
	
    control:function(){ //用户控制
      var that=this;
      this.cs.onclick=function(){
        that.hero.speed=-0.3;
      }
    },
    check:function(){ // 判断游戏是否结束 计分功能
      if(this.ctx.isPointInPath(this.hero.x,this.hero.y)||this.hero.y<0||this.hero.y>this.ctx.canvas.height-120){
        this.isRun=false;
      }
    }
    
  }
  
  window.Game=Game;
})(window);