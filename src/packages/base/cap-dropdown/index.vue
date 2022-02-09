<template>
  <Dropdown v-bind="$attrs" v-on="$listenser" class="cap-base-dropdown" :class="[ isSplit ? 'cap-base-dropdown-split-button':'', entity ? 'button-entity':'']">
    <Button type="primary" v-if="main">
      {{nameStr}} <i class="el-icon-arrow-down el-icon--right"></i>
    </Button>
    <span class="el-dropdown-link" v-else  @click="handleClick">
      {{nameStr}} <i v-if="!isSplit" class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <DropdownMenu class="cap-base-dropdownMenu" slot="dropdown">
      <DropdownItem :icon="item.icon" :command="item.command" :disabled="item.disabled" :divided="item.divided" :key="index" v-for="(item,index) in itemsArr">{{item.content}}</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import _ from 'lodash'
import {Dropdown,DropdownMenu,DropdownItem,Button} from 'element-ui'
export default {
  inheritAttrs: false,
  name: 'CapBaseDropdown',
  props:{
    name:{
      type:String,
      default:''
    },
    items:{
      type:Array,
      default:()=>[]
    },
    type:{
      type:String,
      default:undefined
    },
    main:{
      type:Boolean,
      default:false
    },
    entity:{
      type:Boolean,
      default:false
    },
  },
  data(){
    return {
      nameStr : this.name,
      itemsArr:this.items,
      id:'',
    }
  },
  components: {
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem
  },
  computed:{
    isSplit(){
      return this.$attrs['split-button'] == '' || this.$attrs['split-button'] == true
    },
    $listenser() {
      const _this = this
      return Object.assign({}, this.$listeners, {
        command: (val) => {
          if(this.isSplit){
            let items = _.cloneDeep(this.items)
            this.itemsArr = _.remove(items, function(n) {
              return n.command != val
            });
            const cur = _.find(items, ['command', val])
            this.nameStr = cur.content
            this.id = cur.command
          }
          this.$emit('command',val)
        },
      });
    }
  },
  mounted(){
    if(this.isSplit){
      let items = _.cloneDeep(this.items)
      this.nameStr = items[0].content
      this.id = items[0].command
      this.itemsArr = _.remove(items, function(n,index) {
        return index > 0
      });
    }
  },
  methods:{
    handleClick(){
      this.$emit('command',this.id)
    },
  },
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-base-dropdown{
    cursor: pointer;
    font-size: 12px;
    overflow: hidden;
    &:hover .el-dropdown-link{
      color: $blue;
    }
    &:hover .el-dropdown-link[disabled] {
      color: $color-bbb;
    }
    .el-icon--right{
      margin-left: 4px;
    }
    .el-button{
      font-size: 12px;
      padding: 8px 14px;
      border-radius: 0;
      background: $blue;
      border-color: $blue;
      transition:all .2s ease-in 0s;
      &[disabled],
      &[disabled]:hover {
        color: $color-b7b7b7;
        background: $color-f0f0f0;
        border-color: $color-eee;
      }
    }
    .el-button:hover{
      background: $blue-hover;
      border-color: $blue-hover;
    }
  }
  .cap-base-dropdown-split-button{
    >>> .el-button{
      font-size: 12px;
      padding: 8px 14px;
      border-radius: 0;
      background: $blue;
      border-color: $blue;
      color: $color-fff;
      margin-right:0;
      transition:all .2s ease-in 0s;
      &[disabled],
      &[disabled]:hover {
        color: $color-b7b7b7;
        background: $color-f0f0f0;
        border-color: $color-eee;
      }
      &.el-dropdown__caret-button{
        background: #1D85A0;
        border-color: #1D85A0;
        padding: 8px;
        width: 30px;
        &::before{
          background: inherit;
        }
        .el-dropdown__icon{
          margin:0;
        }
        &[disabled],
        &[disabled]:hover {
          color: $color-fff;
          background: $color-d9d9d9;
          border-color: $color-d9d9d9;
        }
      }
      
    }
    &:hover{
      >>> .el-button{
        background: #1D85A0;
        border-color: #1D85A0;
        &.el-dropdown__caret-button{
          background: #135F79;
          border-color: #135F79;
          &[disabled],
          &[disabled]:hover {
            color: $color-fff;
            background: $color-d9d9d9;
            border-color: $color-d9d9d9;
          }
        }
        .el-dropdown-link{
          color: $color-fff;
        }
        &[disabled]{
          color: $color-b7b7b7;
          background: $color-f0f0f0;
          border-color: $color-eee;
          .el-dropdown-link{
            color: $color-b7b7b7;
          }
        }
      }
      
    }
  }
  .cap-base-dropdown.button-entity{
    border:1px solid  $color-d4d4d4;
    transition:all .2s ease-in 0s;
    &:hover {
      color: $color-5b5b5b;
      border-color: $blue;
    }
    &[aria-disabled=true],
    &[aria-disabled=true]:hover{
      border-color: $color-e6e6e6;
    }
    .el-button{
      color: $color-5b5b5b;
      background: $color-fff;
      border: transparent;
      &[disabled],
      &[disabled]:hover{
        color: $color-b7b7b7;
        background: $color-f5f5f5;
        // border-color: $color-e6e6e6;
      }
    }
    &.cap-base-dropdown-split-button{
      border:1px solid  $color-d4d4d4;
      &[aria-disabled=true],
      &[aria-disabled=true]:hover{
        border-color: $color-e6e6e6;
      }
      &:hover {
        color: $color-5b5b5b;
        border-color: $blue;
      }
      >>> .el-button{
        color: $color-5b5b5b;
        background: $color-fff;
        border: transparent;
        &[disabled]{
          color: $color-b7b7b7;
          background: $color-f5f5f5;
          // border-color: $color-e6e6e6;
        }
        &.el-dropdown__caret-button{
          background: $color-f0f0f0;
          border: transparent;
          &[disabled]{
            color: $color-8e8e8e;
            background: $color-f0f0f0;
            // border-color: $color-e6e6e6;
          }
        }
      }
      &:hover{
        >>> .el-button{
          .el-dropdown-link{
            color: $color-5b5b5b;
          }
          border-color: $blue;
          &[disabled]{
            background: $color-f5f5f5;
            // border-color:  $color-e6e6e6;
            .el-dropdown-link{
              color: $color-b7b7b7;
            }
            &.el-dropdown__caret-button{
              background: $color-f0f0f0;
            }
          }
        }
      }
    }
  }
  .cap-base-dropdownMenu{
    border-radius: 0;
    padding: 5px 0;
    .el-dropdown-menu__item{
      font-size: 12px;
      line-height: 30px;
    }
    .el-dropdown-menu__item:focus,
    .el-dropdown-menu__item:hover{
      background-color: $color-f0f0f0 !important;
      color: $color-666;
    }
  }
</style>