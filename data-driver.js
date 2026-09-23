// ============================================================
// 司机 SOP 数据
// ============================================================
const IMAGE_BASE_PATH = '';
const IMAGE_BASE_PATH_CAR = 'img/car/';
const IMAGE_BASE_PATH_MDAC = 'img/mdac/';
const VIDEO_BASE_PATH_MOUNTAIN = 'video/mountain/';

// ---------- 修车厂 ----------
const workshopData = [
    {
        name: "Workshop 1",
        phone: "https://wa.me/60187858789",
        phoneLabel: "杰",
        address: "68, Jalan Bakawali 52",
        addressMap: "https://www.google.com/maps/search/?api=1&query=68+Jalan+Bakawali+52+Johor+Malaysia",
        notes: "过去前打给他，跟他说你的车要弄什么（黑油/牙油/其他问题），看几点要过去，跟他通知就行"
    },
    {
        name: "Workshop 2",
        phone: "https://wa.me/60127008548",
        phoneLabel: "",
        address: "No 6, Jalan Bakawali 37, Taman Johor Jaya 81100",
        addressMap: "https://www.google.com/maps/search/?api=1&query=6+Jalan+Bakawali+37+Taman+Johor+Jaya+81100+Malaysia",
        notes: "钱他会对我收，如果不是很贵的直接弄就可以了，如果是贵的东西，打电话问我一下"
    },
    {
        name: "Workshop 3",
        phone: "https://wa.me/60167231217",
        phoneLabel: "",
        address: "No 1, Jalan Anggerik 36, Taman Johor Jaya",
        addressMap: "https://www.google.com/maps/search/?api=1&query=1+Jalan+Anggerik+36+Taman+Johor+Jaya+Malaysia",
        notes: "周日休息 · 9am-6pm · 4.30pm之前要放车过去"
    }
];

// ---------- 现金上交地点 ----------
const cashDropData = [
    {
        name: "Austin 家",
        address: "26, Jalan Austin Height 5/24",
        addressMap: "https://www.google.com/maps/search/?api=1&query=26+Jalan+Austin+Height+5/24+Johor+Malaysia",
        notes: "开门把钱塞进去家里门缝内，告诉我有多少钱"
    },
    {
        name: "坡地家",
        address: "2, Jalan Leban, Taman Melodies",
        addressMap: "https://www.google.com/maps/search/?api=1&query=2+Jalan+Leban+Taman+Melodies+Johor+Malaysia",
        notes: "不要门铃，我孩子有时候在睡觉，直接放进去信箱就行，记得推进去里面"
    },
    {
        name: "Horizon Hill 家",
        address: "24, Jalan Maya 3/5, Horizon Hill, 79100 Iskandar Puteri",
        addressMap: "https://www.google.com/maps/search/?api=1&query=24+Jalan+Maya+3/5+Horizon+Hill+Iskandar+Puteri+Malaysia",
        notes: "直接放进去信箱就行"
    }
];

// ---------- 免费停车地点 ----------
const parkingData = [
    { name: "Woodland", address: "Half Price Holdings, 5A Woodlands Centre Rd, Singapore 731005", addressMap: "https://www.google.com/maps/search/?api=1&query=Half+Price+Holdings+5A+Woodlands+Centre+Rd+Singapore", type: "free" },
    { name: "Changi", address: "Changi North Cres, Singapore 49", addressMap: "https://www.google.com/maps/search/?api=1&query=Changi+North+Cres+Singapore", type: "free" },
    { name: "Changi", address: "CHARGE+, 60 Tampines North Dr 2, Singapore 528764", addressMap: "https://www.google.com/maps/search/?api=1&query=60+Tampines+North+Dr+2+Singapore", type: "free" },
    { name: "Jurong Area", address: "Pusara Aman Mosque", addressMap: "https://www.google.com/maps/search/?api=1&query=Pusara+Aman+Mosque+Singapore", type: "toilet" },
    { name: "Jurong Area", address: "SELETAR CLUB ROAD", addressMap: "https://www.google.com/maps/search/?api=1&query=Seletar+Club+Road+Singapore", type: "toilet" },
    { name: "Jurong Area", address: "EDWARDS LIFESCIENCES", addressMap: "https://www.google.com/maps/search/?api=1&query=Edwards+Lifesciences+Singapore", type: "toilet" },
    { name: "Jurong Area", address: "GIANT HYPERMART TAMPINES", addressMap: "https://www.google.com/maps/search/?api=1&query=Giant+Hypermart+Tampines+Singapore", type: "toilet" },
    { name: "Jurong Area", address: "EAST COAST PARK", addressMap: "https://www.google.com/maps/search/?api=1&query=East+Coast+Park+Singapore", type: "toilet" },
    { name: "Jurong Area", address: "KENT RIDGE PARK", addressMap: "https://www.google.com/maps/search/?api=1&query=Kent+Ridge+Park+Singapore", type: "toilet" }
];

