export default {
  type: 'page',
  title: '上传类组件事件',
  regions: ['body', 'toolbar', 'header'],
  body: [
    {
      type: 'tpl',
      tpl: 'InputFile上传类',
      inline: false,
      wrapperComponent: 'h2'
    },
    {
      type: 'form',
      debug: true,
      api: '/api/mock2/form/saveForm',
      body: [
        {
          type: 'group',
          body: [
            {
              name: 'trigger1',
              id: 'trigger1',
              type: 'action',
              label: 'clear触发器',
              level: 'primary',
              onEvent: {
                click: {
                  actions: [
                    {
                      actionType: 'clear',
                      componentId: 'clear-input-file',
                      description: '点击清除数据'
                    }
                  ]
                }
              }
            },
            {
              type: 'input-file',
              id: 'clear-input-file',
              name: 'file',
              multiple: true
            }
          ]
        }
      ]
    }
  ]
};
