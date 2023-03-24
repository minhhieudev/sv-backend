const express = require('express');
const app = express();

app.post("/search", async function (req, res) {
  let keyword = req.query.q
  let products = []
  if (keyword) {
    products = await db.product.find({ name: { $regex: keyword, $options: "i" } }, 'image price slug name ').limit(16)
  }

  return res.json({ success: true, products })
})

app.get("/home", async function (req, res) {
  let childCatRuuVang = await db.catalog.find({ parent: '634ad6e5507648b6b3be5e4f' }, '_id')
  let childCatRuuManh = await db.catalog.find({ parent: '634ad7b1baa4749ee570188d' }, '_id')
  let childCatWisky = await db.catalog.find({ parent: '634d86c088bf68a5d852eb8b' }, '_id')

  let ruuVang = await db.product.find({ catalogs: { $in: childCatRuuVang } }).sort({ createdAt: -1 }).select('image name price slug').limit(8)
  let ruuWisky = await db.product.find({ catalogs: { $in: childCatWisky } }).sort({ createdAt: -1 }).select('image name price slug').limit(8)
  let ruuManh = await db.product.find({ catalogs: { $in: childCatRuuManh } }).sort({ createdAt: -1 }).select('image name price slug').limit(8)
  let top = await db.product.find({ featured: true }, 'image name price slug').limit(8)
  let articleNews = await db.post.find({ }, 'image title description slug content').sort({ createdAt: -1 }).limit(4)

  let rs = {
    sliders: [
      {
        image: 'https://winelux.vn/upload/3163435906632922288636114378535671583720401njpg.jpeg',
        link: '/'
      }
    ],
    sections: [
      {
        title: 'TOP RƯỢU VANG',
        items: top.map(item => {
          item.price = item.price.regular
          return item
        })
      },
      {
        title: 'RƯỢU VANG NGON',
        items: ruuVang.map(item => {
          item.price = item.price.regular
          return item
        })
      },
      {
        title: 'RƯỢU WHISKY',
        items: ruuWisky.map(item => {
          item.price = item.price.regular
          return item
        })
      },
      {
        title: 'RƯỢU MẠNH',
        items: ruuManh.map(item => {
          item.price = item.price.regular
          return item
        })
      },
      {
        section_type: 'article_list',
        title: 'CHIA SẺ VỀ RƯỢU',
        items: articleNews
      }
    ]
  }

  rs.sections = rs.sections.filter(item => item.items.length)
  res.json(rs)
})

app.get("/init", async function (req, res) {
  let rs = {
    success: true,
    navs: navs,
    settings: settings
  }

  return res.json(rs)
})

module.exports = app;

const settings = {
  phone: '0986583722',
  meta_description: 'Wine Lux là cửa hàng rượu vang Đà Nẵng cung cấp các dòng rượu vang nhập khẩu chính hãng với giá thành tốt nhất',
  meta_title: 'Cửa Hàng Rượu Vang Chính Hãng - Rượu Đà Nẵng - Wine Lux',
  meta_keyword: '',
  bank_number: '9868868468',
  bank_user_name: 'Trần Đức Anh',
  bank_name: 'Vietcombank',
  address: '227B Nguyễn Công Trứ, An Hải Bắc, Sơn Trà, Đà Nẵng',
  email: 'hi@winelux.vn'
}

const navs = [
  {
    _id: 1,
    name: 'Trang chủ',
    slug: '/'
  },
  {
    _id: 2,
    name: 'Rượu vang',
    slug: '/ruou-vang',
    children: [
      {
        _id: 21,
        name: 'Rượu vang đỏ',
        slug: '/ruou-vang-do',
      },
      {
        _id: 22,
        name: 'Rượu vang trắng',
        slug: '/ruou-vang-trang',
      },
      {
        _id: 23,
        name: 'Rượu vang hồng',
        slug: '/ruou-vang-hong',
      },
      {
        _id: 24,
        name: 'Sparkling',
        slug: '/sparkling',
      },
      {
        _id: 24,
        name: 'Champagne',
        slug: '/champagne',
      }
    ]
  },
  {
    _id: 3,
    name: 'Whisky',
    slug: '/whisky',
    children: [
      {
        _id: 31,
        name: 'Single Malt Whisky',
        slug: '/single-malt-whisky',
      },
      {
        _id: 32,
        name: 'Blended Whisky',
        slug: '/blended-whisky',
      },
      {
        _id: 32,
        name: 'Blended Malt',
        slug: '/blended-malt',
      },
      {
        _id: 32,
        name: 'Grain Whisky',
        slug: '/grain-whisky',
      }
    ]
  },
  {
    _id: 3,
    name: 'Rượu mạnh',
    slug: '/ruou-manh',
    children: [
      {
        _id: 31,
        name: 'Vodka',
        slug: '/vodka',
      },
      {
        _id: 32,
        name: 'Gin',
        slug: '/gin',
      },
      {
        _id: 32,
        name: 'Rum',
        slug: '/rum',
      },
      {
        _id: 32,
        name: 'Soju',
        slug: '/soju',
      }
    ]
  },
  {
    _id: 4,
    name: 'Cigar',
    slug: '/cigar',
  },
  {
    _id: 5,
    name: 'Phụ kiện',
    slug: '/phu-kien',
  },
  {
    _id: 6,
    name: 'Quà tặng',
    slug: '/qua-tang',
  },
  {
    _id: 6,
    name: 'Bài viết',
    slug: '/bai-viet',
    children: [
      {
        _id: 31,
        name: 'Chia sẻ',
        slug: '/chia-se',
      },
      {
        _id: 32,
        name: 'Khuyến mãi',
        slug: '/khuyen-mai',
      },
      {
        _id: 32,
        name: 'Tin tức',
        slug: '/tin-tuc',
      }
    ]
  }
]