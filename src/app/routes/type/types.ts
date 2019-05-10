export const classes = [
  {'title': '不限分类', 'key': 'pid', 'value': ''},
  {'title': '电影', 'key': 'pid', 'value': '1'},
  {'title': '连续剧', 'key': 'pid', 'value': '2'},
  {'title': '综艺', 'key': 'pid', 'value': '3'},
  {'title': '动漫', 'key': 'pid', 'value': '4'},
];

export const querys = [
  {'title': '精确查询', 'key': 'query', 'value': '1'},
  {'title': '模糊查询', 'key': 'query', 'value': '2'},
];

export const sorts = [
  {'title': '最新收录', 'key': 'sort', 'value': '1'},
  {'title': '最新上映', 'key': 'sort', 'value': '2'},
  {'title': '最多播放', 'key': 'sort', 'value': '3'},
];

export const years = [
  {'title': '不限年代', 'key': 'year', 'value': ''},
  {'title': '2019', 'key': 'year', 'value': '2019'},
  {'title': '2018', 'key': 'year', 'value': '2018'},
  {'title': '2017', 'key': 'year', 'value': '2017'},
  {'title': '2016', 'key': 'year', 'value': '2016'},
  {'title': '2015', 'key': 'year', 'value': '2015'},
  {'title': '2014', 'key': 'year', 'value': '2014'},
  {'title': '2013', 'key': 'year', 'value': '2013'},
  {'title': '2012', 'key': 'year', 'value': '2012'},
  {'title': '2011', 'key': 'year', 'value': '2011'},
  {'title': '2010', 'key': 'year', 'value': '2010'},
  {'title': '00年代', 'key': 'year', 'value': '00'},
  {'title': '90年代', 'key': 'year', 'value': '90'},
  {'title': '80年代', 'key': 'year', 'value': '80'},
  {'title': '70年代', 'key': 'year', 'value': '70'},
  {'title': '更早', 'key': 'year', 'value': '更早'},
];

export const areas = [
  {'title': '不限地区', 'key': 'area', 'value': ''},
  {'title': '大陆', 'key': 'area', 'value': '大陆'},
  {'title': '香港', 'key': 'area', 'value': '香港'},
  {'title': '台湾', 'key': 'area', 'value': '台湾'},
  {'title': '日本', 'key': 'area', 'value': '日本'},
  {'title': '韩国', 'key': 'area', 'value': '韩国'},
  {'title': '美国', 'key': 'area', 'value': '美国'},
  {'title': '法国', 'key': 'area', 'value': '法国'},
  {'title': '德国', 'key': 'area', 'value': '德国'},
  {'title': '英国', 'key': 'area', 'value': '英国'},
  {'title': '其他', 'key': 'area', 'value': '其他'},
];

export const allClasses = {
  '1': {
    'name': '电影',
    'children': [
      {'name': '全部电影', 'id': '1'},
      {'name': '动作片', 'id': '5'},
      {'name': '喜剧片', 'id': '6'},
      {'name': '爱情片', 'id': '7'},
      {'name': '科幻片', 'id': '8'},
      {'name': '恐怖片', 'id': '9'},
      {'name': '剧情片', 'id': '10'},
      {'name': '战争片', 'id': '11'},
      {'name': '纪录片', 'id': '12'},
      {'name': '音乐片', 'id': '13'},
      {'name': '微电影', 'id': '14'},
      {'name': '伦理片', 'id': '15'},
      {'name': '福利片', 'id': '16'},
    ]
  },
  '2': {
    'name': '连续剧',
    'children': [
      {'name': '全部连续剧', 'id': '2'},
      {'name': '国产剧', 'id': '17'},
      {'name': '香港剧', 'id': '18'},
      {'name': '台湾剧', 'id': '19'},
      {'name': '韩国剧', 'id': '20'},
      {'name': '日本剧', 'id': '21'},
      {'name': '欧美剧', 'id': '22'},
      {'name': '海外剧', 'id': '23'},
    ]
  },
  '3': {
    'name': '综艺',
    'children': [
      {'name': '全部综艺', 'id': '3'}
    ]
  },
  '4': {
    'name': '动漫',
    'children': [
      {'name': '全部动漫', 'id': '4'}
    ]
  },
};
