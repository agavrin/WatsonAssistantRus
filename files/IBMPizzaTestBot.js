[
  {
    "id": "5b3f91be.e31f7",
    "type": "tab",
    "label": "IBMPizzaTestBot",
    "disabled": false,
    "info": ""
  },
  {
    "id": "c1d49100.49808",
    "type": "function",
    "z": "5b3f91be.e31f7",
    "name": "Сохранить контекст",
    "func": "context.flow.chatId = msg.payload.chatId;\ncontext.flow.type = msg.payload.type;\ncontext.QuestionCounter=1;\nmsg.payload = msg.payload.content;\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 432.5,
    "y": 43.062530517578125,
    "wires": [
      [
        "2e80e6c.aca4d1a"
      ]
    ]
  },
  {
    "id": "2e80e6c.aca4d1a",
    "type": "watson-conversation-v1",
    "z": "5b3f91be.e31f7",
    "name": "Watson Assistant",
    "workspaceid": "3c697d00-1a07-4ff3-962e-53e1c65ab9ff",
    "multiuser": false,
    "context": true,
    "empty-payload": false,
    "default-endpoint": true,
    "service-endpoint": "https://gateway.watsonplatform.net/conversation/api",
    "timeout": "",
    "optout-learning": false,
    "x": 677.625,
    "y": 73.31253051757812,
    "wires": [
      [
        "768bd5b2.2f153c",
        "c054f5e7.925108"
      ]
    ]
  },
  {
    "id": "768bd5b2.2f153c",
    "type": "function",
    "z": "5b3f91be.e31f7",
    "name": "Вспомнить контекст",
    "func": "msg.payload.chatId = context.flow.chatId;\nmsg.payload.type = context.flow.type;\na=msg.payload.output.text\nmsg.payload.content=\"\"\n\na.forEach(function(element) {\n  msg.payload.content=msg.payload.content+element+\" \";\n});\n\n//msg.payload.content = msg.payload.output.text[0];\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 839,
    "y": 136.25003051757812,
    "wires": [
      [
        "c7699fbe.29754"
      ]
    ]
  },
  {
    "id": "81d79414.7e6dd8",
    "type": "function",
    "z": "5b3f91be.e31f7",
    "name": "Not authorized user",
    "func": "msg.payload.content = \"You're not authorized user\";\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 239.75,
    "y": 601.75,
    "wires": [
      [
        "c7699fbe.29754"
      ]
    ]
  },
  {
    "id": "cc38bf5.291fd4",
    "type": "comment",
    "z": "5b3f91be.e31f7",
    "name": "Read.me",
    "info": "1) Create a Watson Conversation on IBM Cloud (https://www.bluemix.net)\n2) Create a Telegram Bot:\n   Open web.telegram.org\n   find BotFather (contact)\n   send /newbot\n   Give a name for your bot (Botfather will ask it)\n   Give a user name for it, which should have in the end \"Bot\"\n   The BotFather will give you a token.\n   ",
    "x": 81.5,
    "y": 84,
    "wires": []
  },
  {
    "id": "6f8d6c41.333f34",
    "type": "telegram receiver",
    "z": "5b3f91be.e31f7",
    "name": "",
    "bot": "e913f44.a55b208",
    "saveDataDir": "",
    "x": 96,
    "y": 210.31253051757812,
    "wires": [
      [
        "b7c194a1.6ac5e8"
      ],
      [
        "81d79414.7e6dd8"
      ]
    ]
  },
  {
    "id": "c7699fbe.29754",
    "type": "telegram sender",
    "z": "5b3f91be.e31f7",
    "name": "",
    "bot": "e913f44.a55b208",
    "x": 890.75,
    "y": 641.3125,
    "wires": [
      []
    ]
  },
  {
    "id": "110f1b8d.f3a394",
    "type": "visual-recognition-v3",
    "z": "5b3f91be.e31f7",
    "name": "Watson Visual Recognition",
    "vr-service-endpoint": "https://gateway.watsonplatform.net/visual-recognition/api",
    "image-feature": "classifyImage",
    "lang": "en",
    "x": 616.6111450195312,
    "y": 316.97918701171875,
    "wires": [
      [
        "519afded.0ee064",
        "8f26eec9.545c"
      ]
    ]
  },
  {
    "id": "64f5f156.9b0fe",
    "type": "function",
    "z": "5b3f91be.e31f7",
    "name": "Подготовка для распознавания",
    "func": "context.flow.chatId = msg.payload.chatId;\ncontext.flow.type = msg.payload.type;\nmsg.payload=msg.payload.weblink;\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 596.6111145019531,
    "y": 247.8680877685547,
    "wires": [
      [
        "110f1b8d.f3a394"
      ]
    ]
  },
  {
    "id": "519afded.0ee064",
    "type": "function",
    "z": "5b3f91be.e31f7",
    "name": "Подготовка для перевода",
    "func": "context.flow.englishResult = msg.result.images[0].classifiers[0].classes[0].class;\n\nreturn { payload: msg.result.images[0].classifiers[0].classes[0].class} ;",
    "outputs": 1,
    "noerr": 0,
    "x": 605.8333129882812,
    "y": 392.97918701171875,
    "wires": [
      [
        "120cdffe.a59fb",
        "c054f5e7.925108"
      ]
    ]
  },
  {
    "id": "b7c194a1.6ac5e8",
    "type": "switch",
    "z": "5b3f91be.e31f7",
    "name": "Текст или фото?",
    "property": "payload.type",
    "propertyType": "msg",
    "rules": [
      {
        "t": "eq",
        "v": "message",
        "vt": "str"
      },
      {
        "t": "eq",
        "v": "photo",
        "vt": "str"
      }
    ],
    "checkall": "true",
    "repair": false,
    "outputs": 2,
    "x": 310,
    "y": 160,
    "wires": [
      [
        "c1d49100.49808"
      ],
      [
        "64f5f156.9b0fe"
      ]
    ]
  },
  {
    "id": "495b5b4.619f0a4",
    "type": "function",
    "z": "5b3f91be.e31f7",
    "name": "Подготовка ответа",
    "func": "var newmsg = { \n    payload: \n    {\n        chatId:context.flow.chatId,\n        content: msg.payload+\" (\"+context.flow.englishResult+\")\",\n        type:\"message\"\n    } \n};\n\nreturn newmsg;\n",
    "outputs": 1,
    "noerr": 0,
    "x": 598.0556030273438,
    "y": 524.3333740234375,
    "wires": [
      [
        "c7699fbe.29754",
        "d67f3cf4.93eb2"
      ]
    ]
  },
  {
    "id": "120cdffe.a59fb",
    "type": "watson-translator",
    "z": "5b3f91be.e31f7",
    "name": "translator",
    "action": "translate",
    "basemodel": "en-nl",
    "domain": "general",
    "srclang": "en",
    "destlang": "ru",
    "password": "cV5vSP7sXY3F",
    "apikey": "",
    "custom": "",
    "domainhidden": "general",
    "srclanghidden": "en",
    "destlanghidden": "ru",
    "basemodelhidden": "en-nl",
    "customhidden": "",
    "filetype": "forcedglossary",
    "trainid": "",
    "lgparams2": true,
    "neural": false,
    "default-endpoint": true,
    "service-endpoint": "https://gateway.watsonplatform.net/language-translator/api",
    "x": 596.5,
    "y": 461,
    "wires": [
      [
        "495b5b4.619f0a4"
      ]
    ]
  },
  {
    "id": "d67f3cf4.93eb2",
    "type": "debug",
    "z": "5b3f91be.e31f7",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 955,
    "y": 523,
    "wires": []
  },
  {
    "id": "c51076e6.4270d8",
    "type": "inject",
    "z": "5b3f91be.e31f7",
    "name": "",
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "x": 1020,
    "y": 40,
    "wires": [
      []
    ]
  },
  {
    "id": "c054f5e7.925108",
    "type": "debug",
    "z": "5b3f91be.e31f7",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 900,
    "y": 220,
    "wires": []
  },
  {
    "id": "768cfde9.9255b4",
    "type": "inject",
    "z": "5b3f91be.e31f7",
    "name": "",
    "topic": "",
    "payload": "123",
    "payloadType": "str",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "x": 1190,
    "y": 180,
    "wires": [
      [
        "fed69474.a3ca88"
      ]
    ]
  },
  {
    "id": "fed69474.a3ca88",
    "type": "debug",
    "z": "5b3f91be.e31f7",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 1390,
    "y": 280,
    "wires": []
  },
  {
    "id": "8f26eec9.545c",
    "type": "debug",
    "z": "5b3f91be.e31f7",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 1090,
    "y": 100,
    "wires": []
  },
  {
    "id": "e913f44.a55b208",
    "type": "telegram bot",
    "z": "5b3f91be.e31f7",
    "botname": "Pizzabot",
    "usernames": "",
    "chatids": "",
    "baseapiurl": "",
    "pollinterval": ""
  }
]
