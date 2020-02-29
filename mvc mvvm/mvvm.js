var data = {
  val: 0
};

<div id='myapp'>
  <div>
    <span>{{ val }}rmb</span>
  </div>
  <div>
    <button v-on:click='sub(1)'>-</button>
    <button v-on:click='add(1)'>+</button>
  </div>
</div>;

new Vue({
  el: '#myapp',
  data: data,
  methods: {
    add(v) {
      if (this.val < 100) {
        this.val += v;
      }
    },
    sub(v) {
      if (this.val > 0) {
        this.val -= v;
      }
    }
  }
});