// ---------- 每天汽车检查项目 ----------
const dailyCheckItems = [
    "🌡️ 等车温度热了才走",
    "💧 检查 Tangki 水，记得每天加",
    "🛢️ 检查黑油够不够",
    "🌀 检查风扇有没有在转",
    "💨 检查 Tayar 风够吗",
    "🧽 洗车（三天一次，或严重肮脏必须清洗）",
    "🔧 检查 Spare Tayar 有没有风",
    "🔍 检查 Tayar 有没有中钉 / 花纹够不够",
    "👖 长裤包鞋一定要有，包鞋可以放车上",
    "👔 载顾客一定要穿包鞋长裤",
    "🧹 车子麻烦保持干净",
    "🚗 车跑太久了，不要马上拿车去洗，给车休息15分钟才去洗",
    "🚪 驾什么车都好都要帮顾客开关门，这个是我们的工作",
    "💳 检查 Autopass 卡是不是车牌号码有写上去",
    "📵 载的顾客不要跟顾客拿号码，也不要给顾客我的号码"
];

// ---------- 其他重要事项 ----------
const otherImportantItems = [
    "⛽ 如果车剩下半桶油，出来后就要马上在JB打油了才进去。如果你在SG打油，打SGD10只能Claim RM10（尽量不要载着顾客去打油，打好油才去接客）",
    "📸 拿车的时候，录一圈车视频跟只需要拍哪里有伤就可以了，没拍到的刚好伤到会直接Claim上一个司机❗️",
    "🚫 如果顾客在车上要订车还是问你价格，叫他联系回老板，你说你只是负责载人，价格方面不清楚。最近很多老板会叫自己的家人来用车然后来问司机价格，如果发现抢别人顾客或者我们的顾客，我将扣除所有工钱！",
    "🚗 普通路跑40-60，Highway 80-130，有超过的，真的没车情况下可以到140。我会注意看，到时候不要说没有提醒你们。如果有心要做的就跟着照做，我也不会去打扰你们做工。如果觉得不适应，提早2个礼拜通知就可以了，不会强留。麻烦大家互相配合下👍👍👍👍",
    "💰 如果要跟顾客收钱，记得在要到顾客家5分钟前的路上就跟顾客收钱，不要等到到顾客家了才收。如果顾客要转账记得不需要给顾客户口，你可以直接问顾客老板或者订车的人有给你吗，如果没有你才给我们的户口。切记❗️❗️❗️",
    "💵 大家最好的话是收Cash。如果不用收钱的单，顾客要转账肯定是转给老板户口（Agent）",
    "📞 顾客要给你钱才打给我们 @所有人",
    "📹 录视频拍照发去公司群就行，然后告诉我们有多少钱就行",
    "🛂 遇到JPJ Tuas报Kota Tinggi，可以打电话 <a href='https://wa.me/601137135219' target='_blank'>011-3713 5219</a> 跟他说你的车牌"
];

// ---------- 微信客户 ----------
const wechatItems = [
    "💬 如果你们有接到中国客 在微信群里 该怎么做",
    "📌 不需要写然后东西 除非有突发状况",
    "📌 不然的话 像他们这样写就行了"
];
const wechatImages = [
    { file: IMAGE_BASE_PATH + "weixin1.jpg", label: "微信示例 1" },
    { file: IMAGE_BASE_PATH + "weixin2.jpg", label: "微信示例 2" }
];

// ---------- Sentosa ----------
const sentosaItems = [
    "🏝️ 如果你们进岛SG Sentosa接客，你们会经过类似Toll的地方，跟顾客要求拿酒店信息或者照片里面这样的Code就不要用Autopass卡付费",
    "💰 很贵Autopass每次要SGD6好像，所以尽量跟顾客拿上面的照片其中一个东西"
];
const sentosaImages = [
    { file: IMAGE_BASE_PATH + "sentosa1.jpg", label: "Sentosa 示例 1" },
    { file: IMAGE_BASE_PATH + "sentosa2.jpg", label: "Sentosa 示例 2" }
];

// ---------- 新加坡海关 ----------
const customsItems = [
    "🛃 SG OFFICE 如果来到这里 代表顾客护照有问题 或者你的车将被检查",
    "🚫 如果你的autopass卡显示error或者路税到期了需要renew 需要过来这里",
    "✅ 走到这个镜子里面就是autopass office了"
];
const customsImages = [
    { file: IMAGE_BASE_PATH + "check1.jpg", label: "SG Office" },
    { file: IMAGE_BASE_PATH + "custom1.jpg", label: "Custom 1" },
    { file: IMAGE_BASE_PATH + "custom2.jpg", label: "Custom 2" },
    { file: IMAGE_BASE_PATH + "custom3.jpg", label: "Custom 3" },
    { file: IMAGE_BASE_PATH + "office.jpg", label: "Autopass Office" }
];

