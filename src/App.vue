<template>
  <a-config-provider :locale="zhCN">
    <div style="min-width: 768px">
      <a-row justify="center" :gutter="36">
        <a-col :xxl="12" :xl="12" :lg="12" :md="24" :sm="24" :xs="24" style="padding: 24px">
          <a-input-search
            v-model:value="query"
            placeholder="请输入中文，回车键翻译"
            enter-button
            @search="onSearch"
          />
          <a-alert
            message="上方输入框输入中文，按回车或点击右侧搜索即可在下方生成翻译，点击翻译可生成key"
            type="info"
            style="margin: 24px 0"
          />
          <a-list size="large" bordered :data-source="resultList" :loading="loading">
            <template #renderItem="{ item }">
              <a-list-item @click="handleParseKey(item.dst)"> {{ item.dst }} </a-list-item>
            </template>
          </a-list>
        </a-col>
        <a-col :xxl="12" :xl="12" :lg="12" :md="24" :sm="24" :xs="24" style="padding: 24px">
          <a-input-search
            v-model:value="translateKey"
            placeholder="请输入翻译后的文本"
            enter-button
            @search="handleParseKey"
          />
          <a-alert
            message="上方输入框输入翻译后的文本，按回车或点击右侧搜索即可生成key，点击key可复制"
            type="info"
            style="margin: 24px 0"
          />
          <a-list size="large" bordered :data-source="parseKeyList">
            <template #renderItem="{ item, index }">
              <a-list-item @click="handleCopy(`${keyArr[index]}${item}`)" style="cursor: copy">
                <span style="background-color: #ffe58f">{{ keyArr[index] }}</span
                >{{ item }}
              </a-list-item>
            </template>
          </a-list>
        </a-col>
      </a-row>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import axios from 'axios'
  import { md5 } from 'js-md5'
  import { useClipboard } from '@vueuse/core'
  import { message } from 'ant-design-vue'
  const query = ref<string>('')

  type ResultItem = {
    dst: string
    src: string
  }

  type ResultArray = ResultItem[]

  const resultList = ref<ResultArray>([])

  const loading = ref<boolean>(false)
  const onSearch = async (value: string) => {
    if (!value) {
      resultList.value = []
      parseKeyList.value = []
      return
    }
    const params = {
      q: value,
      appid: '20240826002132939',
      from: 'auto',
      to: 'en',
      salt: Math.floor(Math.random() * 9000000000) + 1000000000
    }
    const sign = md5(`${params.appid}${value}${params.salt}kUdphfHKbVB0pV2vc8Ri`)
    loading.value = true
    const response = await axios.get('https://fanyi-api.baidu.com/api/trans/vip/translate', {
      params: {
        ...params,
        sign
      }
    })
    loading.value = false

    if (response.status === 200 && response.data && response.data['trans_result']) {
      resultList.value = response.data['trans_result']
    }
  }

  const source = ref<string>('')
  const { copy, copied } = useClipboard({ source })
  const handleCopy = (value: string) => {
    source.value = value
    copy(value)
  }

  watch(copied, (newValue) => {
    newValue && message.success('复制成功')
  })

  const translateKey = ref<string>('')
  const keyArr = ['FIX_', 'TIP_TXT_', 'FLAG_', 'BTN_', 'MSGS_', 'MENU_', 'PAGE_']
  const parseKeyList = ref<string[]>([])

  const handleParseKey = (value: string) => {
    if (!value) {
      parseKeyList.value = []
      return
    }
    if (!/^[a-zA-Z0-9\s-]+$/.test(value)) {
      message.error('格式错误')
      parseKeyList.value = []
      return
    }
    translateKey.value = value
    parseKeyList.value = keyArr.map(() => {
      return `${processString(value)}`
    })
  }

  const processString = (inputStr: string) => {
    const cleanedStr = inputStr.trim().replace(/[^a-zA-Z0-9 \-]/g, '') // eslint-disable-line
    const replacedStr = cleanedStr.replace(/[ \-]/g, '_') // eslint-disable-line
    return replacedStr.toUpperCase()
  }
</script>
