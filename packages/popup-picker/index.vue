<template>
  <div class="nuim-cell-box">
    <div class="weui-cell nuim-tap-active weui-cell_access" @click="onClick" v-show="showCell">
      <div class="weui-cell__hd">
        <label class="weui-label" :style="{display: 'block', width: $parent.labelWidth || $parent.$parent.labelWidth, textAlign: $parent.labelAlign || $parent.$parent.labelAlign, marginRight: $parent.labelMarginRight || $parent.$parent.labelMarginRight}" v-if="title" v-html="title"></label>
        <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
      </div>
      <div class="nuim-cell-primary  nuim-popup-picker-select-box">
        <div class="nuim-popup-picker-select" :style="{textAlign: valueTextAlign}">
          <span class="nuim-popup-picker-value" v-if="!displayFormat && !showName && value.length">{{value | array2string}}</span>
          <span class="nuim-popup-picker-value" v-if="!displayFormat && showName && value.length">{{value | value2name(data)}}</span>
          <span class="nuim-popup-picker-value" v-if="displayFormat && value.length">{{ displayFormat(value, value2name(value, data)) }}</span>
          <span v-if="!value.length && placeholder" v-html="placeholder" class="nuim-popup-picker-placeholder"></span>
        </div>
      </div>
      <div class="weui-cell__ft">
      </div>
    </div>

    <div v-transfer-dom="isTransferDom">
      <fe-popup v-model="showValue" class="nuim-popup-picker" :id="`nuim-popup-picker-${uuid}`" @on-hide="onPopupHide" @on-show="onPopupShow">
        <div class="nuim-popup-picker-container">
          <div class="nuim-popup-picker-header">
            <flexbox>
              <flexbox-item class="nuim-popup-picker-header-menu nuim-popup-picker-cancel" @click.native="onHide(false)">{{cancelText || '取消' }}</flexbox-item>
              <flexbox-item class="nuim-popup-picker-header-menu nuim-popup-picker-header-menu-right" @click.native="onHide(true)">{{confirmText || '完成' }}</flexbox-item>
            </flexbox>
          </div>
          <fe-picker
          :data="data"
          v-model="tempValue"
          @on-change="onPickerChange"
          :columns="columns"
          :fixed-columns="fixedColumns"
          :container="'#nuim-popup-picker-'+uuid"
          :column-width="columnWidth"></fe-picker>
        </div>
      </fe-popup>
    </div>

  </div>
</template>

<script>
import array2string from '../utils/array2String'
import value2name from '../utils/value2name'
import uuidMixin from '../utils/mixin_uuid'
import TransferDom from '../utils/transfer-dom'
import FlexboxItem from '../flexbox-item';
import Flexbox from '../flexbox';
import Popup from '../popup';
import Picker from '../picker';
import InlineDesc from '../inline-desc';
const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  directives: {
    TransferDom
  },
  name:'popup-picker',
  created () {
    if (typeof this.show !== 'undefined') {
      this.showValue = this.show
    }
  },
  components: {
    [Flexbox.name]: Flexbox,
    [FlexboxItem.name]: FlexboxItem,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [InlineDesc.name]: InlineDesc
  },
  mixins: [uuidMixin],
  filters: {
    array2string,
    value2name
  },
  props: {
    valueTextAlign: {
      type: String,
      default: 'right'
    },
    title: String,
    cancelText: String,
    confirmText: String,
    data: {
      type: Array,
      default () {
        return []
      }
    },
    placeholder: String,
    columns: {
      type: Number,
      default: 0
    },
    fixedColumns: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    showName: Boolean,
    inlineDesc: [String, Number, Array, Object, Boolean],
    showCell: {
      type: Boolean,
      default: true
    },
    show: Boolean,
    displayFormat: Function,
    isTransferDom: {
      type: Boolean,
      default: true
    },
    columnWidth: Array
  },
  methods: {
    value2name,
    getNameValues () {
      return value2name(this.currentValue, this.data)
    },
    onClick () {
      this.showValue = true
    },
    onHide (type) {
      this.showValue = false
      if (type) {
        this.closeType = true
        this.currentValue = getObject(this.tempValue)
      }
      if (!type) {
        this.closeType = false
        if (this.value.length > 0) {
          this.tempValue = getObject(this.currentValue)
        }
      }
    },
    onPopupShow () {
      // reset close type to false
      this.closeType = false
      this.$emit('on-show')
    },
    onPopupHide (val) {
      if (this.value.length > 0) {
        this.tempValue = getObject(this.currentValue)
      }
      this.$emit('on-hide', this.closeType)
    },
    onPickerChange (val) {
      if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
        // if has value, replace it
        if (this.value.length) {
          const nowData = JSON.stringify(this.data)
          if (nowData !== this.currentData && this.currentData !== '[]') {
            this.tempValue = getObject(val)
          }
          this.currentData = nowData
        } else { // if no value, stay quiet
          // if set to auto update, do update the value
        }
      }
      this.$emit('on-shadow-change', getObject(val))
    }
  },
  watch: {
    value (val) {
      if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
        this.tempValue = getObject(val)
      }
    },
    currentValue (val) {
      this.$emit('on-change', getObject(val))
      this.$emit('input', getObject(val))
    },
    show (val) {
      this.showValue = val
    }
  },
  data () {
    return {
      onShowProcess: false,
      tempValue: getObject(this.value),
      closeType: false,
      currentData: JSON.stringify(this.data), // used for detecting if it is after data change
      showValue: false,
      currentValue: this.value
    }
  }
}
</script>