// ---------- 外国人入境须知 ----------
const mdacContent = [
    "⚠️ 请所有人注意以下事项⚠️",
    "凡事所有不是马来西亚人要入境马来西亚者，从12月7日开始必须填写入境白卡。",
    "大家可以到 Google Search Malaysia Digital Arrival Card 简称 mdac。",
    "你们可以通知你们的顾客在出国的3天里先将个人资料一一填写进去后，直接按Submit。",
    "请顾客将图片截图起来，以备保存以防万一他们在通关时面临什么问题。"
];
const mdacImages = [
    IMAGE_BASE_PATH_MDAC + "MDAC1.jpg",
    IMAGE_BASE_PATH_MDAC + "MDAC2.jpg",
    IMAGE_BASE_PATH_MDAC + "MDAC3.jpg",
    IMAGE_BASE_PATH_MDAC + "MDAC4.jpg",
    IMAGE_BASE_PATH_MDAC + "MDAC5.jpg",
    IMAGE_BASE_PATH_MDAC + "MDAC6.jpg"
];

// ---------- 公司银行账号 ----------
const bankDetails = {
    bank: "Touch N Go",
    beneficiary: "TEO GUAN KOK",
    account: "121821365832",
    phoneTransfer: "0164137585",
    note: "记得截图单据发给我们哦🧾"
};
const qrImages = [
    { file: IMAGE_BASE_PATH + "duitnow.jpg", label: "DuitNow" },
    { file: IMAGE_BASE_PATH + "tng.jpg", label: "Touch N Go" },
    { file: IMAGE_BASE_PATH + "zhifubao.jpg", label: "支付宝" }
];

// ============================================================
// 我们的车辆
// ============================================================
	const carData = [	
    {
        plate: "W1608Y",
        images: [
            { file: IMAGE_BASE_PATH_CAR + "1608.jpeg", label: "W1608Y" }
        ]
    },
    {
        plate: "QM1677F",
        images: [
            { file: IMAGE_BASE_PATH_CAR + "1677.jpeg", label: "QM1677F" }
        ]
    },
    {
        plate: "JUU4339",
        images: [
            { file: IMAGE_BASE_PATH_CAR + "4339.jpeg", label: "JUU4339" }
        ]
    },
    {
        plate: "FD2188",
        images: [
            { file: IMAGE_BASE_PATH_CAR + "2188.jpeg",     label: "FD2188" },
            { file: IMAGE_BASE_PATH_CAR + "2188side.jpeg", label: "FD2188 侧面" }
        ]
    },
    {
        plate: "QDB58",
        images: [
            { file: IMAGE_BASE_PATH_CAR + "58.jpeg",     label: "QDB58" },
            { file: IMAGE_BASE_PATH_CAR + "58side.jpeg", label: "QDB58 侧面" }
        ]
    }
];

// ============================================================
// 山路驾驶教学
// ============================================================
const mountainVideoData = [
    {
        title: "⛰️ 上山教学",
        desc: "上山时的正确驾驶方式与注意事项",
        file: VIDEO_BASE_PATH_MOUNTAIN + "upmountain.mp4"
    },
    {
        title: "⬇️ 下山教学",
        desc: "下山时的正确驾驶方式与注意事项",
        file: VIDEO_BASE_PATH_MOUNTAIN + "downmoutain.mp4"
    }
];

// ============================================================
// 阿杰修车厂 - 交钥匙教学
// ============================================================
const ahJieVideoData = [
    {
        title: "🔑 阿杰修车厂 – 交钥匙教学",
        desc: "把车停在修车厂后，如果修车厂还没开门，如何把钥匙交给师傅",
        file: IMAGE_BASE_PATH + "workshoppasskey.mp4"
    }
];

// ============================================================
// Alphard 车内功能教学
// ============================================================
const alphardVideoData = [
    {
        title: "🚐 Alphard 基本功能",
        desc: "Alphard 基本功能介绍",
        file: IMAGE_BASE_PATH + "howtoalphard.mp4"
    },
    {
        title: "🚪 Alphard 自动门按钮",
        desc: "自动门按钮的位置与使用方法",
        file: IMAGE_BASE_PATH + "autoshut.mp4"
    },
    {
        title: "⛽ Alphard 引擎盖和加油盖按钮",
        desc: "引擎盖与加油盖开关的位置",
        file: IMAGE_BASE_PATH + "bonet&fuel.mp4"
    },
    {
        title: "💺 Alphard 副驾座位调整",
        desc: "副驾驶座位的调整方式",
        file: IMAGE_BASE_PATH + "adjustseat.mp4"
    },
    {
        title: "💺 Alphard 后座座位调整",
        desc: "后座座位的调整方式",
        file: IMAGE_BASE_PATH + "middleseat.mp4"
    },
    {
        title: "🍽️ Alphard 后座收纳小桌子",
        desc: "后座隐藏小桌子的展开与收纳",
        file: IMAGE_BASE_PATH + "middletable.mp4"
    },
    {
        title: "🎛️ Alphard 后座操控按钮",
        desc: "后座控制面板的功能介绍",
        file: IMAGE_BASE_PATH + "rearadjust.mp4"
    },
    {
        title: "🧳 Alphard 后备仓操作 1",
        desc: "后备仓基本操作演示 1",
        file: IMAGE_BASE_PATH + "luggage1.mp4"
    },
    {
        title: "🧳 Alphard 后备仓操作 2",
        desc: "后备仓基本操作演示 2",
        file: IMAGE_BASE_PATH + "luggage2.mp4"
    }
];