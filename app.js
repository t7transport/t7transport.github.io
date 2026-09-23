/* ============================================================
   app.js  —  旅行社 SOP 主逻辑（含招聘广告）
   ============================================================ */
(function() {
    "use strict";

    // ============================================================
    // 招聘广告配置（改这里即可）
    // ============================================================
    const RECRUIT_CONFIG = {
        title: "🚗 全職霸王車司机 | Full Time Driver 🇲🇾 JB",
        sub: "工作 20-22 天（可自选非周末休息天 / 天数）",
        whatsapp: "https://wa.me/60108887585",
        whatsappText: "💬 WhatsApp BENSON"
    };

    // ============================================================
    // DOM 引用
    // ============================================================
    const driverList       = document.getElementById('driverList');
    const adminList        = document.getElementById('adminList');
    const recruitContainer = document.getElementById('recruitContainer');

    const driverCount  = document.getElementById('driverCount');
    const adminCount   = document.getElementById('adminCount');
    const totalCount   = document.getElementById('totalCount');
    const progressInfo = document.getElementById('progressInfo');

    const tabDriver  = document.getElementById('tabDriver');
    const tabAdmin   = document.getElementById('tabAdmin');
    const tabRecruit = document.getElementById('tabRecruit');
    const driverTab  = document.getElementById('driverTab');
    const adminTab   = document.getElementById('adminTab');
    const recruitTab = document.getElementById('recruitTab');

    const modal    = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    // ============================================================
    // 统计
    // ============================================================
    function updateStats() {
        const driverTotal =
            carData.length +              // 🚗 车辆
            workshopData.length +
            cashDropData.length +
            parkingData.length +
            dailyCheckItems.length +
            otherImportantItems.length +
            mountainVideoData.length +    // 🏔️ 山路教学
			ahJieVideoData.length +       // 🔑 阿杰交钥匙
			alphardVideoData.length +     // 🚐 Alphard 教学

            1 + // 微信
            1 + // Sentosa
            1 + // 海关
            1 + // 银行
            1;  // mdac

        const adminTotal = adminSOP.length;
        const total = driverTotal + adminTotal;

        driverCount.textContent  = driverTotal;
        adminCount.textContent   = adminTotal;
        totalCount.textContent   = `${total} 项`;
        progressInfo.textContent = `📊 共 ${total} 条规则`;
    }

    // ============================================================
    // HTML 生成器
    // ============================================================
    function generateWorkshopHTML(ws) {
        let html = '';
        html += `<span class="ws-line label"><span class="ws-icon">🔧</span> ${ws.name}</span>`;
        let phoneDisplay = ws.phoneLabel ? `${ws.phoneLabel} · ` : '';
        html += `<span class="ws-line phone">📞 ${phoneDisplay}<a href="${ws.phone}" target="_blank">${ws.phone.replace('https://wa.me/', '')}</a></span>`;
        html += `<span class="ws-line address">📍 <a href="${ws.addressMap}" target="_blank">${ws.address}</a></span>`;
        if (ws.notes) {
            html += `<span class="ws-line" style="color:#4f6b81;font-size:0.88rem;">📌 ${ws.notes}</span>`;
        }
        return html;
    }

    function generateCashDropHTML(cd) {
        let html = '';
        html += `<span class="ws-line label"><span class="ws-icon">🏠</span> ${cd.name}</span>`;
        html += `<span class="ws-line address">📍 <a href="${cd.addressMap}" target="_blank">${cd.address}</a></span>`;
        if (cd.notes) {
            html += `<span class="ws-line" style="color:#4f6b81;font-size:0.88rem;">📌 ${cd.notes}</span>`;
        }
        return html;
    }

    function generateParkingHTML(p) {
        let html = '';
        html += `<span class="ws-line label"><span class="ws-icon">🅿️</span> ${p.name}</span>`;
        if (p.type === 'free') {
            html += `<span class="ws-line tag free">🆓 免费停车</span>`;
        } else if (p.type === 'toilet') {
            html += `<span class="ws-line tag toilet">🆓 免费停车 + 🚻 附近有厕所</span>`;
        }
        html += `<span class="ws-line address">📍 <a href="${p.addressMap}" target="_blank">${p.address}</a></span>`;
        return html;
    }

    function generateDailyCheckHTML(item) {
        return `<span class="ws-line check-item"><span class="check-icon">☑️</span> ${item}</span>`;
    }

    function generateOtherImportantHTML(item) {
        return `<span class="ws-line check-item"><span class="check-icon">📌</span> ${item}</span>`;
    }

    function generateWechatHTML(item) {
        return `<span class="ws-line check-item"><span class="check-icon">💬</span> ${item}</span>`;
    }

    function generateSentosaHTML(item) {
        return `<span class="ws-line check-item"><span class="check-icon">🏝️</span> ${item}</span>`;
    }

    function generateCustomsHTML(item) {
        return `<span class="ws-line check-item"><span class="check-icon">🛃</span> ${item}</span>`;
    }

    function getErrorSVG() {
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23fce4e4'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23c0392b' font-size='14' font-weight='bold' font-family='sans-serif'%3E图片加载失败%3C/text%3E%3C/svg%3E`;
    }

    function generateImagesHTML(images) {
        let html = `<div class="image-grid">`;
        for (const img of images) {
            const errorImg = getErrorSVG();
            html += `
                <div class="image-item">
                    <span class="image-label">${img.label}</span>
                    <img src="${img.file}"
                         data-src="${img.file}"
                         alt="${img.label}"
                         onclick="openModal(this)"
                         onerror="this.src='${errorImg}'" />
                </div>
            `;
        }
        html += `</div>`;
        return html;
    }

    function generateBankHTML() {
        let html = '';
        html += `<span class="ws-line label"><span class="ws-icon">🏦</span> 银行：${bankDetails.bank}</span>`;
        html += `<span class="ws-line">👤 收款人：${bankDetails.beneficiary}</span>`;
        html += `<span class="ws-line">💳 TNG账号：${bankDetails.account}</span>`;
        html += `<span class="ws-line">📱 手机号转账：${bankDetails.phoneTransfer}</span>`;
        html += `<span class="ws-line" style="color:#4f6b81;font-size:0.88rem;">📌 ${bankDetails.note}</span>`;

        html += `<div class="image-grid">`;
        for (const qr of qrImages) {
            const errorImg = getErrorSVG();
            html += `
                <div class="image-item">
                    <span class="image-label">${qr.label}</span>
                    <img src="${qr.file}"
                         data-src="${qr.file}"
                         alt="${qr.label} QR Code"
                         onclick="openModal(this)"
                         onerror="this.src='${errorImg}'" />
                </div>
            `;
        }
        html += `</div>`;
        return html;
    }

    function generateMDACHTML() {
        let html = '';
        for (const line of mdacContent) {
            const isImportant = line.includes('⚠️');
            html += `<span class="ws-line ${isImportant ? 'important' : ''}">${line}</span>`;
        }
        html += `<div class="image-grid">`;
        for (let i = 0; i < mdacImages.length; i++) {
            const imgFile = mdacImages[i];
            const label = `步骤 ${i + 1}`;
            const errorImg = getErrorSVG();
            html += `
                <div class="image-item">
                    <span class="image-label">${label}</span>
                    <img src="${imgFile}"
                         data-src="${imgFile}"
                         alt="mdac 步骤 ${i + 1}"
                         onclick="openModal(this)"
                         onerror="this.src='${errorImg}'" />
                </div>
            `;
        }
        html += `</div>`;
        return html;
    }
	
	function generateCarHTML(car) {
        let html = '';
        html += `<span class="ws-line label"><span class="ws-icon">🚗</span> ${car.plate}</span>`;

        html += `<div class="image-grid">`;
        for (const img of car.images) {
            const errorImg = getErrorSVG();
            html += `
                <div class="image-item">
                    <span class="image-label">${img.label}</span>
                    <img src="${img.file}"
                         data-src="${img.file}"
                         alt="${img.label}"
                         onclick="openModal(this)"
                         onerror="this.src='${errorImg}'" />
                </div>
            `;
        }
        html += `</div>`;
        return html;
    }

    // ============================================================
    // 生成影片 HTML
    // ============================================================
    function generateVideoHTML(video) {
        let html = '';
        html += `<div class="video-item">`;
        html += `<span class="video-title">${video.title}</span>`;
        if (video.desc) {
            html += `<span class="video-desc">${video.desc}</span>`;
        }
        html += `
            <video controls preload="metadata" playsinline>
                <source src="${video.file}" type="video/mp4">
                您的浏览器不支持影片播放。
            </video>
        `;
        html += `</div>`;
        return html;
    }
	
    // ============================================================
    // 折叠模块生成
    // ============================================================
    function createCollapseSection(title, icon, count, items, renderFn) {
        const section = document.createElement('li');
        section.className = 'collapse-section';
        section.style.listStyle = 'none';

        const header = document.createElement('div');
        header.className = 'collapse-header';
        header.innerHTML = `
            <span class="title">${icon} ${title} <span style="font-weight:400;color:#6d8aa8;font-size:0.8rem;">(${count}项)</span></span>
            <span class="arrow">▼</span>
        `;

        const body = document.createElement('div');
        body.className = 'collapse-body';

        for (let i = 0; i < items.length; i++) {
            const item = document.createElement('div');
            item.className = 'task-item';
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.innerHTML = renderFn(items[i]);
            item.appendChild(textSpan);
            body.appendChild(item);
        }

        header.addEventListener('click', function() {
            const isOpen = body.classList.toggle('open');
            header.querySelector('.arrow').classList.toggle('open', isOpen);
        });

        section.appendChild(header);
        section.appendChild(body);
        return section;
    }

    function createImageCollapseSection(title, icon, items, images, renderFn) {
        const section = document.createElement('li');
        section.className = 'collapse-section';
        section.style.listStyle = 'none';

        const header = document.createElement('div');
        header.className = 'collapse-header';
        header.innerHTML = `
            <span class="title">${icon} ${title} <span style="font-weight:400;color:#6d8aa8;font-size:0.8rem;">(1项)</span></span>
            <span class="arrow">▼</span>
        `;

        const body = document.createElement('div');
        body.className = 'collapse-body';

        for (const item of items) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'task-item';
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.innerHTML = renderFn(item);
            itemDiv.appendChild(textSpan);
            body.appendChild(itemDiv);
        }

        const imgDiv = document.createElement('div');
        imgDiv.className = 'task-item';
        const imgSpan = document.createElement('span');
        imgSpan.className = 'task-text';
        imgSpan.innerHTML = generateImagesHTML(images);
        imgDiv.appendChild(imgSpan);
        body.appendChild(imgDiv);

        header.addEventListener('click', function() {
            const isOpen = body.classList.toggle('open');
            header.querySelector('.arrow').classList.toggle('open', isOpen);
        });

        section.appendChild(header);
        section.appendChild(body);
        return section;
    }

    function createBankSection() {
        const section = document.createElement('li');
        section.className = 'collapse-section';
        section.style.listStyle = 'none';

        const header = document.createElement('div');
        header.className = 'collapse-header';
        header.innerHTML = `
            <span class="title">🏦 公司银行账号 <span style="font-weight:400;color:#6d8aa8;font-size:0.8rem;">(1项)</span></span>
            <span class="arrow">▼</span>
        `;

        const body = document.createElement('div');
        body.className = 'collapse-body';

        const item = document.createElement('div');
        item.className = 'task-item';
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.innerHTML = generateBankHTML();
        item.appendChild(textSpan);
        body.appendChild(item);

        header.addEventListener('click', function() {
            const isOpen = body.classList.toggle('open');
            header.querySelector('.arrow').classList.toggle('open', isOpen);
        });

        section.appendChild(header);
        section.appendChild(body);
        return section;
    }

    function createMDACSection() {
        const section = document.createElement('li');
        section.className = 'collapse-section';
        section.style.listStyle = 'none';

        const header = document.createElement('div');
        header.className = 'collapse-header';
        header.innerHTML = `
            <span class="title">🛂 外国人入境须知 <span style="font-weight:400;color:#6d8aa8;font-size:0.8rem;">(1项)</span></span>
            <span class="arrow">▼</span>
        `;

        const body = document.createElement('div');
        body.className = 'collapse-body';

        const item = document.createElement('div');
        item.className = 'task-item';
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.innerHTML = generateMDACHTML();
        item.appendChild(textSpan);
        body.appendChild(item);

        header.addEventListener('click', function() {
            const isOpen = body.classList.toggle('open');
            header.querySelector('.arrow').classList.toggle('open', isOpen);
        });

        section.appendChild(header);
        section.appendChild(body);
        return section;
    }
	
	    // ============================================================
    // 我们的车辆折叠板块
    // ============================================================
    function createCarSection() {
        const section = document.createElement('li');
        section.className = 'collapse-section';
        section.style.listStyle = 'none';

        const header = document.createElement('div');
        header.className = 'collapse-header';
        header.innerHTML = `
            <span class="title">🚗 我们的车辆 <span style="font-weight:400;color:#6d8aa8;font-size:0.8rem;">(${carData.length}辆)</span></span>
            <span class="arrow">▼</span>
        `;

        const body = document.createElement('div');
        body.className = 'collapse-body';

        for (const car of carData) {
            const item = document.createElement('div');
            item.className = 'task-item';
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.innerHTML = generateCarHTML(car);
            item.appendChild(textSpan);
            body.appendChild(item);
        }

        header.addEventListener('click', function() {
            const isOpen = body.classList.toggle('open');
            header.querySelector('.arrow').classList.toggle('open', isOpen);
        });

        section.appendChild(header);
        section.appendChild(body);
        return section;
    }
	
    // ============================================================
    // 山路驾驶教学折叠板块
    // ============================================================
    function createMountainSection() {
        const section = document.createElement('li');
        section.className = 'collapse-section';
        section.style.listStyle = 'none';

        const header = document.createElement('div');
        header.className = 'collapse-header';
        header.innerHTML = `
            <span class="title">🏔️ 山路驾驶教学 <span style="font-weight:400;color:#6d8aa8;font-size:0.8rem;">(${mountainVideoData.length}部)</span></span>
            <span class="arrow">▼</span>
        `;

        const body = document.createElement('div');
        body.className = 'collapse-body';

        for (const video of mountainVideoData) {
            const item = document.createElement('div');
            item.className = 'task-item';
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.innerHTML = generateVideoHTML(video);
            item.appendChild(textSpan);
            body.appendChild(item);
        }

        header.addEventListener('click', function() {
            const isOpen = body.classList.toggle('open');
            header.querySelector('.arrow').classList.toggle('open', isOpen);
        });

        section.appendChild(header);
        section.appendChild(body);
        return section;
    }	
	
	// ============================================================
    // 阿杰修车厂 – 交钥匙教学折叠板块
    // ============================================================
    function createAhJieSection() {
        const section = document.createElement('li');
        section.className = 'collapse-section';
        section.style.listStyle = 'none';

        const header = document.createElement('div');
        header.className = 'collapse-header';
        header.innerHTML = `
            <span class="title">🔑 阿杰修车厂 – 交钥匙教学 <span style="font-weight:400;color:#6d8aa8;font-size:0.8rem;">(${ahJieVideoData.length}部)</span></span>
            <span class="arrow">▼</span>
        `;

        const body = document.createElement('div');
        body.className = 'collapse-body';

        for (const video of ahJieVideoData) {
            const item = document.createElement('div');
            item.className = 'task-item';
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.innerHTML = generateVideoHTML(video);
            item.appendChild(textSpan);
            body.appendChild(item);
        }

        header.addEventListener('click', function() {
            const isOpen = body.classList.toggle('open');
            header.querySelector('.arrow').classList.toggle('open', isOpen);
        });

        section.appendChild(header);
        section.appendChild(body);
        return section;
    }
	
	function createAlphardSection() {
        const section = document.createElement('li');
        section.className = 'collapse-section';
        section.style.listStyle = 'none';

        const header = document.createElement('div');
        header.className = 'collapse-header';
        header.innerHTML = `
            <span class="title">🚐 Alphard 车内功能教学 <span style="font-weight:400;color:#6d8aa8;font-size:0.8rem;">(${alphardVideoData.length}部)</span></span>
            <span class="arrow">▼</span>
        `;

        const body = document.createElement('div');
        body.className = 'collapse-body';

        for (const video of alphardVideoData) {
            const item = document.createElement('div');
            item.className = 'task-item';
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            textSpan.innerHTML = generateVideoHTML(video);
            item.appendChild(textSpan);
            body.appendChild(item);
        }

        header.addEventListener('click', function() {
            const isOpen = body.classList.toggle('open');
            header.querySelector('.arrow').classList.toggle('open', isOpen);
        });

        section.appendChild(header);
        section.appendChild(body);
        return section;
    }
	
    // ============================================================
    // 渲染司机列表
    // ============================================================
    function renderDriverList() {
        driverList.innerHTML = '';

        // 🚗 我们的车辆
        driverList.appendChild(createCarSection());

        driverList.appendChild(createCollapseSection(
            '修车厂', '🔧',
            workshopData.length, workshopData, generateWorkshopHTML
        ));

        driverList.appendChild(createCollapseSection(
            '现金上交地点', '💰',
            cashDropData.length, cashDropData, generateCashDropHTML
        ));

        driverList.appendChild(createCollapseSection(
            '免费停车地点', '🅿️',
            parkingData.length, parkingData, generateParkingHTML
        ));

        driverList.appendChild(createCollapseSection(
            '每天汽车检查项目', '✅',
            dailyCheckItems.length, dailyCheckItems, generateDailyCheckHTML
        ));

        driverList.appendChild(createCollapseSection(
            '其他重要事项', '📋',
            otherImportantItems.length, otherImportantItems, generateOtherImportantHTML
        ));

        // 🏔️ 山路驾驶教学（新增）
        driverList.appendChild(createMountainSection());
		
		driverList.appendChild(createAhJieSection());
        
		driverList.appendChild(createAlphardSection());


		driverList.appendChild(createImageCollapseSection(
            '微信客户', '💬',
            wechatItems, wechatImages, generateWechatHTML
        ));

        driverList.appendChild(createImageCollapseSection(
            'Sentosa Resort 注意事项', '🏝️',
            sentosaItems, sentosaImages, generateSentosaHTML
        ));

        driverList.appendChild(createImageCollapseSection(
            '新加坡海关注意事项', '🛃',
            customsItems, customsImages, generateCustomsHTML
        ));

        driverList.appendChild(createBankSection());
        driverList.appendChild(createMDACSection());
    }

    // ============================================================
    // 渲染行政列表
    // ============================================================
    function renderAdminList() {
        adminList.innerHTML = '';
        for (let i = 0; i < adminSOP.length; i++) {
            const li = document.createElement('li');
            li.className = 'task-item';
            const textSpan = document.createElement('span');
            textSpan.className = 'task-text';
            const formattedText = adminSOP[i]
                .replace(/\n\n/g, '<br><br>')
                .replace(/\n/g, '<br>');
            textSpan.innerHTML = formattedText;
            li.appendChild(textSpan);
            adminList.appendChild(li);
        }
    }

    // ============================================================
    // 渲染招聘广告
    // ============================================================
    function renderRecruit() {
        if (!recruitContainer) return;

        const groups = [
            [
                "工作 20-22 天",
                "（可自选非周末休息天 / 天数）",
                "每月薪金️ 高達最少 4000-8000++（工钱越高工作越累）",
                "公司會提供车",
                "不需要用到自己的车 🚗"
            ],
            [
                "✔ 包车油",
                "✔ Toll费",
                "✔ 远途住宿"
            ],
            [
                "📩 WHATSAPP Or PM 下面",
                "📱 +60108887585",
                "BENSON ☎️"
            ],
            [
                "⚠️ 仅限住新山区",
                "⚠️ 年龄层 22-38岁",
                "⚠️ 不要 P LESEN"
            ],
            [
                "🚗 可以马上开工最好"
            ],
            {
                title: "📌 工作条件",
                checklist: [
                    "肯学习",
                    "守时",
                    "勤劳",
                    "有礼貌",
                    "懂得基本语言沟通",
                    "会使用 GPS 导航",
                    "拥有 Passport（需要能进新加坡）",
                    "熟悉 新马路线为佳",
                    "有做过 修车工优先"
                ]
            },
            {
                title: "📍 工作性质",
                lines: [
                    "🚗 专业载送服务",
                    "🚗 新马 / 本地 旅游",
                    "（长途 / 短途）"
                ]
            },
            [
                "🎊 会有 admin 安排好订单和路线"
            ]
        ];

        let html = '';
        html += `<div class="recruit-card">`;
        html += `<div class="recruit-title">${RECRUIT_CONFIG.title}</div>`;
        html += `<div class="recruit-sub">${RECRUIT_CONFIG.sub}</div>`;

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];

            if (Array.isArray(group)) {
                html += `<div class="recruit-block">`;
                for (const line of group) {
                    if (line.startsWith("BENSON")) {
                        html += `<span class="recruit-line">${line}</span>`;
                        html += `<a class="recruit-wa" href="${RECRUIT_CONFIG.whatsapp}" target="_blank">${RECRUIT_CONFIG.whatsappText}</a>`;
                    } else {
                        html += `<span class="recruit-line">${line}</span>`;
                    }
                }
                html += `</div>`;
            } else if (typeof group === 'object') {
                html += `<div class="recruit-block">`;
                if (group.title) {
                    html += `<span class="recruit-line" style="font-weight:600;margin-bottom:0.4rem;">${group.title}</span>`;
                }
                if (group.checklist) {
                    html += `<ul class="recruit-checklist">`;
                    for (const item of group.checklist) {
                        html += `<li><span class="tick">✅</span> ${item}</li>`;
                    }
                    html += `</ul>`;
                }
                if (group.lines) {
                    for (const line of group.lines) {
                        html += `<span class="recruit-line">${line}</span>`;
                    }
                }
                html += `</div>`;
            }

            if (i < groups.length - 1) {
                html += `<hr class="recruit-divider" />`;
            }
        }

        html += `</div>`;
        recruitContainer.innerHTML = html;
    }

    // ============================================================
    // 渲染
    // ============================================================
    function render() {
        renderDriverList();
        renderAdminList();
        renderRecruit();
        updateStats();
    }

    // ============================================================
    // Tab 切换
    // ============================================================
    function switchTab(tab) {
        tabDriver.classList.toggle('active',  tab === 'driver');
        tabAdmin.classList.toggle('active',   tab === 'admin');
        tabRecruit.classList.toggle('active', tab === 'recruit');

        driverTab.classList.toggle('hidden',  tab !== 'driver');
        adminTab.classList.toggle('hidden',   tab !== 'admin');
        recruitTab.classList.toggle('hidden', tab !== 'recruit');
    }

    tabDriver.addEventListener('click',  () => switchTab('driver'));
    tabAdmin.addEventListener('click',   () => switchTab('admin'));
    tabRecruit.addEventListener('click', () => switchTab('recruit'));

    // ============================================================
    // 图片放大
    // ============================================================
    window.openModal = function(imgElement) {
        const src = imgElement.getAttribute('src') || imgElement.getAttribute('data-src');
        if (src && !src.includes('data:image')) {
            modalImg.src = src;
            modal.classList.add('active');
        }
    };

    modal.addEventListener('click', function() {
        this.classList.remove('active');
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    // ============================================================
    // 初始化
    // ============================================================
    render();
    switchTab('driver');

})();