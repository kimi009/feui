<template>
  <div class="weui-cell nuim-x-textarea">
    <div class="weui-cell__hd">
      <div :style="labelStyles" v-if="hasRestrictedLabel">
        <slot name="restricted-label"></slot>
      </div>
      <slot name="label">
        <label class="weui-label" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title" v-html="title"></label>
        <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
      </slot>
    </div>
    <div class="weui-cell__bd">
      <textarea
        class="weui-textarea"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :spellcheck="spellcheck"
        :placeholder="placeholder"
        :readonly="readonly"
        :name="name"
        :rows="rows"
        :cols="cols"
        v-model="currentValue"
        @focus="$emit('on-focus')"
        @blur="$emit('on-blur')"
        :style="textareaStyle"
        :maxlength="max"
        ref="textarea"></textarea>
      <div class="weui-textarea-counter" v-show="showCounter && max" @click="focus">
        <span>{{count}}</span>/{{max}}
      </div>
    </div>
  </div>
</template>

<script>
import Base from '../utils/base'
import InlineDesc from '../inline-desc'
import Autosize from 'autosize' // prop.autosize

export default {
  name:'fe-textarea',
  minxins: [Base],
  mounted () {
    if (this.$slots && this.$slots['restricted-label']) {
      this.hasRestrictedLabel = true
    }
    // prop.autosize
    this.$nextTick(() => {
      if (this.autosize) {
        this.bindAutosize()
      }
    })
    // prop.autosize
  },
  components: {
    [InlineDesc.name]:InlineDesc
  },
  props: {
    title: String,
    inlineDesc: String,
    showCounter: {
      type: Boolean,
      default: true
    },
    max: Number,
    value: String,
    name: String,
    placeholder: String,
    readonly: Boolean,
    rows: {
      type: Number,
      default: 3
    },
    cols: {
      type: Number,
      default: 30
    },
    height: Number,
    // https://github.com/yisibl/blog/issues/3
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
    },
    autosize: Boolean // prop.autosize
  },
  created () {
    this.currentValue = this.value
  },
  watch: {
    // prop.autosize
    autosize (val) {
      this.unbindAutosize()
      if (val) {
        this.bindAutosize()
      }
    },
    // prop.autosize
    value (val) {
      this.currentValue = val
    },
    currentValue (newVal) {
      if (this.max && newVal && newVal.length > this.max) {
        this.currentValue = newVal.slice(0, this.max)
      }
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    }
  },
  data () {
    return {
      hasRestrictedLabel: false,
      currentValue: ''
    }
  },
  computed: {
    count () {
      let len = 0
      if (this.currentValue) {
        len = this.currentValue.replace(/\n/g, 'aa').length
      }
      return len > this.max ? this.max : len
    },
    textareaStyle () {
      if (this.height) {
        return {
          height: `${this.height}px`
        }
      }
    },
    labelStyles () {
      return {
        width: this.$parent.labelWidth || (this.labelWidth + 'em'),
        textAlign: this.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight
      }
    },
    labelWidth () {
      return this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
    }
  },
  methods: {
    // prop.autosize
    bindAutosize () {
      Autosize(this.$refs.textarea)
    },
    unbindAutosize () {
      Autosize.destroy(this.$refs.textarea)
    },
    // prop.autosize
    focus () {
      this.$refs.textarea.focus()
    }
  },
  // prop.autosize
  beforeDestroy () {
    this.unbindAutosize()
  }
  // prop.autosize
}
</script>
