const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
  routes: {
    type: [
      {
        key: String,
        label_cn: String,
        label_en: String
      }
    ],
    default: [
      {
        key: 'home',
        label_cn: '首页',
        label_en: 'HOME'
      },
      {
        key: 'work',
        label_cn: '作品',
        label_en: 'WORK'
      },
      {
        key: 'exhibition',
        label_cn: '展览',
        label_en: 'EXHIBITION'
      },
      {
        key: 'publication',
        label_cn: '出版物',
        label_en: 'PUBLICATION'
      },
      {
        key: 'new',
        label_cn: '新闻',
        label_en: 'NEW'
      },
      {
        key: 'biography',
        label_cn: '简历',
        label_en: 'BIOGRAPHY'
      },
      {
        key: 'contact',
        label_cn: '联系',
        label_en: 'CONTACT'
      }
    ]
  }
})
const MenuModel = mongoose.model('Menu', newSchema)
module.exports = MenuModel
