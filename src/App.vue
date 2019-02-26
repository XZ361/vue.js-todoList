<template>
  <div id="app">
    <!-- vue之双向数据绑定，MVVM架构，M-model,V-view（视图），model的改变会影响view，同时view的改变会反过来model -->
    <!-- 通过vue双向数据绑定及vue事件机制来实现简单版本的TODOList -->
       <h2>ToDoList</h2>   
      <input type="text" v-model="todo" placeholder="请输入事项" @keydown="addDown($event)">
      <button @click="add($event)">+增加</button>
      <h2>进行中</h2>
      <br>
      <ul class="bing">
        <li v-for="(item,index) in list" :key="index" v-if="!item.checked">
          <input type="checkbox" v-model="item.checked" @change="saveList()"> {{index}}--{{item.title}}<button @click="del(index)" >-删除</button>
        </li>
      </ul>
      <br>
      <h2>已完成</h2>
      <br>
      <ul class="finish">
        <li v-for="(item,index) in list" :key="index" v-if="item.checked">
          <input type="checkbox" v-model="item.checked" @change="saveList()"> {{index}}--{{item.title}}<button @click="del(index)" >-删除</button>
        </li>
      </ul>
  </div>
</template>

<script>
import storage from './model/storage'
console.log(storage)
export default {
  name: 'app',
  data () {
    return {
      todo:'',
      list:[

      ]
      
    }
    
  },
  methods:{
    add(e){
      this.list.push({
          title:this.todo,
          checked:false
        });
        this.todo='';
       //用H5的API来缓存数据,并将对象处理成json字符串
       //localStorage.setItem('list',JSON.stringify(this.list));

       //用封装的模块来实现数据的存贮
       storage.set('list',this.list)
    },
    addDown(e){
      if(e.keyCode==13){
          this.list.push({
          title:this.todo,
          checked:false
        });
        this.todo='';
        //用H5的API来缓存数据,并将对象处理成json字符串
       //localStorage.setItem('list',JSON.stringify(this.list));

        //用封装的模块来实现数据的存贮
       storage.set('list',this.list)
      } 
    },
    del(key){
      // splice方法用于删除数组中对应下标的元素
       this.list.splice(key,1);
       //用H5的API来缓存数据,并将对象处理成json字符串
       //localStorage.setItem('list',JSON.stringify(this.list));

        //用封装的模块来实现数据的存贮
       storage.set('list',this.list)
    },
    saveList(){
       //localStorage.setItem('list',JSON.stringify(this.list));

        //用封装的模块来实现数据的存贮
       storage.set('list',this.list)
    }

  },
  mounted(){
    // vue生命周期函数 ，vue页面刷新就会触发的方法
    //将Json字符串转化成JSon对象
    var list=storage.get('list');
    if(list){
      //如果list为空报错
      this.list=list;
    }
  }
}
</script>

<style lang="scss">
#app{
  h2{
    margin-left: 25%;
  }
  input{
    width:300px;
    height:30px;
    margin-left: 35%;
  }
  button{
    width: 100px;
    height: 30px;
    line-height: 30px;
  }
  .bing{
    
    ul{
      width: 500px;
    }
    li{
      display: block;
      width: 100%;
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
      background: #eee;
      font-size: 24px;
      list-style-type: none;
    }
  }
  .finish{
    
    ul{
      width: 500px;
    }
    li{
      display: block;
      width: 100%;
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
      background: skyblue;
      font-size: 24px;
      list-style: none;
    }
  }
}

</style>
