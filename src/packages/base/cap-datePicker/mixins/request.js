// import { getTimeInfo, getTimeList } from '../../../../request/commonDate'
export default {
    data() {
        return {
            commonDate: {},
        }
    },
    props: {
        requestData:{
            type: Object,
            default: () => null
        }
    },
    mounted() {
      if (this.requestData) { 
        this.commonDate =  require('../../../../request/commonDate')
        this.$nextTick(() => {
            this.getgetTimeList()
        })
      }
    },
    methods: {
        //设置时间
        async getTimeInfoData() {
            const curWay = this.shortcutList.filter(item => this.dateTypeStr.includes(item.type))
            let params = {
                timeWay:curWay[0].id,
                time_type: 99,
                start_time: this.timeVal[0],
                end_time: this.timeVal[1],
                c: 1,
                a: 1,
                time_type_bak: this.time_type,
                ...this.requestData
            }
            delete params['special_type']
            await this.commonDate.getTimeInfo(params)
        },
        //获取时间
        async getgetTimeList() {
            const time_type = 4
            let params = {
                c: 1,
                a: 1,
                time_type_bak: time_type,
                ...this.requestData
            }
            try {
                let { code, data } = await this.commonDate.getTimeList(params)
                if(code == 200 && data && data.list){
                    let { list, timeWay } = data;
                    let timeObj = list[timeWay] 
                    const {start_time,end_time,time_type_bak} = timeObj
                    this.timeVal = [start_time || '', end_time || '']
                    this.time_type = time_type_bak
                    
                    const obj = _.find(this.shortcutList, ['id', timeWay])
                    this.getShortcutIndext(timeWay,obj,false)
                    // this.shortcutIndext = timeWay
                    // this.dateTypeStr = 'weekrange'
                    // this.setShortcuts()
                    console.log('this.timeVal',this.timeVal)
                    this.$emit('responseData', { type:time_type_bak,time:this.timeVal})
                }
            } catch (error) {
                console.error('获取日期接口错误')
            }
        },   
    }
  }