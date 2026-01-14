// Library Data
const libraryData = [
    { title: "데이터 리터러시 가이드", author: "홍길동", category: "총류 (000)", tags: ["데이터", "리터러시", "교육"], views: 120 },
    { title: "철학이 필요한 시간", author: "강신주", category: "철학 (100)", tags: ["인문", "철학", "생각"], views: 95 },
    { title: "한국의 역사", author: "김역사", category: "역사 (900)", tags: ["역사", "한국사", "교육"], views: 200 },
    { title: "재미있는 과학 상식", author: "이과학", category: "순수과학 (400)", tags: ["과학", "실험", "상식"], views: 150 },
    { title: "파이썬 코딩 첫걸음", author: "박코딩", category: "총류 (000)", tags: ["코딩", "파이썬", "컴퓨터"], views: 300 },
    { title: "어린 왕자", author: "생텍쥐페리", category: "문학 (800)", tags: ["소설", "명작", "감동"], views: 500 },
    { title: "미술관에 간 수학자", author: "이광연", category: "예술 (600)", tags: ["예술", "수학", "융합"], views: 110 },
    { title: "기후 변화와 환경", author: "지구지킴이", category: "사회과학 (300)", tags: ["환경", "기후", "과학"], views: 250 },
    { title: "해리포터와 마법사의 돌", author: "J.k.롤링", category: "문학 (800)", tags: ["소설", "판타지", "모험"], views: 600 },
    { title: "코스모스", author: "칼 세이건", category: "순수과학 (400)", tags: ["과학", "우주", "천문학"], views: 400 },
    { title: "총 균 쇠", author: "재레드 다이아몬드", category: "사회과학 (300)", tags: ["인문", "역사", "사회"], views: 450 },
    { title: "Why? 우주", author: "예림당", category: "순수과학 (400)", tags: ["만화", "과학", "학습"], views: 700 }
];

// Navigation Logic
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(el => el.classList.remove('active'));

    // Show target
    document.getElementById(sectionId).classList.add('active');
    document.getElementById(`nav-${sectionId}`).classList.add('active');

    // Reset inputs if needed (optional)
}

// Menu 1: Boolean Search
function runSearch() {
    const t1 = document.getElementById('term1').value.trim().toLowerCase();
    const t2 = document.getElementById('term2').value.trim().toLowerCase();
    const op = document.getElementById('operator').value;
    const listDiv = document.getElementById('resultArea');
    const statsDiv = document.getElementById('searchStats');

    if (!listDiv) return;
    listDiv.innerHTML = "";

    // Logic
    const results = libraryData.filter(book => {
        const content = book.tags.join(" ").toLowerCase() + " " + book.title.toLowerCase();
        const hasT1 = t1 ? content.includes(t1) : false;
        const hasT2 = t2 ? content.includes(t2) : false;

        if (!t1 && !t2) return false;
        if (!t1 && t2) return hasT2;
        if (t1 && !t2) return hasT1;

        if (op === "AND") return hasT1 && hasT2;
        if (op === "OR") return hasT1 || hasT2;
        if (op === "NOT") return hasT1 && !hasT2;
        return false;
    });

    // Display Stats
    if (t1 || t2) {
        statsDiv.innerHTML = `검색 결과: <b>${results.length}</b>건`;
    } else {
        statsDiv.innerHTML = "검색어를 입력해주세요.";
        return;
    }

    // Display Results
    if (results.length === 0) {
        listDiv.innerHTML = "<div style='padding:20px; text-align:center; background:#fff; border-radius:10px;'>검색 결과가 없습니다.</div>";
    } else {
        results.forEach(book => {
            const div = document.createElement('div');
            div.className = 'book-card';
            div.innerHTML = `
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <div class="book-meta">저자: ${book.author} | 분류: ${book.category}</div>
                    <div style="margin-top:5px;">
                        ${book.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                </div>
                <button style="padding:5px 10px; border:1px solid #ccc; background:white; cursor:pointer; border-radius:5px;">상세보기</button>
            `;
            listDiv.appendChild(div);
        });
    }
}

// Menu 2: Classification (Categories)
function initCategories() {
    const grid = document.getElementById('catGrid');
    if (!grid) return;

    // KDC Mock Categories
    const categories = [
        { name: "총류 (000)", icon: "fa-layer-group" },
        { name: "철학 (100)", icon: "fa-brain" },
        { name: "종교 (200)", icon: "fa-church" },
        { name: "사회과학 (300)", icon: "fa-globe" },
        { name: "자연과학 (400)", icon: "fa-flask" },
        { name: "기술과학 (500)", icon: "fa-rocket" },
        { name: "예술 (600)", icon: "fa-palette" },
        { name: "언어 (700)", icon: "fa-language" },
        { name: "문학 (800)", icon: "fa-book" },
        { name: "역사 (900)", icon: "fa-landmark" }
    ];

    grid.innerHTML = categories.map(c => `
        <div class="category-card" onclick="alert('${c.name} 분야 도서를 검색합니다.')">
            <i class="fa-solid ${c.icon} cat-icon" style="color:var(--primary-color);"></i>
            <div class="cat-name">${c.name}</div>
        </div>
    `).join('');
}

// Menu 3: Shelf / Popular (Baesu Style -> Grid Layout)
function initShelf() {
    const shelf = document.getElementById('bookShelf');
    if (!shelf) return;

    // Sort by views for "Popular"
    const books = [...libraryData].sort((a, b) => b.views - a.views);

    shelf.innerHTML = books.map(book => `
        <div class="shelf-item">
            <div class="cover-placeholder">
                <i class="fa-solid fa-book"></i>
            </div>
            <div class="shelf-info">
                <div class="shelf-title">${book.title}</div>
                <div class="shelf-author">${book.author}</div>
            </div>
        </div>
    `).join('');
}

// Init
window.onload = function () {
    initCategories();
    initShelf();
    // Start at search
};
