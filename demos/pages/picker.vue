<template>
  <div class="page">
    <fe-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">Picker</fe-header>
    <div class="fe-content">
      <divider>默认，不设置默认值时选中第一个 {{year1}}</divider>
      <fe-picker :data='years' v-model='year1' @on-change='change'></fe-picker>
      <divider>异步加载及动态改变数据</divider>
      <fe-picker :data='years001' v-model='year001' @on-change='change'></fe-picker>
      <br>
      <fe-group>
        <fe-cell title="current value" :value="year001"></fe-cell>
      </fe-group>
      <fe-button type="primary" @click.native="changeValue([['1','3','5','7','9','11'],['2','3','4','5'],['a','b','c']])">Set Data1</fe-button>
      <fe-button type="primary" @click.native="changeValue([['1','3','5','7','9','11'],['2','3','4','5']])">Set Data1</fe-button>
      <fe-button type="primary" @click.native="changeValue([['2','4','6','8','10','11']])">Set Data2</fe-button>
      <br>
      <divider>设置默认值时</divider>
      <fe-picker :data='years' v-model='year2' @on-change='change'></fe-picker>
      <br>
      <divider>双向绑定</divider>
      <fe-picker :data='years' v-model='year3' @on-change='change3'></fe-picker>
      <select v-model='year5'>
        <option v-for='one in years[0]' :value='one.value' :key='one.index'>{{one.name}}</option>
      </select>
      <br>
      <divider>非联动多列</divider>
      <fe-picker :data='years1' v-model='year4' @on-change='change'></fe-picker>
      <br>
      <divider>五列</divider>
      <fe-picker :data='year6' v-model='year6Value' @on-change='change'></fe-picker>
      <br>
      <divider>地区联动: 当前值{{year7Value}} <br> 获取值对应的文字: {{$refs.picker1&&$refs.picker1.getNameValues()}}</divider>
      <fe-picker :data='year7' :columns=3 v-model='year7Value' @on-change='change' ref="picker1"></fe-picker>
      <fe-button @click.native="setData1" type="primary">set Value to ["USA", "usa002", "0005"]</fe-button>
      <fe-button @click.native="setData2" type="primary">set Value to ["china", "china002", "gz"]</fe-button>
      <fe-button @click.native="setList" type="primary">set List</fe-button>
      <br>
      <divider>3列的数据，只显示两列</divider>
      <fe-picker :data='year7' :fixed-columns="2" :columns=3 v-model='year8Value' @on-change='change'></fe-picker>
    </div>
  </div>
</template>
<script>
let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}
export default {
  methods: {
    changeValue (value) {
      this.years001 = value
    },
    change (value) {
      console.log('new Value', value)
    },
    change3 (value) {
      this.year5 = value[0]
    },
    setData1 () {
      this.year7Value = ['USA', 'usa002', '0005']
    },
    setData2 () {
      this.year7Value = ['china', 'china002', 'gz']
    },
    setList () {
      this.year7.push({
        name: '美国002_003',
        value: '0007',
        parent: 'usa002'
      })
    }
  },
  watch: {
    year5: {
      handler (val) {
        this.year3[0] = val
        // this.year3.$set(0, val)
        this.$set(this.year3, 0, val)
      },
      deep: true
    },
    change3 (value) {
      this.year5 = value[0]
    }
  },
  data () {
    return {
      years: [years],
      years001: [],
      year001: [],
      years1: [years, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
      year1: [''],
      year2: ['2002'],
      year3: ['2005'],
      year4: ['2002', '4'],
      year5: '2005',
      year6: [
        ['你', '我', '他'],
        ['you', 'I', 'him'],
        ['ni', 'wo', 'ta'],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1]
      ],
      year6Value: ['我', 'him', 'ni', '1', '2'],
      year7: [{
        name: '中国',
        value: 'china',
        parent: 0
      }, {
        name: '美国',
        value: 'USA',
        parent: 0
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china'
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china'
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA'
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA'
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001'
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001'
      }, {
        name: '广西001',
        value: 'gz',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'sz',
        parent: 'china002'
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001'
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001'
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002'
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002'
      }],
      year7Value: [],
      year8Value: []
    }
  }
}
</script>